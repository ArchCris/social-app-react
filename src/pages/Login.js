import React from 'react'
import '../styles/Login.css'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from 'react';
import { app } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  //Navigate
  const navigate = useNavigate();
  //Sign Up
  const[signUser,setSignUser]=useState('')
  const[signPassword,setSignPassword]=useState('')

  const[signMessage,setSignMessage]=useState('')

  const makeSign = () => {
    
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, signUser, signPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      setSignMessage(errorMessage)
      // ..
    });
  }

  //Log in

  const[loginUser,setLoginUser]=useState('')
  const[loginPassword,setLoginPassword]=useState('')

  const[loginMessage,setLoginMessage]=useState('')

  const makeLogin = () => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginUser, loginPassword)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginMessage(errorMessage)
      });
    
  
  }

  return (
    <div className='login__conteiner'>
        <div className='login__login'>
          <div className='login__login-display'>
            <input onChange={(e)=>{setSignUser(e.target.value)}} placeholder='mail..'></input>
            <input onChange={(e)=>{setSignPassword(e.target.value)}} placeholder='password..'></input>
            {signMessage}
            <button onClick={()=>{makeSign()}}>SIGN UP</button>
          </div>
        </div>
        <div className='login__login'>
          <div className='login__login-display'>
            <input onChange={(e)=>{setLoginUser(e.target.value)}} placeholder='mail..'></input>
            <input onChange={(e)=>{setLoginPassword(e.target.value)}} placeholder='password..'></input>
            {loginMessage}
            <button onClick={()=>{makeLogin()}}>LOGIN</button>
          </div>
        </div>
    </div>
  )
}

export default Login