import ScientificButtons from "./ScientificButtons";
import SecondaryButtons from "./SecondaryButtons";
import Digits from "./Digits";
import Operators from "./Operators";


function MainButtons ({ mode, updateCalc, second_press, display_fix, result, setResult, calc, setCalc, calculate})
{
    

    return(
        <div className='buttons_container'>
        
          <ScientificButtons updateCalc={updateCalc} second_press={second_press} />

          <div className='buttons_container_child'>

            <SecondaryButtons updateCalc={updateCalc} />
            <Digits updateCalc={updateCalc} display_fix={display_fix} result={result} setResult={setResult} calc={calc} setCalc={setCalc}/>

          </div>
          <Operators updateCalc={updateCalc} calculate={calculate} />
        </div>
    )
}

export default MainButtons;