import React from "react";
import SmallCells from "./SmallCells";

export default function BorderGame(props) {
  console.log(props);
  return (
    <div
      className="feild"
      style={{
        width: props.type === "8" ? "320px" : "420px",
        height: props.type === "8" ? "320px" : "420px",
        border: props.colorTheme ? "10px inset #3f3f3f" : "10px inset #dedede",
        backgroundColor: props.colorTheme ? "#dedede" : "#3f3f3f",
      }}
    >
      {/* <div
          type={props.type} 
          numbers={props.numbers} 
          colorTheme={props.colorTheme}
          /> */}

      <SmallCells
        cellSize={props.cellSize}
        empty={props.empty}
        rows={props.rows}
        squares={props.squares}
        winerComb={props.winerComb}
        setCells={props.setCells}
        win={props.win}
        numbers={props.numbers}
        sells={props.cells}
        setTime={props.setTime}
        setStart={props.setStart}
        setCounter={props.setCounter}
      />
    </div>
  );
}
