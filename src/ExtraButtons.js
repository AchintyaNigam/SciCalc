function ExtraButtons ({ mode, setMode, result, setResult, setCalc })
{
    const deg_rad_button = () =>
    {
        if(mode === 'rad')
        return(<button onClick={mode_toggle}>RAD</button>);
        else
        return(<button onClick={mode_toggle}>DEG</button>);
    }

    const mode_toggle = () =>
    {
        if(mode==='rad')
        setMode('deg');
        else
        setMode('rad');
    }

    const handleFEClick = () =>
    {
        const res = parseFloat(result).toExponential().toString() 
        setCalc(res);
        setResult(res);
    }
    return(
        <div className='extra_buttons'>
          {deg_rad_button()}
          <button onClick={handleFEClick}>F-E</button>
        </div>
    )
}

export default ExtraButtons;