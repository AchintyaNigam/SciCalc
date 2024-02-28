import { useState } from 'react';
import * as math from "mathjs";

import Memory from './Memory';
import MemoryButtons from './MemoryButtons';
import TrigoAndFunc from './trigoNfunc';
import Display from './Display';
import ExtraButtons from './ExtraButtons';
import NonChangingButtons from './NonChangingButtons';
import MainButtons from './MainButtons';

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  
  const [mode, setMode] = useState("rad");
  
  const [memory, setMemory] = useState("");
  const [isMvClicked, setMv] = useState(false);
  
  const [isTrigoClicked, setTrigoVisibility] = useState(false);
  const [isFuncClicked, setFuncVisibility] = useState(false);

  const [second_press, setSecond_press] = useState(false); 

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

    display_fix();

    
  };
  
  const display_fix = () =>{
    if(isTrigoClicked && !isFuncClicked)
      setTrigoVisibility(false);
    else if(isFuncClicked && !isTrigoClicked)
      setFuncVisibility(false);
  }
    
  const calculate = () =>
    {
      try {
        const allVariables = {
            //...customVariables,
            pi: Math.PI,
            e: Math.E,
            ln: math.log, // Natural logarithm(base e)
            log10: math.log10,
            logBaseY: (x, y) => math.log(x) / math.log(y),
            cbrt: (x)=>math.cbrt(x),
            fact: (x)=>math.factorial(x),
  
            sin: (x) => math.sin(math.unit(x, mode)),
            cos: (x) => math.cos(math.unit(x, mode)),
            tan: (x) => math.tan(math.unit(x, mode)),
            sec: (x) => 1 / math.cos(math.unit(x, mode)),
            csc: (x) => 1 / math.sin(math.unit(x, mode)),
            cot: (x) => 1 / math.tan(math.unit(x, mode)),
  
            sinh: (x) => mode === "rad" ? Math.sinh(x) : math.sinh(x),
            cosh: (x) => mode === "rad" ? Math.cosh(x) : math.cosh(x),
            tanh: (x) => mode === "rad" ? Math.tanh(x) : math.tanh(x),
            sech: (x) => mode === "rad" ? 1 / Math.cosh(x) : 1 / math.cosh(x),
            csch: (x) => mode === "rad" ? 1 / Math.sinh(x) : 1 / math.sinh(x),
            coth: (x) => mode === "rad" ? 1 / Math.tanh(x) : 1 / math.tanh(x),
  
            
            asin: (x) => mode === "rad" ? Math.asin(x) : math.asin(x),
            acos: (x) => mode === "rad" ? Math.acos(x) : math.acos(x),
            atan: (x) => mode === "rad" ? Math.atan(x) : math.atan(x),
            asec: (x) => 1 / math.acos(math.unit(x, mode)),
            acsc: (x) => 1 / math.asin(math.unit(x, mode)),
            acot: (x) => 1 / math.atan(math.unit(x, mode)),
  
            asinh: (x) => mode === "rad" ? Math.asinh(x) : math.asinh(x),
            acosh: (x) => mode === "rad" ? Math.acosh(x) : math.acosh(x),
            atanh: (x) => mode === "rad" ? Math.atanh(x) : math.atanh(x),
            asech: (x) => 1 / math.acosh(x),
            acsch: (x) => 1 / math.asinh(x),
            acoth: (x) => 1 / math.atanh(x),
  
            abs: (x) => Math.abs(x),
            floor: (x) => Math.floor(x),
            ceil: (x) => Math.ceil(x),
        };
        if(calc==="")
          setResult("");
        else
        {
          const result_temp = math.evaluate(calc, allVariables);
          setResult(result_temp.toString());
          setCalc(calc+'=');
        }
        /*setResult(eval(calc).toString());*/
      } 
      catch (error) 
      {
        setResult("Error: Invalid expression");
      }
      display_fix();
    }


  const clear = () =>
  {
    setResult("");
    setCalc("");
    display_fix();
  }
  
  const second = () =>
  {
      setSecond_press(!second_press)
  }
  
  return (
    <div className="App">
      <Memory isMvClicked={isMvClicked} memory={memory} />
      <div className="calculator">
        <Display calc={calc} result={result} />
        <ExtraButtons mode={mode} setMode={setMode} result={result} setResult={setResult} setCalc={setCalc}/>
        <MemoryButtons setMv={setMv} isMvClicked={isMvClicked} clear={clear} memory={memory} setMemory={setMemory} result={result} setResult={setResult}/>
        <TrigoAndFunc isTrigoClicked={isTrigoClicked} setTrigoVisibility={  setTrigoVisibility} isFuncClicked={isFuncClicked} setFuncVisibility={setFuncVisibility} setResult={setResult} setCalc={setCalc} updateCalc={updateCalc} display_fix={display_fix} />          
        <NonChangingButtons updateCalc={updateCalc} clear={clear} result={result} setResult={setResult} setCalc={setCalc} second={second} second_press={second_press} />
        <MainButtons mode={mode} updateCalc={updateCalc} second_press={second_press} display_fix={display_fix} result={result} setResult={setResult} setCalc={setCalc} calculate={calculate}/>
      </div>
    </div>
  );
}

export default App;
