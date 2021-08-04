import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeSub } from './../reducers/subReducer'
import ContentPanelEntry from './ContentPanelEntry'

const ContentPanelDiv = styled.div`
  width: 60%;
  padding: 10px;
`

const ContentPanel = () => {

  const dispatch = useDispatch()
  const currentSub = useSelector(state => state.subs.currentSub)

  if (!currentSub)
    return(
      <ContentPanelDiv>
        <h2>No sub selected</h2>
      </ContentPanelDiv>
    )

  return(
      <ContentPanelDiv>
        {currentSub.name}
        <button onClick={() => dispatch(removeSub(currentSub.id)) }>Unsubscribe</button>
        {currentSub.feed.map((post, i) => 
          <ContentPanelEntry key={i} post={post} />
        )}
      </ContentPanelDiv>
  )
}

export default ContentPanel
