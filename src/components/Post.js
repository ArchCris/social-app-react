import React from 'react'
import '../styles/Home.css'
import { db,auth } from '../config/firebase';
import { collection,addDoc,query,where, getCountFromServer } from 'firebase/firestore';
import { useEffect,useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import '../styles/Post.css'


const Post = (props) => {
  
const likeRef = collection(db,'likes')
const [user] = useAuthState(auth)

const likePost = async (data) => {
    await addDoc(likeRef,{
        userId: user?.uid,
        likeId: data
    })
}

const[likesAmount,setLikesAmount]=useState(null)

const getLikes = async ()=> {
    const likeAmount = query(likeRef,where('likeId','==',props.post.id))
    const snap = await getCountFromServer(likeAmount)
    const snapCount = snap.data().count
    setLikesAmount(snapCount)
}

const[alreadyLike,setAlreadyLike]=useState(0)

const ifAlreadyLike = async ()=> {
    const likeAmount = query(likeRef,where('userId','==',user.uid))
    const snap = await getCountFromServer(likeAmount)
    const snapCount = snap.data().count
    setAlreadyLike(snapCount)
}

useEffect(() => {
    getLikes()
    ifAlreadyLike()
}, []);
 

  return (
    <div className='post__conteiner'>
        <h4>{props.post.title}</h4>
        <p>{props.post.description}</p>
            <div className='post__data'>
            <p>From: @{props.post.username.split("@")[0]}</p>
                <div className='post__data-like'>
                {alreadyLike === 0 ?
                <button onClick={()=>{likePost(props.post.id)}}>&#128077;</button> :
                <button disabled onClick={()=>{likePost(props.post.id)}}>&#128077;</button>
                }
                {likesAmount ? <p>Likes: {likesAmount}</p>:null}
                </div>
            </div>
    </div>
  )
}

export default Post