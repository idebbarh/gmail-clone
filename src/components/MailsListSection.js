import React from 'react'
import './MailsListSection.css'

function MailsListSection({Icon,title,active}) {
  return (
    <div className={`mailsListSection ${active ? 'mailsListSection--active' : ''}`}>
        <Icon className='mailsListSection__icon'/>
        <h3 className='mailsListSection__title'>{title}</h3>
    </div>
  )
}
export default MailsListSection