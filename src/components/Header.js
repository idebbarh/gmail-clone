import React, { useState } from 'react'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/userSlice';
import AccountSetting from './AccountSetting';

function Header() {
    const [isSettingOpen,setIsSettingOpen] = useState(false);
    const [isFormFocus,setIsFormFocus] = useState(false);
    const userData = useSelector(selectUserData);

  return (
    <div className='header'>
        <div className="header__left">
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" alt="gmail logo" className='header__logo'/>
        </div>
        <div className="header__middle">
            <form className={`header__form ${isFormFocus ? 'header__form--focus' : ''}`}>
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <input type="text" className='header__searchInput' placeholder='Search mail' onFocus={()=>setIsFormFocus(true)} onBlur={()=>setIsFormFocus(false)}/>
                <IconButton>
                    <TuneIcon/>
                </IconButton>
            </form>
        </div>
        <div className="header__right">
            <IconButton>
                <HelpIcon/>
            </IconButton>
            <IconButton>
                <SettingsIcon/>
            </IconButton>
            <IconButton>
                <AppsIcon/>
            </IconButton>
            <Avatar src={userData?.photoUrl} className='header__avatar' onClick={()=>setIsSettingOpen(preveState=>!preveState)}>{userData?.email[0]}</Avatar>
        </div>
        {isSettingOpen && <AccountSetting/>}
    </div>
  )
}

export default Header