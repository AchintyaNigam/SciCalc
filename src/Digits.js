function Digits ({ updateCalc, display_fix, result, setResult, calc, setCalc })
{
    const createDigits = () => {
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
        
      }
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
        display_fix();
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