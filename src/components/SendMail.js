import { Button, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './SendMail.css'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeMailForm } from '../features/mailSlice';
import { collection, addDoc,serverTimestamp, getDocs} from "firebase/firestore"; 
import { db } from '../firebase/firebase';
import { selectUserData } from '../features/userSlice';
function SendMail() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const onSubmit = async (data)=> {
        const {to,subject,message} = data;
        try{
            await addDoc(collection(db,`user${userData?.email}mails`),{
                to:to,
                subject:subject,
                message:message,
                timestamp:serverTimestamp(),
            })
            const subcolRef = collection(db,`user${to}mails`)
            const subcolSnapshot = await getDocs(subcolRef)
            if (!subcolSnapshot.empty) {
                await addDoc(collection(db,`user${to}mails`),{
                    to:userData?.email,
                    subject:subject,
                    message:message,
                    timestamp:serverTimestamp(),
                })
            }
        }catch(e){
            alert("Error adding document: ",e)
        }
        dispatch(closeMailForm())
    };
  return (
    <div className='sendMail'>
        <div className="sendMail__header">
            <span className='sendMail__headerTitle'>new message</span>
            <IconButton onClick={()=>dispatch(closeMailForm())}>
              <CloseIcon className='sendMail__headerIcon'/>
            </IconButton>
        </div>
        <form className="sendMail__form" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" className='sendMail__input' placeholder='To' {...register("to",{required:'to is required'})}/>
            {errors.to && <p className='sendMail__error'>{errors.to.message}</p>}
            <input type="text" className='sendMail__input' placeholder='Subject' {...register("subject",{required:'the subject is required'})}/>
            {errors.subject && <p className='sendMail__error'>{errors.subject.message}</p>}
            <input type="text" className='sendMail__input input--message' {...register("message",{required:'the message is required'})}/>
            {errors.message && <p className='sendMail__error'>{errors.message.message}</p>}
            <Button endIcon={<ArrowDropDownIcon className='sendMail__icon'/>} className='sendMail__send' type='submit'>
                Send
            </Button>
        </form>
    </div>
  )
}

export default SendMail