function MemoryButtons ({ setMv, isMvClicked, clear, memory, setMemory, result, setResult }){

    const handleMvClick = () => {
      setMv(!isMvClicked);
    }
  
    const mr_call = () =>
    {
      clear();
      setResult(memory.toString());
    }
  
    const ms_call = () => {
      if(result !== "Error: Invalid expression"){
        console.log(result)
        setMemory(result);
      }
    }
  
    return(
      <div className='memory_buttons'>
        <button onClick={()=>setMemory("")}>MC</button>
        <button onClick={mr_call}>MR</button>
        <button onClick={()=>setMemory((parseFloat(memory)+1).toString())}>M+</button>
        <button onClick={()=>setMemory((parseFloat(memory)-1).toString())}>M-</button>
        <button onClick={ms_call}>MS</button>
        <button onClick={handleMvClick}>Mv</button>
      </div>
    )
  }

  export default MemoryButtons;