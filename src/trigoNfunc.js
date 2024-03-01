import { useCallback, useState } from "react";
function TrigoAndFunc ({ isTrigoClicked, setTrigoVisibility, isFuncClicked, setFuncVisibility, setResult, setCalc, updateCalc, displayFix })
{
    const [isSecondTrigoClicked, setIsSecondTrigoClicked] = useState(false);  
    const [isHypClicked, setIsHypClicked] = useState(false);  

    const handleTrigoClick = () => {
        setTrigoVisibility(!isTrigoClicked);
        setFuncVisibility(false);
      };
      
    const random = () =>
    {
        const random = Math.random();
        setCalc("");
        setResult(random);
        displayFix();
    }
    const handleSecondTrigoClick = useCallback(() =>
    {
        setIsSecondTrigoClicked(!isSecondTrigoClicked);
    }, [isSecondTrigoClicked])
    
    const handleHypClick = useCallback(() =>
    {
        setIsHypClicked(!isHypClicked);
    }, [isHypClicked])
        
    const trigoChanges = useCallback(() =>
    {
        const changes = [];
        if(isSecondTrigoClicked && !isHypClicked)
        {
            changes.push(
                <button onClick={handleSecondTrigoClick} style={{ backgroundColor: '#6ca6c1'}}>2nd</button>,
                <button onClick={()=>updateCalc('asin(')}>sin<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acos(')}>cos<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('atan(')}>tan<sup>-1</sup></button>,
                <button onClick={handleHypClick}>hyp</button>,
                <button onClick={()=>updateCalc('asec(')}>sec<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acosec(')}>csc<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acot(')}>cot<sup>-1</sup></button>
                )
        }
        else if(isHypClicked && !isSecondTrigoClicked)
        {
            changes.push(
                <button onClick={handleSecondTrigoClick}>2nd</button>,
                <button onClick={()=>updateCalc('sinh(')}>sinh</button>,
                <button onClick={()=>updateCalc('cosh(')}>cosh</button>,
                <button onClick={()=>updateCalc('tanh(')}>tanh</button>,
                <button onClick={handleHypClick} style={{ backgroundColor: '#6ca6c1'}}>hyp</button>,
                <button onClick={()=>updateCalc('sech(')}>sech</button>,
                <button onClick={()=>updateCalc('cosech(')}>csch</button>,
                <button onClick={()=>updateCalc('coth(')}>coth</button>,
                )
        }
        else if(isHypClicked && isSecondTrigoClicked)
        {
            changes.push(
                <button onClick={handleSecondTrigoClick} style={{ backgroundColor: '#6ca6c1'}}>2nd</button>,
                <button onClick={()=>updateCalc('asinh(')}>sinh<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acosh(')}>cosh<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('atanh(')}>tanh<sup>-1</sup></button>,
                <button onClick={handleHypClick} style={{ backgroundColor: '#6ca6c1'}}>hyp</button>,
                <button onClick={()=>updateCalc('asech(')}>sech<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acosech(')}>csch<sup>-1</sup></button>,
                <button onClick={()=>updateCalc('acot(')}>coth<sup>-1</sup></button>
                )
        }
        else
        {
            changes.push(
                <button onClick={handleSecondTrigoClick}>2nd</button>,
                <button onClick={()=>updateCalc('sin(')}>sin</button>,
                <button onClick={()=>updateCalc('cos(')}>cos</button>,
                <button onClick={()=>updateCalc('tan(')}>tan</button>,
                <button onClick={handleHypClick}>hyp</button>,
                <button onClick={()=>updateCalc('sec(')}>sec</button>,
                <button onClick={()=>updateCalc('cosec(')}>csc</button>,
                <button onClick={()=>updateCalc('cot(')}>cot</button>
                )
        }
        return changes;
    }, [updateCalc, handleHypClick, handleSecondTrigoClick, isHypClicked, isSecondTrigoClicked])
    
    const handleFuncClick = () =>
    {
    setFuncVisibility(!isFuncClicked);
    setTrigoVisibility(false);
    }

    return(
        <div className='trigoNfunc'>
            <hr></hr>
            <button onClick={handleTrigoClick}>Trigonometry</button>
            <button onClick={handleFuncClick}>Function</button>
            <div className='trigo_container'>
                {isTrigoClicked && <div className='trigo'>
                    {trigoChanges()}
                </div>}
            </div>
            <div className='func_container'>
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