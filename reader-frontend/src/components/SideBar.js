import React from 'react'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'

const SideBar = () => {
  
  const sideBarStyle = {
    padding: '10px'
  }

  return(
    <div style={sideBarStyle}>
      <AddSubsPanel />
      <SubsPanel />
    </div>
  )
}

export default SideBar
