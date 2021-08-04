import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

const ContentPanelEntry = ({ post }) => {
  
  const [ expanded, setExpanded ] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => { setExpanded(!expanded) }

  return(
    <div class="post">
      <h3>{post.title}</h3>
      <button onClick={toggleExpanded}>show</button>
      <div style={showWhenExpanded}>
        { ReactHtmlParser(post.content) }
      </div>
      <hr />
    </div>
  )
}

export default ContentPanelEntry
