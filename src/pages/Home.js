import React from 'react'
import '../styles/Home.css'
import { db,auth } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect,useState } from 'react';
import {useAuthState} from 'react-firebase-hooks/auth'
import '../styles/Post.css'
import Post from '../components/Post';


const Home = () => {

  const[posts,setPosts]=useState(null)
  const [user] = useAuthState(auth)


  const getDataFromDDBB = () =>{
    const postsRef = collection(db,'posts');
    onSnapshot((postsRef),(doc)=>{
      setPosts(doc.docs.map((doc)=>({...doc.data(),id:doc.id})))
    });
  }

  useEffect(() => {
    getDataFromDDBB()
  }, []);


  return (
    <div className='home__conteiner'>
      {user 
      ? posts?.map((post,key)=>{
        return(
          <Post key={key} post={post}/>
        )
      }) 
      : <p>Login to see the posts</p>}
    </div>
  )
}

export default Home