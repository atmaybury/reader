import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const ContentPanelEntry = ({ post }) => {
  return(
    <div class="post">
      <h3>{post.title}</h3>
      { ReactHtmlParser(post.content) }
      <hr />
    </div>
  )
}

export default ContentPanelEntry
