function Display ({ calc, result })
{
    return(
        <div className="display">
          {calc ? <span>{calc}</span>: ''} 
          <br /> &nbsp;
          {result || "0"}
        </div>
    )
}
export default Display;