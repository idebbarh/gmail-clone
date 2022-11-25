import React from 'react'
import './SideBarOption.css'

function SideBarOption({Icon,title,number,active}) {
  return (
    <div className={`sideBarOption ${active ? 'sideBarOption--active' : ''}`}>
        <Icon className='sideBarOption__icon'/>
        <h3 className='sideBarOption__title'>{title}</h3>
        {number && <span className='sideBarOption__number' style={{opacity:active ? 1 : 0}}>{number}</span>}
    </div>
  )
}

export default SideBarOption