import React from 'react'

const SubsPanel = ({ subs, displayFeed }) => {

  return(
    <ul>
      {subs.map((sub, i) => 
        <li key={i}><button onClick={() => {displayFeed(sub)}}>{sub.name}</button></li>
      )}
    </ul>
  )
}

export default SubsPanel
