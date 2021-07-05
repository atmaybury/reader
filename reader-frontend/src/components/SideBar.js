import React, { useState, useEffect } from 'react'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'
import subsService from './../services/subs'

const SideBar = (props) => {
  
  const [ subs, setSubs ] = useState([])
  
  const sideBarStyle = {
    padding: '10px'
  }

  // on page load
  useEffect(() => {
    getSubs()
  }, [])

  // update subs from db
  const getSubs = async () => {
    const response = await subsService.getAll()
    setSubs(response)
  }

  // add subscription
  const subscribe = async newUrl => {
    await subsService.subscribe(newUrl)
    getSubs()
  }

  return(
    <div style={sideBarStyle}>
      <AddSubsPanel subscribe={subscribe}/>
      <SubsPanel subs={subs} displayFeed={props.displayFeed}/>
    </div>
  )
}

export default SideBar
