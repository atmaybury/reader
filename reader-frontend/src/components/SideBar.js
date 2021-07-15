import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initSubs } from './../reducers/subReducer'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'

const SideBar = () => {
  
  const dispatch = useDispatch()
  
  const sideBarStyle = {
    padding: '10px'
  }

  // on page load
  useEffect(() => {
    dispatch(initSubs())
  }, [dispatch])

  return(
    <div style={sideBarStyle}>
      <AddSubsPanel />
      <SubsPanel />
    </div>
  )
}

export default SideBar
