function NonChangingButtons ({ updateCalc, clear, result, setResult, setCalc, second, isSecondClicked, displayFix })
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
        displayFix();
      }

    return(
        <div className='non_changing_buttons'>
          <button onClick={second} id={isSecondClicked ? 'second_clicked' : 'second_not_clicked'}>2<sup>nd</sup></button> 
          <button onClick={()=>updateCalc('pi')}>pi</button>
          <button onClick={()=>updateCalc('e')}>e</button>
          <button onClick={clear}>CE</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

    )
}

export default NonChangingButtons;