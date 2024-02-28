function Operators ({ calculate, updateCalc })
{
    return(
        <div className="operators">
            <button onClick={()=>updateCalc('%')}>mod</button>
            <button onClick={()=>updateCalc('/')}>/</button>
            <button onClick={()=>updateCalc('*')}>*</button>
            <button onClick={()=>updateCalc('+')}>+</button>
            <button onClick={()=>updateCalc('-')}>-</button>
            <button onClick={calculate} id='equalto'>=</button>
        </div>
    )
}

export default Operators