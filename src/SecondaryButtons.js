function SecondaryButtons({ updateCalc })
{
    return(
        <div className='secondary_buttons'>
            <button onClick={()=>updateCalc('^-1')}><sup>1</sup>/<sub>x</sub></button>
            <button onClick={()=>updateCalc(',')}>,</button>
            <button onClick={()=>updateCalc('e+')}>exp</button>
            <button onClick={()=>updateCalc('(')}>(</button>            
            <button onClick={()=>updateCalc(')')}>)</button>
            <button onClick={()=>updateCalc('fact(')}>n!</button>
        </div>
    )
}

export default SecondaryButtons