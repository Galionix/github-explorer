import { useUserStore } from 'utils/useUserStore'
import shallow from 'zustand/shallow'
import Image from 'next/image'
import { useMutation } from '@apollo/client'
import { CREATE_REPO } from '@/queries/reposQueries'
import { useState } from 'react'
import { object, string, mixed } from 'yup'

import {
    Form as FForm,
    Field,
    Formik,
} from 'formik'
import { useRouter } from 'next/router'
import s from './panel.module.scss'
import Modal from 'react-modal'
import { motion } from 'framer-motion'
import { buttonMotion } from '../../motionConfig'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 1000 },
}

export const UserPanel = () => {
    const router = useRouter()
    const newRepoSchema = object().shape({
        name: string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        visibility: mixed()
            .oneOf(['PRIVATE', 'INTERNAL', 'PUBLIC'])
            .required('Required'),
        description: string().max(50, 'Too Long!'),
    })

    const { user } = useUserStore(
        state => ({
            user: state.user,
        }),
        shallow
    )

    const [submissionError, setSubmissionError] =
        useState('')
    const [repoDetails, setRepoDetails] = useState({
        name: '',
        visibility: 'PRIVATE',
        description: '',
    })

    const [modalOpen, setModalOpen] =
        useState(false)
    const [
        createRepo,
        {
            data: createResponse,
            loading: createLoading,
            error: createError,
        },
    ] = useMutation(CREATE_REPO, {
        variables: {
            ...repoDetails,
        },
    })

    return (
        <motion.div className={s.panel}>
            {user && (
                <>
                    <div className={s.image}>
                        <Image
                            src={user?.picture || '/1476.gif'}
                            width={90}
                            height={90}
                        />
                    </div>
                    <p className={` ${s.login} `}>
                        {user?.login}
                    </p>
                    <p className={` ${s.name} `}>
                        {user?.name}
                    </p>
                    <motion.button
                        className={` ${s.new} `}
                        title={`Create new repo`}
                        onClick={() => setModalOpen(true)}
                        {...buttonMotion}
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
                                d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        <span>New</span>
                    </motion.button>

                    <Modal
                        isOpen={modalOpen}
                        style={customStyles}
                        onRequestClose={() =>
                            setModalOpen(false)
                        }
                    >
                        <div className={s.modalContent}>
                            <motion.button
                                {...buttonMotion}
                                className={s.btn_close}
                                onClick={() =>
                                    setModalOpen(false)
                                }
                            >
                                Close
                            </motion.button>
                            <div className={s.heading}>
                                Create new repo
                            </div>
                            <Formik
                                initialValues={repoDetails}
                                validationSchema={newRepoSchema}
                                onSubmit={(
                                    values,
                                    { setSubmitting, resetForm }
                                ) => {
                                    setRepoDetails(values)
                                    createRepo()
                                        .then(res => {
                                            setSubmitting(false)
                                            resetForm()
                                            setModalOpen(false)
                                            router.push(
                                                `/repositories/${res.data.createRepository.repository.name}?owner=${res.data.createRepository.repository.owner.login}`
                                            )
                                        })
                                        .catch((e: Error) => {
                                            setSubmitting(false)
                                            setSubmissionError(
                                                e.message
                                            )
                                        })
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <FForm onSubmit={handleSubmit}>
                                        <p className={s.label}>
                                            Name
                                        </p>
                                        <p className={s.error}>
                                            {errors.name &&
                                                touched.name &&
                                                errors.name}
                                        </p>
                                        <Field
                                            type='text'
                                            placeholder='Name'
                                            name='name'
                                            id=''
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                        <p className={s.label}>
                                            Visibility
                                        </p>
                                        <p>
                                            {errors.visibility &&
                                                touched.visibility &&
                                                errors.visibility}
                                        </p>
                                        <Field
                                            as='select'
                                            name='visibility'
                                            onChange={handleChange}
                                        >
                                            <option value='PUBLIC'>
                                                PUBLIC
                                            </option>
                                            <option value='PRIVATE'>
                                                PRIVATE
                                            </option>
                                            <option value='INTERNAL'>
                                                INTERNAL
                                            </option>
                                        </Field>
                                        <p className={s.label}>
                                            Description
                                        </p>
                                        <p className={s.error}>
                                            {errors.description &&
                                                touched.description &&
                                                errors.description}
                                        </p>
                                        <Field
                                            as='textarea'
                                            name='description'
                                            onChange={handleChange}
                                        />
                                        <motion.button
                                            {...buttonMotion}
                                            disabled={isSubmitting}
                                            type='submit'
                                        >
                                            Submit
                                        </motion.button>
                                    </FForm>
                                )}
                            </Formik>
                        </div>
                        <Modal
                            isOpen={submissionError !== ''}
                            style={customStyles}
                            onRequestClose={() =>
                                setSubmissionError('')
                            }
                        >
                            <p>submission Error!</p>
                            <p>
                                {JSON.stringify(
                                    submissionError,
                                    null,
                                    2
                                )}
                            </p>
                            <motion.button
                                {...buttonMotion}
                                className={s.error_close}
                                onClick={() => {
                                    setSubmissionError('')
                                }}
                            >
                                Dismiss
                            </motion.button>
                        </Modal>
                    </Modal>
                </>
            )}
        </motion.div>
    )
}
