import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewSub } from './../reducers/subReducer'

const AddSubPanel = () => {
  const [ newSub, setNewSub ] = useState('')

  const dispatch = useDispatch()

  // controlled input handler
  const handleNewSub = event => {
    setNewSub(event.target.value)
  }

  const addSub = (event) => {
    event.preventDefault()
    dispatch(addNewSub(newSub))
    setNewSub('')
  }

  return(
    <form onSubmit={addSub} id="subscribe-form">
      <input value={newSub} onChange={handleNewSub}/>
      <button type="submit">Subscribe</button>
    </form>
  )
}

export default AddSubPanel
