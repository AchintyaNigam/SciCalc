import ScientificButtons from "./ScientificButtons";
import SecondaryButtons from "./SecondaryButtons";
import Digits from "./Digits";
import Operators from "./Operators";


function MainButtons ({ mode, updateCalc, isSecondClicked, displayFix, result, setResult, calc, setCalc, calculate})
{
    

    return(
        <div className='buttons_container'>
        
          <ScientificButtons updateCalc={updateCalc} isSecondClicked={isSecondClicked} />

          <div className='buttons_container_child'>

            <SecondaryButtons updateCalc={updateCalc} />
            <Digits updateCalc={updateCalc} displayFix={displayFix} result={result} setResult={setResult} calc={calc} setCalc={setCalc}/>

          </div>
          <Operators updateCalc={updateCalc} calculate={calculate} />
        </div>
    )
}

export default MainButtons;