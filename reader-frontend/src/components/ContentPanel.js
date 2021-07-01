import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const ContentPanel = ({ currentSub }) => {

  const contentPanelStyle = {
    padding:'10px',
  }

  return(
      <div id="content-panel" style={contentPanelStyle}>
        <h2>{currentSub.name}</h2>
        <ul style={{listStyleType: "none"}}>
          {currentSub && 
            currentSub.items.map((post, i) => 
              <li key={i}><h3>{post.title}</h3>{ ReactHtmlParser(post.content) }</li>
            )
          }
        </ul>
      </div>
  )
}

export default ContentPanel
