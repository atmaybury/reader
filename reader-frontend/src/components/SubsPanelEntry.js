import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { setCurrentSub, newFeed } from './../reducers/subReducer'

const Entry = styled.div`
  cursor: pointer;
  padding: 0.25em;
  color: var(--light-grey);
  background-color: var(--prussian-blue);
  border-radius: 0.5em;
`
const SelectedEntry = styled(Entry)`
  background-color: var(--cg-blue);
`

const SubsPanelEntry = ({ sub }) => {
  const dispatch = useDispatch()

  const currentSub = useSelector(state => state.subs.currentSub)

  const displayFeed = async sub => {
    if (!sub.feed) {
      dispatch(newFeed(sub))
    } else {
      dispatch(setCurrentSub(sub))
    }
  }

  if (sub === currentSub) {
    return (
      <SelectedEntry onClick={() => displayFeed(sub)}>{sub.name}</SelectedEntry>
    )
  }
  return (
    <Entry onClick={() => displayFeed(sub)}>{sub.name}</Entry>
  )
}

export default SubsPanelEntry
