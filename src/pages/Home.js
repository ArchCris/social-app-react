import React from 'react'
import '../styles/Home.css'
import { db } from '../config/firebase';
import { getDocs,collection } from 'firebase/firestore';
import { useEffect,useState } from 'react';




const Home = () => {

  const[posts,setPosts]=useState(null)

  const getDataFromDDBB = async () =>{
    const postsRef = await collection(db,'posts');
    const docsSnap = await getDocs(postsRef);
    setPosts(docsSnap.docs.map((doc)=>({...doc.data(),id:doc.id})))
  }

  useEffect(() => {
    getDataFromDDBB()
  }, []);

  return (
    <div className='home__conteiner'>
     {posts ? posts.map((post,key)=>{
      return(
        <div className='home__card' key={key}>
        <p>{post.title}</p>
        <p>{post.description}</p>
        <p>From: {post.username}</p>
        </div>
      )
     }) : <p>Yoy need to login to see the posts</p>}
    </div>
  )
}

export default Home