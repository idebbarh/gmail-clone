import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MailsList from './components/MailsList';
import Mail from './components/Mail';
import SendMail from './components/SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selecteMailFormIsOpen } from './features/mailSlice';
import { login, logout, selectUserData } from './features/userSlice';
import LoginPage from './components/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
function App() {
  const mailFormIsOpen = useSelector(selecteMailFormIsOpen);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({displayName:user.displayName,email:user.email,photoUrl:user.photoURL,userId:user.uid}));
      } else {
        dispatch(logout())
      }
    });
  }, []);
  return (
    <BrowserRouter>
        {userData ? <div className="app">
            <Header/>
            <div className="app__mainContent">
                <SideBar/>
                <Routes>
                    <Route path="/" element={<MailsList/>}/>
                    <Route path="/mail" element={<Mail/>}/>
                </Routes>
            </div>
            {mailFormIsOpen && <SendMail/>}
        </div> : <LoginPage/>}
    </BrowserRouter>
  );
}

export default App;
