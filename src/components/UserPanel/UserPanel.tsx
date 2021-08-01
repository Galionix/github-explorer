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
        <div>
            <Image
                src={user?.picture || '/1476.gif'}
                width={90}
                height={90}
            />
            <p>{user?.login}</p>
            <p>{user?.name}</p>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <SignButton />
            <button
                onClick={() => setModalOpen(true)}
            >New</button>
            {/* <pre>{JSON.stringify(repoDetails, null, 2)}</pre> */}
            {


                modalOpen && <div

                >

                    <button
                        onClick={() => setModalOpen(false)}
                    >Close</button>
                    <div>Create new repo</div>
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
                                {/* <p className={styles.label}>Name</p> */}
                                <p >
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
                                <Field as="select" name="visibility" onChange={handleChange}>
                                    <option value="PUBLIC">PUBLIC</option>
                                    <option value="PRIVATE">PRIVATE</option>
                                    <option value="INTERNAL">INTERNAL</option>
                                </Field>
                                <Field as="textarea" name="description" onChange={handleChange} />
                                {/* <button
                                    type='submit'
                                    disabled={isSubmitting}
                                    onSubmit={(values, { resetForm }) => {
                                        // do your stuff
                                        resetForm()
                                    }}
                             
                                >
                                    Send Message
                                </button> */}
                                <button
                                    disabled={isSubmitting}
                                    type="submit">Submit</button>

                            </FForm>


                        )}</Formik>
                    {submissionError !== '' && <div>
                        <p>submission Error!</p>
                        <pre>{JSON.stringify(submissionError, null, 2)}</pre>
                        <button
                            onClick={() => {

                                setSubmissionError('')
                            }}
                        >Dismiss</button>

                    </div>}
                    {/* <select
                        key='select_pageSize'
                        name=''
                        id=''
                        disabled={
                            false
                        }
                        value={repoDetails.visibility}
                        onChange={e => {

                            setRepoDetails(
                                (prevDetails) =>
                                    ({ ...prevDetails, visibility: e.target.value })
                            )
                        }}
                    >
                        <option value='PRIVATE'>PRIVATE</option>
                        <option value='PUBLIC'>PUBLIC</option>
                        <option value='INTERNAL'>INTERNAL</option>
 
                    </select>
                    <textarea name="" id="" cols={30} rows={10} onChange={e => {
                        setRepoDetails(
                            (prevDetails) =>
                                ({ ...prevDetails, description: e.target.value })
                        )
                    }}>{repoDetails.description}</textarea>
                    <input
                        type='text'
                        placeholder=''
                        value={repoDetails.name}
                        onChange={e => {
                            setRepoDetails(
                                (prevDetails) =>
                                    ({ ...prevDetails, name: e.target.value })
                            )
                        }}
                    />            <button
                        onClick={commitCreate}
                    >Create</button> */}


                </div>
            }
        </div>
    )
}
