import { useCallback } from "react";

function ExtraButtons ({ mode, setMode, result, setResult, setCalc })
{
    const modeToggle = useCallback(() =>
    {
        if(mode==='rad')
        setMode('deg');
        else
        setMode('rad');
    }, [mode, setMode])

    const degRadButton = useCallback(() =>
    {
        if(mode === 'rad')
        return(<button onClick={modeToggle}>RAD</button>);
        else
        return(<button onClick={modeToggle}>DEG</button>);
    }, [mode, modeToggle])


    const handleFEClick = () =>
    {
        const res = parseFloat(result).toExponential().toString() 
        setCalc(res);
        setResult(res);
    }
    return(
        <div className='extra_buttons'>
          {degRadButton()}
          <button onClick={handleFEClick}>F-E</button>
        </div>
    )
}

export default ExtraButtons;