import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import UserCredential from './UserCredential'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

const Navbar = () => {

  const [user] = useAuthState(auth)

  return (
    <div className='Navbar__conteiner'>
        <Link to='/'>Home</Link>
        {!user ? <Link to='/login'>Login</Link> : <Link to='/createpost'>Create Post</Link>}
        {!user ? null : <UserCredential/>}
        <p>test</p>
    </div>
  )
}

export default Navbar