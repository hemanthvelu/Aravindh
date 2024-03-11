const Fetch =async (url,method=null,errMsg=null) => {
 try{
    const response=await fetch(url,method)
    if(!response.ok) throw Error('please reload the page')
 }
catch(err){
    errMsg=err.message
}
finally{
    return errMsg
}
}

export default Fetch