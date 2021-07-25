import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initSubs, setCurrentSub, newFeed } from './../reducers/subReducer'

const SubsPanel = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSubs())
  }, [dispatch])

  const subs = useSelector(state => state.subs.subs)

  const displayFeed = async sub => {
    if (!sub.feed) {
      dispatch(newFeed(sub))
    } else {
      dispatch(setCurrentSub(sub))
    }
  }

  return(
    <ul>
      {subs.map((sub, i) => 
        <li key={i}><button onClick={() => {displayFeed(sub)}}>{sub.name}</button></li>
      )}
    </ul>
  )
}

export default SubsPanel
