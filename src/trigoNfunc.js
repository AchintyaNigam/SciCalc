import { useState } from "react";
function TrigoAndFunc ({ isTrigoClicked, setTrigoVisibility, isFuncClicked, setFuncVisibility, setResult, setCalc, updateCalc, display_fix })
{
    const [second_press_trigo, setSecond_press_trigo] = useState(false);  
    const [hyp_press, setHyp_press] = useState(false);  

    const handleTrigoClick = () => {
        setTrigoVisibility(!isTrigoClicked);
        setFuncVisibility(false);
      };
    
    const handleFuncClick = () =>
    {
    setFuncVisibility(!isFuncClicked);
    setTrigoVisibility(false);
    }
    
    const random = () =>
    {
        const random = Math.random();
        setCalc("");
        setResult(random);
        display_fix();
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
    return(
        <div className='trigoNfunc'>
            <hr></hr>
            <button onClick={handleTrigoClick}>Trigonometry</button>
            <button onClick={handleFuncClick}>Function</button>
            <div className='trigo-container'>
                {isTrigoClicked && <div className='trigo'>
                    {trigo_changes()}
                </div>}
            </div>
            <div className='func-container'>
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
    )
}

export default TrigoAndFunc;