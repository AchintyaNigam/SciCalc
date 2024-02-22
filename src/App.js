import { useState } from 'react';
import * as math from "mathjs";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [customVariables, setCustomVariables] = useState({});
  const [mode, setMode] = useState("rad");
  const [memory, setMemory] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if(
      ops.includes(value) && result === '' ||
      ops.includes(value) && ops.includes(result.slice(-1))
    )
    {
      return;
    }
    setCalc(result + value);
    setResult(result + value);  

    if(!ops.includes(value))
    {
      setResult((result + value).toString());
    }
  }

  const createDigits = () => {
    const digits = [];

    for(let i = 1; i < 10; i++)
    {
      digits.push(
        <button onClick={()=>updateCalc(i.toString())} key={i}>{i}</button>
      )
    }

    return digits;
    
  }

  const calculate = () =>
  {
    try {
      const allVariables = {
          ...customVariables,
          pi: Math.PI,
          e: Math.E,
          // Add factorial function
          fact: math.factorial, 
          sin: mode === "rad" ? Math.sin : math.sin,
          cos: mode === "rad" ? Math.cos : math.cos,
          tan: mode === "rad" ? Math.tan : math.tan,
          asin: mode === "rad" ? Math.asin : math.asin,
          acos: mode === "rad" ? Math.acos : math.acos,
          atan: mode === "rad" ? Math.atan : math.atan,
      };

      const result = math.evaluate(calc, allVariables);
      if (typeof result === "number" && !isNaN(result)) {
          setResult(Number(result).toFixed(4));
      } else {
          setResult("Error: Invalid expression");
      }
  } catch (error) {
      setResult("Error: Invalid expression");
  }

    setResult(eval(calc).toString());
  }

  const clear = () =>
  {
    setResult("");
    setCalc("");
  }

  const deleteLast = () => {
    if(result === '')
    {
      return;
    }

    const value = result.slice(0, -1);

    setCalc(value);
    setResult(value);
  }

  const negate = () =>
  {
    if(
      result === '' ||
      ops.includes(result.slice(-1))
    )
    {
      return;
    }
    setCalc(-1*calc);
    setResult(-1*result);  
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {calc ? <span>{calc}</span>: ''} 
          <br /> &nbsp;
          {result || "0"}
        </div>

        <div className='buttons_container'>
          <div className='scientific_operators'>
            <button>Sin(x)</button>
            <button>Cos(x)</button>
            <button>tan(x)</button>
            <button>x<sup>2</sup></button>
            <button>x<sup>3</sup></button>
            <button>x<sup>y</sup></button>
            <button>log<sub>10</sub>()</button>
            <button>log<sub>e</sub>()</button>

          </div>
          <div className="digits">
            { createDigits() }
            <button onClick={negate}><sup>+</sup>/<sub>-</sub></button>
            <button onClick={()=>updateCalc('0')}>0</button>
            <button onClick={()=>updateCalc('.')}>.</button>
            
          </div>

          <div className="operators">
            <button onClick={deleteLast}>DEL</button>
            <button onClick={clear}>CLR</button>
            <button onClick={()=>updateCalc('/')}>/</button>
            <button onClick={()=>updateCalc('*')}>*</button>
            <button onClick={()=>updateCalc('+')}>+</button>
            <button onClick={()=>updateCalc('-')}>-</button>
            <button onClick={calculate} id='equalto'>=</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
