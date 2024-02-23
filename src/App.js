import { useState } from 'react';
import * as math from "mathjs";

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [customVariables, setCustomVariables] = useState({});
  const [mode, setMode] = useState("rad");
  const [memory, setMemory] = useState("");

  const ops = ['/', '*', '+', '-', '.'];


  const updateCalc = (value) => {
    // Check if the value is an operator
    if (ops.includes(value) && value != '-') {
      // Check if the result is empty or ends with an operator
      if (result === "" || ops.includes(result.slice(-1))) {
        return;
      }
      
    }
  
    // Concatenate the current result with the new value
    const newCalc = String(result) + String(value);
  
    // Update both calc and result
    setCalc(newCalc);
    setResult(newCalc);
  };
  
    

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
      if(calc==="")
        setResult("");
      else
      {
        const result_temp = math.evaluate(calc, allVariables);
        if (typeof result_temp === "number" && !isNaN(result)) 
        {
          setResult(Number(result).toFixed(4));
        } 
        else 
        {
          setResult("Error: Invalid expression");
        }
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
    /*
    if(
      result === '' ||
      ops.includes(result.slice(-1))
    )
    {
      return;
    }*/
    setCalc((-1*result).toString());
    setResult((-1*result).toString());  
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {calc ? <span>{calc}</span>: ''} 
          <br /> &nbsp;
          {result || "0"}
        </div>
        <div className='non-changing-buttons'>
          <button>2<sup>nd</sup></button> 
          <button>pi</button>
          <button>e</button>
          <button onClick={clear}>CE</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className='buttons_container'>
          <div className='scientific_operators'>
            <button>x<sup>2</sup></button>
            <button>x<sup>3</sup></button>
            <button>x<sup>y</sup></button>
            <button>10<sup>x</sup></button>
            <button>log</button>
            <button>ln</button>

          </div>
          <div className='buttons_container_child'>

            <div className='secondary_buttons'>
              <button><sup>1</sup>/<sub>x</sub></button>
              <button>|x|</button>
              <button>exp</button>
              <button>(</button>
              <button>)</button>
              <button>n!</button>
            </div>

            <div className="digits">
              { createDigits() }
              <button onClick={negate}><sup>+</sup>/<sub>-</sub></button>
              <button onClick={()=>updateCalc('0')}>0</button>
              <button onClick={()=>updateCalc('.')}>.</button>
            </div>
          </div>
          

          <div className="operators">
            <button>mod</button>
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
