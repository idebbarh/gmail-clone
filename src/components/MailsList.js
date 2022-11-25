import { Checkbox, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './MailsList.css'
import ReplayIcon from '@mui/icons-material/Replay';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MailsListSection from './MailsListSection';
import StayPrimaryLandscapeIcon from '@mui/icons-material/StayPrimaryLandscape';
import SellIcon from '@mui/icons-material/Sell';
import GroupIcon from '@mui/icons-material/Group';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import MailRow from './MailRow';
import { collection, onSnapshot,orderBy,query} from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';
import { selectUserData } from '../features/userSlice';
function MailsList() {
    const [haveShadow,setHaveShadow] = useState(false);
    const [mails,setMails] = useState([]);
    const userData = useSelector(selectUserData)
    useEffect(() => {
        const q = query(collection(db,`user${userData?.email}mails`),orderBy("timestamp",'desc'));
        onSnapshot(q,querySnapshot=>{
            setMails(querySnapshot.docs.map(doc=>{
                return {...doc.data(),id:doc.id}
            }));
        })
    }, []);
    const mailsListSettingStyle = haveShadow ? {
        boxShadow:'inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0, 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)'
    } : {}
    const handleScroll = (event)=>{
        const scrollVal = event.target.scrollTop;
        if(scrollVal > 0){
            setHaveShadow(true);
        }else {
            setHaveShadow(false);
        }
    }
    const mailsRowsElem = mails.map(mail=>{
        return <MailRow title={mail?.to} subject={mail?.subject} message={mail?.message} time={new Date(mail?.timestamp?.seconds * 1000).toUTCString()} key={mail?.id} id={mail?.id}/>
        
    })
  return (
    <div className='mailsList' onScroll={(event)=>handleScroll(event)}>
        <div className="mailsList__setting" style={mailsListSettingStyle}>
            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}/>
            <IconButton>
                <ReplayIcon className='mailsList__icon'/>
            </IconButton>

            <IconButton>
               <MoreVertIcon className='mailsList__icon'/>
            </IconButton>
        </div>
        <div className="mailsList__sections">
            <MailsListSection Icon={StayPrimaryLandscapeIcon} title='primary' active={true}/>
            <MailsListSection Icon={SellIcon} title='promotion' active={false}/>
            <MailsListSection Icon={GroupIcon} title='social' active={false}/>
            <MailsListSection Icon={FmdBadIcon} title='updates' active={false}/>
        </div>
        <div className="mails__list">
            {mailsRowsElem}
        </div>
    </div>
  )
}

export default MailsList