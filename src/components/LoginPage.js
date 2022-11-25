import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from '../firebase/firebase';
import './LoginPage.css'
function LoginPage() {
    const handleLogin = ()=>{
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // dispatch(login({displayName:user.displayName,email:user.email,photoUrl:user.photoURL,userId:user.uid}))
                // ...
            }).catch((error) => {
                alert(error.message)
            });
    }
  return (
    <div className='loginPage'>
        <div className='loginPage__container'>
            <img src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg" alt="gmail logo" className='loginPage__logo'/>
            <Button variant="contained" className='loginPage__login' onClick={handleLogin}>Login</Button>
        </div>
    </div>
  )
}

export default LoginPage