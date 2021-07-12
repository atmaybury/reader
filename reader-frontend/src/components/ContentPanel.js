import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useSelector, useDispatch } from 'react-redux'
import { removeSub } from './../reducers/subReducer'

const ContentPanel = () => {

  const dispatch = useDispatch()
  const currentSub = useSelector(state => state.subs.currentSub)

  const contentPanelStyle = {
    padding:'10px',
  }

  if (!currentSub)
    return( <h2>No sub selected</h2> )

  return(
      <div id="content-panel" style={contentPanelStyle}>
        <p>{currentSub.name}</p>
        <p>{currentSub.id}</p>
        <button onClick={() => dispatch(removeSub(currentSub.id)) }>Unsubscribe</button>
        {currentSub.items.map((post, i) => 
          <>
            <ul style={{listStyleType: "none"}}>
              <li key={i}><h3>{post.title}</h3>{ ReactHtmlParser(post.content) }</li>
            </ul>
          </>
        )}
      </div>
  )
}

export default ContentPanel
