import React, { useEffect } from 'react'
import './Mail.css'
import { IconButton } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import LabelIcon from '@mui/icons-material/Label';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selecteSelectedMail, setSelectedMail } from '../features/mailSlice';
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { selectUserData } from '../features/userSlice';
import ReactLoading from 'react-loading';
function Mail() {
  const navigate = useNavigate();
  const mailData = useSelector(selecteSelectedMail);
  const userData = useSelector(selectUserData);
  const {id} = useParams();
  const dispatch = useDispatch()
  const deleteMail = async () =>{
    await deleteDoc(doc(db,`user${userData?.email}mails`,mailData.id));
    navigate(-1);
  }
  useEffect(()=>{
    const getDocIfNotExists = async ()=>{
      if(mailData === null){
        const docRef = doc(db,`user${userData?.email}mails`,id);
        const docSnap = await getDoc(docRef);
        dispatch(setSelectedMail({title:docSnap.data()?.to,subject:docSnap.data()?.subject,message:docSnap.data()?.message,time:new Date(docSnap.data()?.timestamp?.seconds * 1000).toUTCString(),id:id}))
      }
    }
    getDocIfNotExists();
  },[]);
  return (
    
    <div className='mail'>
        <div className="mail__setting">
          <IconButton onClick={()=>navigate(-1)}>
                <KeyboardBackspaceIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <ArchiveIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <ReportIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton onClick={deleteMail}>
                <DeleteIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <MarkunreadIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <AccessAlarmsIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <AddTaskIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <DriveFileMoveIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <LabelIcon className='mail__settingIcon'/>
            </IconButton>
          <IconButton>
                <MoreVertIcon className='mail__settingIcon'/>
            </IconButton>
        </div>
        {mailData !== null ? <div className="mail__body">
          <div className="mail__bodyHeader">
            <h2 className='mail__subject'>{mailData?.subject}</h2>
            <span className='mail__title'>{mailData?.title}</span>
            <IconButton>
                <LabelIcon className='mail__bodyHeaderIcon'/>
            </IconButton>
            <span className='mail__time'>{mailData?.time}</span>
          </div>
          <p className="mail__message">{mailData?.message}</p>
        </div> : <div style={{width:'100%',height:'calc(100% - 44px)',display:'flex',alignItems:'center',justifyContent:'center'}}><ReactLoading type='bars' height={'10%'} width={'10%'} color='#fff'/></div>}
    </div>
  )
}

export default Mail