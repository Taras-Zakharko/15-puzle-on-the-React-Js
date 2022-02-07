import React, { useEffect, useState } from "react";
import BorderGame from "./BorderGame";

export default function Main(props) {
  const cellSize = 100;
  const [rows, setRows] = useState(3);

  useEffect(
    () =>
      setRows((prevRows) =>
        props.type === "8" ? (prevRows = 3) : (prevRows = 4)
      ),
    [props.type]
  );

  const [empty, setEmpty] = useState({
    value: 0,
    left: 0,
    top: 0,
  });

  const [winerComb, setWinerComb] = useState([]);

  useEffect(() => {
    setEmpty((prevEmpty) => {
      props.type === "8" ? (prevEmpty.left = 2) : (prevEmpty.left = 3);
      props.type === "8" ? (prevEmpty.top = 2) : (prevEmpty.top = 3);
      return prevEmpty;
    });
  }, [props.type]);

  const [squares, setSquares] = useState([]);

  useEffect(
    () =>
      setSquares(
        (prevSquares) =>
          (prevSquares = Array.from({ length: +props.type }, (_, i) => i))
      ),
    [setSquares, props.type]
  );

  useEffect(() => {
    setWinerComb([]);
    function createWinCombin(arr) {
      for (let i = 0; i < arr.length; i++) {
        const left = i % rows;
        const top = (i - left) / rows;

        setWinerComb((prevWinnerComb) => [
          ...prevWinnerComb,
          { value: i + 1, top: top, left: left },
        ]);
      }
    }
    createWinCombin(squares);
  }, [squares, rows]);

  return (
    <main>
      <BorderGame
        type={props.type}
        colorTheme={props.colorTheme}
        numbers={props.numbers}
        cellSize={cellSize}
        empty={empty}
        rows={rows}
        squares={squares}
        winerComb={winerComb}
        setCells={props.setCells}
        cells={props.cells}
        setTime={props.setTime}
        setStart={props.setStart}
        setCounter={props.setCounter}
        manualMixing={props.manualMixing}
        setManualMixing={props.setManualMixing}
      />
    </main>
  );
}
