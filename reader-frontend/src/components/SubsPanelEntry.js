import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentSub, newFeed } from './../reducers/subReducer'

const SubsPanel = ({ sub, i }) => {
  const dispatch = useDispatch()

  const displayFeed = async sub => {
    if (!sub.feed) {
      dispatch(newFeed(sub))
    } else {
      dispatch(setCurrentSub(sub))
    }
  }

  return(
    <li key={i}><button onClick={() => {displayFeed(sub)}}>{sub.name}</button></li>
  )
}

export default SubsPanel
