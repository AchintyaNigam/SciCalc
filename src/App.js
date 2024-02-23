import { useState } from 'react';
import * as math from "mathjs";



function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [second_press, setSecond_press] = useState(false);  
  const [customVariables, setCustomVariables] = useState({});
  const [mode, setMode] = useState("rad");
  const [memory, setMemory] = useState("");

  const ops = ['/', '*', '+', '-', '.'];


  const updateCalc = (value) => {
    // Check if the value is an operator
    if (ops.includes(value) && value !== '-') {
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
          ln: math.log, // Natural logarithm
          log10: math.log10,
          logBaseY: (x, y) => math.log(x) / math.log(y),
          cbrt: (x)=>math.cbrt(x),
          fact: (x)=>math.factorial(x),
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
        setResult(result_temp.toString());
      }

      
      /*setResult(eval(calc).toString());*/
  } catch (error) {
      setResult("Error: Invalid expression");
  }

  
    
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
    else if (result === "Error: Invalid expression")
    {
      setResult("");
      return;
    }

    const value = result.slice(0, -1);

    setCalc(value);
    setResult(value);
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
  }

  const second = () =>
  {
    setSecond_press(!second_press)
  }

  const changing_operators = () =>
  {
    const operators_changing = [];
    if(!second_press)
    {
      operators_changing.push(
        <button onClick={()=>updateCalc('^2')}>x<sup>2</sup></button>,
        <button onClick={()=>updateCalc('^3')}>x<sup>3</sup></button>,
        <button onClick={()=>updateCalc('^')}>x<sup>y</sup></button>,
        <button onClick={()=>updateCalc('10^')}>10<sup>x</sup></button>,
        <button onClick={()=>updateCalc('log10(')}>log</button>,
        <button onClick={()=>updateCalc('ln(')}>ln</button>,
      );
    }
    else
    {
      operators_changing.push(
        <button onClick={()=>updateCalc('^3')}>x<sup>3</sup></button>,
        <button onClick={()=>updateCalc('cbrt(')}>cbrt(x)</button>,
        <button onClick={()=>updateCalc('^(1/')}>yrt(x)</button>,
        <button onClick={()=>updateCalc('2^')}>2<sup>x</sup></button>,
        <button onClick={()=>updateCalc('logBaseY(')}>log<sub>y</sub>x</button>,
        <button onClick={()=>updateCalc('e^')}>e<sup>x</sup></button>,
      );
    }
    return operators_changing;
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {calc ? <span>{calc}</span>: ''} 
          <br /> &nbsp;
          {result || "0"}
        </div>
        <div className='extra_buttons'>
          <button>GRAD</button>
          <button>F-E</button>

        </div>
        <div className='memory_buttons'>
          <button>MC</button>
          <button>MR</button>
          <button>M+</button>
          <button>M-</button>
          <button>MS</button>
          <button>MU</button>

        </div>
        <div className='trigoNfunc'>
          <hr></hr>
          <button>Trigonometry</button>
          <button>Function</button>
        </div>
        <div className='non-changing-buttons'>
          <button onClick={second} id={second_press ? 'second_pressed' : 'second_notpressed'}>2<sup>nd</sup></button> 
          <button onClick={()=>updateCalc('pi')}>pi</button>
          <button onClick={()=>updateCalc('e')}>e</button>
          <button onClick={clear}>CE</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className='buttons_container'>
          <div className='scientific_operators'>
            {changing_operators()}

          </div>
          <div className='buttons_container_child'>

            <div className='secondary_buttons'>
              <button onClick={()=>updateCalc('^-1')}><sup>1</sup>/<sub>x</sub></button>
              <button onClick={()=>updateCalc(',')}>,</button>
              <button>exp</button>
              <button onClick={()=>updateCalc('(')}>(</button>            
              <button onClick={()=>updateCalc(')')}>)</button>
              <button onClick={()=>updateCalc('fact(')}>n!</button>
            </div>

            <div className="digits">
              { createDigits() }
              <button onClick={negate}><sup>+</sup>/<sub>-</sub></button>
              <button onClick={()=>updateCalc('0')}>0</button>
              <button onClick={()=>updateCalc('.')}>.</button>
            </div>
          </div>
          

          <div className="operators">
            <button onClick={()=>updateCalc('%')}>mod</button>
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
