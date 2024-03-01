function MemoryButtons ({ setMv, isMvClicked, clear, memory, setMemory, result, setResult }){

    const handleMvClick = () => {
      setMv(!isMvClicked);
    }
  
    const mrCall = () =>
    {
      clear();
      setResult(memory.toString());
    }
  
    const msCall = () => {
      if(result !== "Error: Invalid expression"){
        console.log(result)
        setMemory(result);
      }
    }
  
    return(
      <div className='memory_buttons'>
        <button onClick={()=>setMemory("")}>MC</button>
        <button onClick={mrCall}>MR</button>
        <button onClick={()=>setMemory((parseFloat(memory)+1).toString())}>M+</button>
        <button onClick={()=>setMemory((parseFloat(memory)-1).toString())}>M-</button>
        <button onClick={msCall}>MS</button>
        <button onClick={handleMvClick}>Mv</button>
      </div>
    )
  }

  export default MemoryButtons;