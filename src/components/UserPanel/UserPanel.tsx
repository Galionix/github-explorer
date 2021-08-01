import { SignButton } from '@/components/SignButton/SignButton';
import { useUserStore } from 'utils/useUserStore';
import shallow from 'zustand/shallow';
import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { CREATE_REPO } from './../../../utils/queries/reposQueries';
import { SyntheticEvent, useState } from 'react';
import { object, string, mixed } from "yup"

import { Form as FForm, Field, Formik } from "formik"
import { useRouter } from 'next/router'
import s from './panel.module.scss'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        // display: 'flex',
        // flexDirection: 'column',
    },
    overlay: { zIndex: 1000 }
};


export const UserPanel = () => {
    const router = useRouter()
    const newRepoSchema = object().shape({
        name:
            string()
                .min(5, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
        visibility:
            mixed().oneOf(['PRIVATE', 'INTERNAL', 'PUBLIC'])
                .required('Required'),
        description:
            string().max(50, 'Too Long!')

    })

    const {
        user,

    } = useUserStore(
        state => ({
            user: state.user,

        }),
        shallow
    )

    const [submissionError, setSubmissionError] = useState('')
    const [repoDetails, setRepoDetails] = useState({
        name: '',
        visibility: 'PRIVATE',
        description: ''
    })

    const [modalOpen, setModalOpen] = useState(false)
    const [
        createRepo,
        {
            data: createResponse,
            loading: createLoading,
            error: createError,
        },
    ] = useMutation(CREATE_REPO, {
        variables: {
            ...repoDetails
        },
    })

    // const handleError = ({ message }: { message: string }) => {
    //     alert(message)
    // }
    // const commitCreate = (e: SyntheticEvent<HTMLButtonElement>) => {
    //     if (repoDetails.name.length < 5)
    //         return handleError({ message: 'name too short' })
    //     if (repoDetails.description.length < 5)
    //         return handleError({ message: 'description too short' })
    //     createRepo().then(console.log)
    // }



    return (
        <div
            className={s.panel}
        >{user && <>
                <div className={s.image}>

            <Image
                src={user?.picture || '/1476.gif'}
                width={90}
                height={90}
                    />
                </div>
            <p
                className={` ${s.login} `}
                >{user?.login}</p>
                <p
                    className={` ${s.name} `}
                >{user?.name}</p>
                <button
                    className={` ${s.new} `}
                    title={`Create new repo`}
                    onClick={() => setModalOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        New
                    </span>
                </button>

                <Modal
                    isOpen={modalOpen}
                    style={customStyles}
                    onRequestClose={() => setModalOpen(false)}
                ><div className={s.modalContent}>
                        <button
                            className={s.btn_close}
                            onClick={() => setModalOpen(false)}
                        >Close</button>
                        <div
                            className={s.heading}
                        >Create new repo</div>
                        <Formik
                            initialValues={repoDetails}
                            validationSchema={newRepoSchema}
                            // onSubmit={values => alert(JSON.stringify(values, null, 2))}
                            onSubmit={(
                                values,
                                { setSubmitting, resetForm }
                            ) => {
                                console.log(values)
                                setRepoDetails(values)
                                createRepo().then((res) => {
                                    // console.log("%c 👎: res ",
                                    //     "font-size:16px;background-color:#5c30b5;color:white;",
                                    //     res)
                                    setSubmitting(false)
                                    resetForm()
                                    setModalOpen(false)
                                    router.push(`/repositories/${res.data.createRepository.repository.name}?owner=${res.data.createRepository.repository.owner.login}`)
                                }).catch((e: Error) => {
                                    setSubmitting(false)
                                    setSubmissionError(e.message)
                                    // console.log(e.message)
                                })
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                resetForm,
                                /* and other goodies */
                            }) => (
                                <FForm
                                    // className={styles.form}
                                    // style={{ gridColumn: columns || {} }}
                                    onSubmit={handleSubmit}
                                >
                                    <p className={s.label}>Name</p>
                                    <p
                                        className={s.error}
                                    >
                                        {errors.name &&
                                            touched.name &&
                                            errors.name}
                                    </p>
                                    <Field
                                        // className={`${errors.name &&
                                        //         touched.name &&
                                        //         errors.name
                                        //         ? styles.errorField
                                        //         : ''
                                        //     }`}
                                        type='text'
                                        placeholder='Name'
                                        name='name'
                                        id=''
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p className={s.label}>Visibility</p>
                                    <p >
                                        {errors.visibility &&
                                            touched.visibility &&
                                            errors.visibility}
                                    </p>
                                    <Field as="select" name="visibility" onChange={handleChange}>
                                        <option value="PUBLIC">PUBLIC</option>
                                        <option value="PRIVATE">PRIVATE</option>
                                        <option value="INTERNAL">INTERNAL</option>
                                    </Field>
                                    <p className={s.label}>Description</p>
                                    <p
                                        className={s.error}
                                    >
                                        {errors.description &&
                                            touched.description &&
                                            errors.description}
                                    </p>
                                    <Field as="textarea"
                                        name="description"
                                        onChange={handleChange} />
                                    <button
                                        disabled={isSubmitting}
                                        type="submit">Submit</button>
                                </FForm>
                            )}</Formik>
                    </div>
                    <Modal
                        isOpen={submissionError !== ''}
                        style={customStyles}
                        onRequestClose={() => setSubmissionError('')}
                    >
                        <p>submission Error!</p>
                        <p>{JSON.stringify(submissionError, null, 2)}</p>
                        <button
                            className={s.error_close}
                            onClick={() => {
                                setSubmissionError('')
                            }}
                        >Dismiss</button>
                    </Modal>
                </Modal>
            </>}

        </div>
    )
}
