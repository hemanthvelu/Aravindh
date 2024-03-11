import React from 'react'

const AddItems = ({newItem,setNewItem,handleSubmit}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <label>Add new:</label>
        <input type="text" value={newItem} onChange={(e=>setNewItem(e.target.value))} />
        <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default AddItems