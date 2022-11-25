import React from 'react'
import './MailRow.css'
import { Checkbox, IconButton } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSelectedMail } from '../features/mailSlice';
function MailRow({title,subject,message,time,id}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = (event)=>{
    if(event.target === event.currentTarget || event.target.className === 'mailRow__title' || event.target.className === 'mailRow__contents' || event.target.className === 'mailRow__time' || event.target.className === 'mailRow__message'){
      dispatch(setSelectedMail({title,subject,message,time,id}))
      navigate(`/mail/${id}`);
    }
  }
  return (
    <div className='mailRow' onClick={(event)=>openMail(event)}>
        <div className="mainRow__tools">
          <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}/>
          <IconButton>
              <StarBorderIcon className='mailRow__toolsIcon'/>
          </IconButton>
          <IconButton>
              <LabelImportantIcon className='mailRow__toolsIcon'/>
          </IconButton>
        </div>
        <h3 className="mailRow__title">{title}</h3>
        <p className="mailRow__contents">{subject} - <span className='mailRow__message'>{message}</span></p>
        <h3 className='mailRow__time'>{time}</h3>
    </div>
  )
}
export default MailRow