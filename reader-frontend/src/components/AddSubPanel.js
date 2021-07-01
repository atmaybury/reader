import React, { useState } from 'react'

const AddSubPanel = ({ subscribe }) => {
  const [ newSub, setNewSub ] = useState('')

  // controlled input handler
  const handleNewSub = event => {
    setNewSub(event.target.value)
  }

  const addSub = (event) => {
    event.preventDefault()
    subscribe(newSub)
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
