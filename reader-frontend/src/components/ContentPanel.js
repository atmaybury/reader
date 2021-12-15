import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from "@emotion/styled"
import { removeSub } from './../reducers/subReducer'
import ContentPanelEntry from './ContentPanelEntry'
import LoadingDots from './common/LoadingDots'

const ContentPanel = () => {

  const dispatch = useDispatch()
  const subs = useSelector(state => state.subs)

  if (!subs.currentSub && !subs.feedLoading) return <h1>No feed selected</h1>

  if (subs.feedLoading)
    return(
      <ContentPanelDiv>
        <LoadingDots />
      </ContentPanelDiv>
    )

  return(
      <ContentPanelDiv>
        {subs.currentSub.name}
        <button onClick={() => dispatch(removeSub(subs.currentSub.id)) }>Unsubscribe</button>
        {subs.currentSub.feed.map((post, i) => 
          <ContentPanelEntry key={i} post={post} />
        )}
      </ContentPanelDiv>
  )
}

const ContentPanelDiv = styled.div`
  width: 60%;
  padding: 10px;
`

export default ContentPanel
