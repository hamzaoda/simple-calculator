import { useState, useEffect } from "react";

function Calculator() {
  const [rows, setRows] = useState([{sign: '+', value :0 , isEnabled: true}]);
  const [result, setResult] = useState(0);

  const addRow = () => {
    const newRow = {sign: '+', value :0 , isEnabled: true};
    setRows([...rows, newRow]);
  };
  const handleSignChange = (choosedSign, index) =>{
    const updatedRows = rows.map((row, i) =>
    i === index ? { ...row, sign: choosedSign } : row);
    setRows( updatedRows);
  }
  const deleteRow = (index) =>{
      console.log('this is the index', index);
      const updateRows = rows.filter((_, i )=> i!== index);
      setRows(updateRows)
  }
  const handleEnable = (index) => {
    const updatedRows = rows.map((row, i) =>
    i === index ? { ...row, isEnabled: !row.isEnabled } : row);
    setRows( updatedRows);
  }
  const handleValueChange = (newValue, index) => {
    const updatedRows = rows.map((row, i) =>
    i === index ? {...row, value : newValue }: row);
    setRows(updatedRows);
  }
  const calculateTotal = () => {
    const newResult = rows.reduce((total, row)=> {
      if(row.isEnabled){
        if(row.sign === '+'){
          return total + Number(row.value)
        }
        else {
          return total - Number(row.value)
        }
      }
      return total
    },0)
    setResult(newResult)
  }
  useEffect(() => {
    calculateTotal()
  }, [rows, result]);

  return (
    <div className="">
      <div><button onClick={addRow}>Add Row</button></div>
      <div>
        {rows.map((row, index) => (
          <ul key={index}>
          <li>
                <select name="sign" id="" onChange={(e) => handleSignChange(e.target.value, index)}>
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
                <input type="number" name="number" id=""  onChange={(e) =>handleValueChange(e.target.value, index)}/>
                <button onClick={() => deleteRow(index)}>Delete</button>
                <button onClick={() => handleEnable(index)}>{row.isEnabled ? "Disable" : "Enable"}</button>
            </li>
          </ul>
        ))}
      </div>
        <p className="text-red-800">Result: {result}</p>
    </div>
  );
}

export default Calculator;
