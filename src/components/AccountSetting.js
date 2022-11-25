import { Avatar, Button } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

import './AccountSetting.css'
function AccountSetting() {
    const userData = useSelector(selectUserData);
    const handleSignOut = ()=>{
        signOut(auth)
    }
  return (
    <div className='accountSetting'>
        <Avatar sx={{ width: 60, height: 60 }} src={userData?.photoUrl} className='accountSetting__avatar'>{userData?.email[0]}</Avatar>
        <h3 className="accountSetting__name">{userData?.displayName}</h3>
        <h3 className="accountSetting__email">{userData?.email}</h3>
        <Button className='accountSetting__setting'>Manage your Google Account</Button>
        <Button className='accountSetting__signOut' onClick={handleSignOut}>Sign out</Button>
    </div>
  )
}

export default AccountSetting