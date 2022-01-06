import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewSub } from '../reducers/subReducer'
import { useField } from '../hooks/index'

import fraidyscrape from 'fraidyscrape'
//const scraper = new fraidyscrape()

import styled from '@emotion/styled'

const AddSubPanel = () => {
  const dispatch = useDispatch()

  const newSub = useField('text')

  const addSub = (event) => {
    event.preventDefault()
    dispatch(addNewSub(newSub.fields.value))
    newSub.reset()
  }

  const fraidy = () => {

  }

  return(
    <AddSubForm onSubmit={addSub} id="subscribe-form">
      <input { ...newSub.fields } />
      <button>TEST</button>
      <button type="submit">Subscribe</button>
    </AddSubForm>
  )
}

const AddSubForm = styled.form`
  width: 100%;
  & > * {
    margin: 0.25em 0 0.25em 0;
  }
`
export default AddSubPanel
