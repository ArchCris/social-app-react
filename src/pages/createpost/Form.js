import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, collection} from 'firebase/firestore'
import { auth,db } from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'


const Form = () => {
    //Navigate
    const navigate = useNavigate();
    //Structure of the data
    const schema = yup.object().shape({
        title: yup.string().required('You need to fill this input'),
        description: yup.string().required('You need to fill this input')
    })

    const { register,handleSubmit,formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db,'posts')
    const [user] = useAuthState(auth)

    const createPost = async (data) => {
        await addDoc(postsRef,{
            title: data.title,
            description: data.description,
            username: user?.email,
            id: user?.uid
        })
        navigate('/')
    }

  return (
    <form onSubmit={handleSubmit(createPost)}>
        <input placeholder='Title..' {...register('title')}></input>
        <p>{errors.title?.message}</p>
        <textarea placeholder='Descriptio..' {...register('description')}></textarea>
        <p>{errors.description?.message}</p>
        <input type='submit'></input>
    </form>
  )
}

export default Form