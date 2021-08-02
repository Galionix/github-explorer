import { TableProps, Node } from '@/ts/interfaces'
import { useMemo } from 'react'

import { Column, useTable } from 'react-table'
import { StarButton } from './StarButton'
import TimeAgo from 'javascript-time-ago'

import s from './table.module.scss'
import en from 'javascript-time-ago/locale/en'
import { formatBytes } from 'utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useUserStore } from 'utils/useUserStore'
import shallow from 'zustand/shallow'
import { motion } from 'framer-motion'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.96],
}

export const Table = ({
    data,
    loading,
    setRepos,
}: TableProps) => {

    const {
        selectedName,
        setSelectedName,
        selectedOwner,
        setSelectedOwner,
    } = useUserStore(
        state => ({
            selectedName: state.selectedName,
            setSelectedName: state.setSelectedName,
            selectedOwner: state.selectedOwner,
            setSelectedOwner: state.setSelectedOwner,
        }),
        shallow
    )
    const headerDefinition = () => <span></span>

    const columns: Column<Node>[] = useMemo(
        () => [
            {
                Header: headerDefinition,
                id: 'someId',
                columns: [
                    {
                        Header: 'Owner',
                        accessor: 'owner',
                    },
                    {
                        Header: 'Repo Name',
                        accessor: 'name',
                    },

                    {
                        Header: 'Created',
                        accessor: 'createdAt',
                    },
                    {
                        Header: 'Updated',
                        accessor: 'updatedAt',
                    },
                    {
                        Header: 'Rating',
                        accessor: 'stargazerCount',
                    },
                    {
                        Header: 'Size',
                        accessor: 'diskUsage',
                    },
                ],
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table
            className={` ${s.table} `}
            {...getTableProps()}
        >
            <thead>
                {headerGroups.map((headerGroup, i) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={i + 'header'}
                    >
                        {headerGroup.headers.map(
                            (column, j) => (
                                <th
                                    {...column.getHeaderProps()}
                                    key={j + 'column'}
                                >
                                    {column.render('Header')}
                                </th>
                            )
                        )}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, k) => {
                    prepareRow(row)
                    return (
                        <motion.tr
                            initial={{ x: '100px', opacity: 0 }}
                            animate={{ x: '0px', opacity: 1 }}
                            transition={{
                                ...transition,
                                delay: 0.05 * k,
                            }}
                            {...row.getRowProps()}
                            key={k + 'row'}
                            exit={{ opacity: 0 }}
                        >
                            {row.cells.map((cell, l) => {
                                if (cell.column.id === 'name') {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <div>
                                                <Link
                                                    href={{
                                                        pathname: `/repositories/${row.original.name}`,
                                                        query: {
                                                            owner:
                                                                row.original.owner
                                                                    .login,
                                                        },
                                                    }}
                                                >
                                                    <a
                                                        onClick={() => {
                                                            setSelectedOwner(
                                                                row.original.owner
                                                                    .login
                                                            )
                                                            setSelectedName(
                                                                row.original.name
                                                            )
                                                        }}
                                                    >
                                                        {cell.value}
                                                    </a>
                                                </Link>
                                                <Link
                                                    href={
                                                        cell.row.original.url
                                                    }
                                                >
                                                    <a
                                                        className={` ${s.external} `}
                                                        target='_blank'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            className='h-6 w-6'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            stroke='currentColor'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                strokeWidth={2}
                                                                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                                            />
                                                        </svg>
                                                    </a>
                                                </Link>
                                            </div>
                                        </td>
                                    )
                                }

                                if (cell.column.id === 'owner') {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                            className={` ${s.owner} `}
                                        >
                                            <motion.div
                                                className={` ${s.ownerImage} `}
                                                whileHover={{
                                                    scale: 1.1,
                                                }}
                                                transition={transition}
                                            >
                                                <Image
                                                    className={s.avatar}
                                                    width={70}
                                                    height={70}
                                                    src={
                                                        cell.value.avatarUrl
                                                    }
                                                />
                                            </motion.div>
                                            <span>
                                                {cell.value.login}
                                            </span>
                                        </td>
                                    )
                                }
                                if (
                                    cell.column.id === 'diskUsage'
                                ) {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <div>
                                                {formatBytes(cell.value)}
                                            </div>
                                        </td>
                                    )
                                }

                                if (
                                    cell.column.id === 'updatedAt'
                                ) {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <div>
                                                {timeAgo.format(
                                                    new Date(cell.value)
                                                )}
                                            </div>
                                        </td>
                                    )
                                }

                                if (
                                    cell.column.id === 'createdAt'
                                ) {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <div>
                                                {new Date(
                                                    cell.value
                                                ).toLocaleDateString()}
                                            </div>
                                        </td>
                                    )
                                }

                                if (
                                    cell.column.id ===
                                    'stargazerCount'
                                ) {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            key={l + '_cell'}
                                        >
                                            <StarButton
                                                setRepos={({
                                                    value,
                                                    starred,
                                                }: {
                                                    value: number
                                                    starred: boolean
                                                }) =>
                                                    setRepos([
                                                        ...data.slice(
                                                            0,
                                                            row.index
                                                        ),
                                                        {
                                                            ...data[row.index],
                                                            stargazerCount:
                                                                value,
                                                            viewerHasStarred:
                                                                starred,
                                                        },
                                                        ...data.slice(
                                                            row.index + 1
                                                        ),
                                                    ])
                                                }
                                                value={cell.value}
                                                id={cell.row.original.id}
                                                globalLoading={loading}
                                                starred={
                                                    cell.row.original
                                                        .viewerHasStarred
                                                }
                                            />
                                        </td>
                                    )
                                }
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </motion.tr>
                    )
                })}
            </tbody>
        </table>
    )
}
