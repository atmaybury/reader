import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { initSubs } from './../reducers/subReducer'
import SubsPanelEntry from './SubsPanelEntry'

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.25em 0 0.25em 0;
  }
`

const SubsPanel = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSubs())
  }, [dispatch])

  const subs = useSelector(state => state.subs.subs)

  return(
    <Panel>
      {subs.map((sub, i) => 
        <SubsPanelEntry key={i} sub={sub} />
      )}
    </Panel>
  )
}

export default SubsPanel
