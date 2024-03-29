function Memory({ isMvClicked, memory }) {
    const memoryCall = (memory) => {
      if(memory==='')
        return(<p>There is nothing in Memory, use (MS) to store value</p>);
      else
        return(<p>{memory}</p>);
  
    }
  
    if(isMvClicked)
    {
      console.log(memory)
      return(
        <div className='memory'>
          <h1>Memory</h1>
          <hr></ hr>
          <div className='memory_internal_container'>
            {memoryCall(memory)}
          </div>
        </div>
      )
    }
  }

  export default Memory;