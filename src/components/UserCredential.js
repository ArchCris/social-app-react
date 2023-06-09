import React from 'react'
import { signOut } from "@firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'
import '../styles/Credential.css'



const UserCredential = () => {
    
    const navigate = useNavigate();

    const [user] = useAuthState(auth)

    const logout = () =>{
        signOut(auth).then(() => {
            navigate('/login')
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
    
    const userName = user.email.split('@')[0]
    
  return (
    <div className='credential__conteiner'>
    <div className='credential__user'>{userName === null ? "no" : userName}</div>
    <button className='credential__button' onClick={()=>{logout()}}>Sign Out</button>
    </div>
  )
}

export default UserCredential