import React from 'react'
import { useSelector } from 'react-redux'
import SubsPanelEntry from './SubsPanelEntry'

const SubsPanel = () => {
  const subs = useSelector(state => state.subs.subs)

  return(
    <ul>
      {subs.map((sub, i) => 
        <SubsPanelEntry sub={sub} i={i} />
      )}
    </ul>
  )
}

export default SubsPanel
