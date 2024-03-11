import React from 'react'

const Content = ({list,handleCheck,handleDelete}) => {
  return (
    <div>
         <>
        {
           
            list.map((li)=>(
                <li>
                    <input type="checkbox" checked={li.checked} onChange={()=>handleCheck(li.id)}/>
                    <label>{li.name}</label>
                    <button onClick={()=>handleDelete(li.id)}>Delete</button>
                </li>
            ))
        }</>
    </div>
  )
}

export default Content