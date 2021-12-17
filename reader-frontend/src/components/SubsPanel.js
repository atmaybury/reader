import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from '@emotion/styled'

import { initSubs } from './../reducers/subReducer'

import SubsPanelEntry from './SubsPanelEntry'
import LoadingDots from '../components/common/LoadingDots'

const SubsPanel = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSubs())
  }, [dispatch])

  const subs = useSelector(state => state.subs)

  if (!subs) return 
    <Panel>
      <h3>No subscriptions</h3>
    </Panel>

  if (subs.subsLoading)
    return(
      <Panel>
        <LoadingDots />
      </Panel>
    )

  return(
    <Panel>
      {subs.subs.map((sub, i) => 
        <SubsPanelEntry key={i} sub={sub} />
      )}
    </Panel>
  )
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.25em 0 0.25em 0;
  }
`

export default SubsPanel
