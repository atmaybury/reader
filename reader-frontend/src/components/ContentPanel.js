import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import subsService from './../services/subs'

const ContentPanel = ({ currentSub }) => {

  const contentPanelStyle = {
    padding:'10px',
  }

  const unsubscribe = async id => {
    subsService.unsubscribe(id)
  }

  return(
      <div id="content-panel" style={contentPanelStyle}>
        <h2>{currentSub.name}</h2>
          {currentSub && 
            currentSub.items.map((post, i) => 
              <>
                <button onClick={() => {unsubscribe(currentSub.id)}}>Unsubscribe</button>
                <ul style={{listStyleType: "none"}}>
                  <li key={i}><h3>{post.title}</h3>{ ReactHtmlParser(post.content) }</li>
                </ul>
              </>
            )
          }
      </div>
  )
}

export default ContentPanel
