import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addNewSub } from '../reducers/subReducer'
import { useField } from '../hooks/index'

const AddSubForm = styled.form`
  & > * {
    margin: 0.25em 0 0.25em 0;
  }
`

const AddSubPanel = () => {
  const dispatch = useDispatch()

  const newSub = useField('text')

  const addSub = (event) => {
    event.preventDefault()
    dispatch(addNewSub(newSub.fields.value))
    newSub.reset()
  }

  return(
    <AddSubForm onSubmit={addSub} id="subscribe-form">
      <input { ...newSub.fields } />
      <button type="submit">Subscribe</button>
    </AddSubForm>
  )
}

export default AddSubPanel
