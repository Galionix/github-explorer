import { TableProps } from '@/ts/interfaces'
import { useMemo } from 'react';

import { Column, TableInstance, useTable } from 'react-table'
import { StarButton } from './StarButton';
import { Node } from './../../../ts/interfaces';
import TimeAgo from 'javascript-time-ago'

import s from './table.module.scss'
import en from 'javascript-time-ago/locale/en'
import { formatBytes } from 'utils/utils';
import Image from 'next/image';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')




export const Table = ({ data, loading }: TableProps) => {
    // Use the state and functions returned from useTable to build your UI


    const columns: Column<Node>[] = useMemo(
        () => [
            {
                Header: 'Repos',
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
                        Header: 'createdAt',
                        accessor: 'createdAt',
                    },
                    {
                        Header: 'UPD',
                        accessor: 'updatedAt',
                    },
                    {
                        Header: 'Rating',
                        accessor: 'stargazerCount',
                    },
                    {
                        Header: 'diskUsage',
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
    // console.log("%c 🎱: Table -> data ", "font-size:16px;background-color:#926c45;color:white;", data)
    // console.log("%c 😭: Repositories -> headerGroups ", "font-size:16px;background-color:#a2254a;color:white;", headerGroups)

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup, i) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={i + 'header'}
                    >
                        {headerGroup.headers.map((column, j) => (
                            <th {...column.getHeaderProps()}
                                key={j + 'column'}
                            >{
                                    column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, k) => {
                    console.log("%c 📪: row ", "font-size:16px;background-color:#27f7d3;color:black;", row)
                    prepareRow(row)
                    return (
                        <tr

                            {...row.getRowProps()}
                            key={k + 'row'}
                        >
                            {row.cells.map((cell, l) => {
                                if (cell.column.id === 'owner') {
                                    console.log("%c 🍫: Table -> cell ", "font-size:16px;background-color:#73c829;color:white;", cell.value)

                                    return (<td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        <Image

                                            className={s.avatar}
                                            width={70}
                                            height={70}
                                            src={cell.value.avatarUrl}
                                        />
                                        <span>{cell.value.login}</span>

                                    </td>
                                    )
                                }
                                if (cell.column.id === 'diskUsage') {
                                    return (<td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        <span>{formatBytes(cell.value)}</span>

                                    </td>
                                    )
                                }

                                if (cell.column.id === 'updatedAt') {
                                    return (<td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        <span>{timeAgo.format(new Date(cell.value))}</span>

                                    </td>
                                    )
                                }
                                // updatedAt: timeAgo.format(new Date(repo.updatedAt)),
                                //     diskUsage: formatBytes(repo.diskUsage),
                                if (cell.column.id === 'createdAt') {
                                    return (<td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        <span>{new Date(cell.value).toLocaleDateString()}</span>

                                    </td>
                                    )
                                }

                                if (cell.column.id === 'stargazerCount') {

                                    // console.log("%c 🆘: Repositories -> cell ",
                                    //     "font-size:16px;background-color:#f2ec2b;color:black;",
                                    //     cell)
                                    return (<td
                                        {...cell.getCellProps()}
                                        key={l + '_cell'}
                                    >
                                        <StarButton
                                            value={cell.value}
                                            id={cell.row.original.id}
                                            globalLoading={loading}
                                        />
                                        {/* <button
                                                disabled={globalLoading}
                                            >
                                                <span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                                </span>
                                                {cell.value}</button> */}
                                    </td>
                                    )
                                }
                                return <td
                                    {...cell.getCellProps()}
                                    key={l + '_cell'}
                                >{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}