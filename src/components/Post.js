import React from 'react'
import '../styles/Home.css'
import { db,auth } from '../config/firebase';
import { collection,addDoc,query,where,getDocs } from 'firebase/firestore';
import { useEffect,useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import '../styles/Post.css'


const Post = (props) => {
//States
const[likes,setLikes]=useState(null)
//DDBB conection
const likeRef = collection(db,'likes')
//Auth validation
const [user] = useAuthState(auth)
//Like the post
const likePost = async (data) => {
    await addDoc(likeRef,{
        userId: user?.uid,
        likeId: data
    })
   
    setLikes((prev)=>prev ? [...prev,{userId:user?.uid}] : [{uesrId:user?.uid}])
}
//Get the likes

const queryLikes = query(likeRef,where('likeId','==',props.post.id))
const getLikes = async ()=> {
    try{
    const data = await getDocs(queryLikes)
    setLikes(data.docs.map((doc)=>({userId: doc.data().userId})))
    }catch(err){
        console.log(err)
    }
}

const isAlreadyLiked = likes?.find((like)=>like.userId===user.uid)


useEffect(() => {

    getLikes()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
 

  return (
    <div className='post__conteiner'>
        <h4>{props.post.title}</h4>
        <p>{props.post.description}</p>
            <div className='post__data'>
            <p>From: @{props.post.username.split("@")[0]}</p>
                <div className='post__data-like'>
                {likes?.length}
                {isAlreadyLiked ? 
                <button disabled onClick={()=>{likePost(props.post.id)}}>&#128077;</button> 
                :
                <button onClick={()=>{likePost(props.post.id)}}>&#128077;</button>
                }
                </div>
            </div>
    </div>
  )
}

export default Post