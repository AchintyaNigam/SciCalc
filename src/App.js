import { useState } from 'react';
import * as math from "mathjs";



function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [second_press, setSecond_press] = useState(false);  
  const [isTrigoClicked, setTrigoVisibility] = useState(false);
  const [mode, setMode] = useState("rad");
  const [isFuncClicked, setFuncVisibility] = useState(false); 
  const [second_press_trigo, setSecond_press_trigo] = useState(false);  
  const [hyp_press, setHyp_press] = useState(false); 
  const [memory, setMemory] = useState("");
  const [isMvClicked, setMv] = useState(false);

  const ops = ['/', '*', '+', '-', '.'];
  
  const handleTrigoClick = () => {
    setTrigoVisibility(!isTrigoClicked);
    setFuncVisibility(false);
  };

  const handleFuncClick = () =>
  {
    setFuncVisibility(!isFuncClicked);
    setTrigoVisibility(false);
  }

  const handleMvClick = () => {
    setMv(!isMvClicked);
  }

  const memory_call = () => {
    if(memory==='')
      return(<p>There is nothing in Memory, use (MS) to store value</p>);
    else
      return(<p>{memory}</p>);

  }


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
  } catch (error) {
      setResult("Error: Invalid expression");
  }
  display_fix();
  }

  const random = () =>
  {
    const random = Math.random();
    setCalc("");
    setResult(random);
    display_fix();
  }


  const clear = () =>
  {
    setResult("");
    setCalc("");
    display_fix();
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
    display_fix();
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

  const mode_toggle = () =>
  {
    if(mode==='rad')
      setMode('deg');
    else
      setMode('rad');
  }

  const deg_rad_button = () =>
  {
    if(mode === 'rad')
      return(<button onClick={mode_toggle}>RAD</button>);
    else
      return(<button onClick={mode_toggle}>DEG</button>);
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
  const handle_second_trigo_click = () =>
  {
    setSecond_press_trigo(!second_press_trigo);
  }

  const handle_hyp_click = () =>
  {
    setHyp_press(!hyp_press);
  }

  const trigo_changes = () =>
  {
    const changes = [];
    if(second_press_trigo && !hyp_press)
    {
      changes.push(
        <button onClick={handle_second_trigo_click} style={{ backgroundColor: '#6ca6c1'}}>2nd</button>,
        <button onClick={()=>updateCalc('asin(')}>sin<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acos(')}>cos<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('atan(')}>tan<sup>-1</sup></button>,
        <button onClick={handle_hyp_click}>hyp</button>,
        <button onClick={()=>updateCalc('asec(')}>sec<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acosec(')}>csc<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acot(')}>cot<sup>-1</sup></button>
      )
    }
    else if(hyp_press && !second_press_trigo)
    {
      changes.push(
        <button onClick={handle_second_trigo_click}>2nd</button>,
        <button onClick={()=>updateCalc('sinh(')}>sinh</button>,
        <button onClick={()=>updateCalc('cosh(')}>cosh</button>,
        <button onClick={()=>updateCalc('tanh(')}>tanh</button>,
        <button onClick={handle_hyp_click} style={{ backgroundColor: '#6ca6c1'}}>hyp</button>,
        <button onClick={()=>updateCalc('sech(')}>sech</button>,
        <button onClick={()=>updateCalc('cosech(')}>csch</button>,
        <button onClick={()=>updateCalc('coth(')}>coth</button>,
      )
    }
    else if(hyp_press && second_press_trigo)
    {
      changes.push(
        <button onClick={handle_second_trigo_click} style={{ backgroundColor: '#6ca6c1'}}>2nd</button>,
        <button onClick={()=>updateCalc('asinh(')}>sinh<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acosh(')}>cosh<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('atanh(')}>tanh<sup>-1</sup></button>,
        <button onClick={handle_hyp_click} style={{ backgroundColor: '#6ca6c1'}}>hyp</button>,
        <button onClick={()=>updateCalc('asech(')}>sech<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acosech(')}>csch<sup>-1</sup></button>,
        <button onClick={()=>updateCalc('acot(')}>coth<sup>-1</sup></button>
      )
    }
    else
    {
      changes.push(
        <button onClick={handle_second_trigo_click}>2nd</button>,
        <button onClick={()=>updateCalc('sin(')}>sin</button>,
        <button onClick={()=>updateCalc('cos(')}>cos</button>,
        <button onClick={()=>updateCalc('tan(')}>tan</button>,
        <button onClick={handle_hyp_click}>hyp</button>,
        <button onClick={()=>updateCalc('sec(')}>sec</button>,
        <button onClick={()=>updateCalc('cosec(')}>csc</button>,
        <button onClick={()=>updateCalc('cot(')}>cot</button>
      )
    }

    return changes;
  }

  const mr_call = () =>
  {
    clear();
    setResult(memory.toString());
  }

  const handleFEClick = () =>
  {
    const res = parseFloat(result).toExponential().toString() 
    setCalc(res);
    setResult(res);
  }
  return (
    <div className="App">
      {isMvClicked && <div className='memory'>
        <h1>Memory</h1>
        <hr></ hr>
        <div className='memory_internal_container'>
          {memory_call()}
        </div>
      </div>}
      <div className="calculator">
        <div className="display">
          {calc ? <span>{calc}</span>: ''} 
          <br /> &nbsp;
          {result || "0"}
        </div>
        <div className='extra_buttons'>
          {deg_rad_button()}
          <button onClick={handleFEClick}>F-E</button>
        </div>
        <div className='memory_buttons'>
          <button onClick={()=>setMemory("")}>MC</button>
          <button onClick={mr_call}>MR</button>
          <button onClick={()=>setMemory(memory+1)}>M+</button>
          <button onClick={()=>setMemory(memory-1)}>M-</button>
          <button onClick={()=>setMemory(result)}>MS</button>
          <button onClick={handleMvClick}>Mv</button>

        </div>
        <div className='trigoNfunc'>
          <hr></hr>
          <button onClick={handleTrigoClick}>Trigonometry</button>
          <button onClick={handleFuncClick}>Function</button>
          <div className='trigo-container'>
            {isTrigoClicked && <div className='trigo'>
              {trigo_changes()}
            </div>}
          <div classNAme='func-container'>
            {isFuncClicked && <div className='func'>
              <button onClick={()=>updateCalc('abs(')}>abs()</button>
              <button onClick={()=>updateCalc('floor(')}>floor()</button>
              <button onClick={()=>updateCalc('ceil(')}>ceil()</button>
              <button onClick={random}>rand</button>
              <button>dms</button>
              <button>deg</button>
              </div>}
          </div>
          </div>
          
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
              <button onClick={()=>updateCalc('e+')}>exp</button>
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
