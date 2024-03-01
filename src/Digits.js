import { useCallback } from "react";

function Digits ({ updateCalc, displayFix, result, setResult, calc, setCalc })
{
    const createDigits = useCallback(() => {
        const digits = [];
    
        for(let i = 7; i < 10; i++)
        {
          digits.push(
            <button onClick={()=>updateCalc(i.toString())} key={i}>{i}</button>
          )
        }
        for(let i = 4; i < 7; i++)
        {
          digits.push(
            <button onClick={()=>updateCalc(i.toString())} key={i}>{i}</button>
          )
        }
        for(let i = 1; i < 4; i++)
        {
          digits.push(
            <button onClick={()=>updateCalc(i.toString())} key={i}>{i}</button>
          )
        }
    
        return digits;
        
      }, [updateCalc])
    const negate = () =>
    {

        var temp = result;
        var temp1 = (-1*result);
        if(!isNaN(temp1))
        {
            temp = temp1;
        }

        setCalc((temp).toString());
        setResult((temp).toString());  
        displayFix();
    }
    return(
        <div className="digits">
            { createDigits() }
            <button onClick={negate}><sup>+</sup>/<sub>-</sub></button>
            <button onClick={()=>updateCalc('0')}>0</button>
            <button onClick={()=>updateCalc('.')}>.</button>
        </div>
    )
}

export default Digits;