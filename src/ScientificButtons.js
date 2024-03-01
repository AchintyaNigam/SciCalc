import { useCallback } from "react";

function ScientificButtons ({ updateCalc, isSecondClicked })
{
    const changing_operators = useCallback(() =>
    {
        const operators_changing = [];
        if(!isSecondClicked)
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
    }, [updateCalc, isSecondClicked])
    return(
        <div className='scientific_operators'>
            {changing_operators()}
          </div>
    )
}

export default ScientificButtons;