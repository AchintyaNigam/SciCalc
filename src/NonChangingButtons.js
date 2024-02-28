function NonChangingButtons ({ updateCalc, clear, result, setResult, setCalc, second, second_press, display_fix })
{
    

    const deleteLast = () => {

        if(result === '')
        {
          return;
        }
        else if (result === "Error: Invalid expression")
        {
          setResult("");
          return;
        }
    
        const value = result.slice(0, -1);
    
        setCalc(value);
        setResult(value);
        display_fix();
      }

    return(
        <div className='non-changing-buttons'>
          <button onClick={second} id={second_press ? 'second_pressed' : 'second_notpressed'}>2<sup>nd</sup></button> 
          <button onClick={()=>updateCalc('pi')}>pi</button>
          <button onClick={()=>updateCalc('e')}>e</button>
          <button onClick={clear}>CE</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

    )
}

export default NonChangingButtons;