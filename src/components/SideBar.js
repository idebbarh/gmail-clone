import React from 'react'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SnoozeIcon from '@mui/icons-material/Snooze';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SideBarOption from './SideBarOption';
import './SideBar.css'
import { useDispatch} from 'react-redux';
import { openMailForm } from '../features/mailSlice';
function SideBar() {
  const dispatch = useDispatch();
  return (
    <div className='sideBar'>
        <Button startIcon={<EditIcon/>} className='sideBar__compose' onClick={()=>dispatch(openMailForm())}>
            compose
        </Button>
        <div className="sideBar__options">
            <SideBarOption Icon={AllInboxIcon} title='inbox' number='232' active={true}/>
            <SideBarOption Icon={StarBorderIcon} title='starred' number='19' active={false}/>
            <SideBarOption Icon={SnoozeIcon} title='snoozed' number='17' active={false}/>
            <SideBarOption Icon={SendIcon} title='sent' number='90' active={false}/>
            <SideBarOption Icon={DraftsIcon} title='drafts' number='2' active={false}/>
            <SideBarOption Icon={ExpandMoreIcon} title='more' active={false}/>
        </div>
    </div>
  )
}

export default SideBar