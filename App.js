import { useEffect, useState } from "react";
import Content from "./Content";
import AddItems from "./AddItems";
import Fetch from "./Fetch";


function App() {
  const [list,setList]=useState([])
  const [newItem,setNewItem]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const Apiurl="http://localhost:3500/list"
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch(Apiurl)
        if(!response.ok) throw Error("data not received")
        const result=await response.json()
      setList(result)
      }
    catch(err){
      console.log(err.message)
    }

    }
      (async()=>fetchData())()
  },[])

  const handleCheck=async(id)=>{
    const result=list.map((li)=>li.id===id? {...li,checked:!li.checked} :li)
    setList(result)
    const mylist=list.filter((li)=>li.id===id)
    const updatemethod={
      method:'PATCH',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({checked:mylist[0].checked})
    }
    const reqUrl=`${Apiurl}/${id}`
    const result1=await Fetch(reqUrl,updatemethod)
    if(result1) setFetchError(result1)
  }
const handleDelete=async(id)=>{
  const result=list.filter((li)=>(li.id!==id))
  setList(result)
  const deletemethod={method:'DELETE'}
  const reqUrl=`${Apiurl}/${id}`
  const result1=await Fetch(reqUrl,deletemethod)
  if(result1) setFetchError(result1)
}


  const handleSubmit=(e)=>{
    e.preventDefault()
    addnew(newItem)
  }
  const addnew=async(newi)=>{
    const id=list.length? list[list.length-1].id+1 : 1
    const addn={id,checked:false,name:newi}
    const postmethod={
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(addn)
    }
    const result=await Fetch(Apiurl,postmethod)
    if(result) setFetchError(result)
    setNewItem('')
  }

  
  return (
    <div>
      <AddItems newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <main>
      {fetchError &&<p>{fetchError}</p>}
      <Content list={list} handleCheck={handleCheck} handleDelete={handleDelete}/></main>
    
    </div>
  );
}

export default App;
