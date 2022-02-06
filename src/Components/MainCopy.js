import React, { useCallback, useEffect, useState } from "react";
// import TimerCounter from "./TimerCounter";
import BorderGame from "./BorderGame";
// import SmallCells from "./SmallCells";

export default function MainCopy(props) {
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

  // useMemo(() => {
  //   setCells([empty]);
  //   // setCells((prevCells) => [...prevCells, { ...empty }]);
  // }, [empty]);
  const [squares, setSquares] = useState([]);

  useEffect(
    () =>
      setSquares(
        (prevSquares) =>
          (prevSquares = Array.from({ length: +props.type }, (_, i) => i))
      ),
    [setSquares, props.type]
  );

  // function createWinCombin(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     const left = i % rows;
  //     const top = (i - left) / rows;
  //     const wc = { value: i + 1,
  //       top: top,
  //       left: left,}
  //     setWinerComb((prevWinnerComb)=> ({
  //       ...prevWinnerComb, wc
  //     }));
  //   }
  // }
  useEffect(() => {
    setWinerComb([])
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

  // const win = useCallback(
  //   (arr) => {
  //     let winer = false;

  //     for (let i = 0; i < arr.length; i++) {
  //       let r = document.getElementById(`${i}`);
  //       const d = r.getAttribute("value");

  //       const check = () => {
  //         if (props.cells[i + 1].value === winerComb[d - 1].value) {
  //           if (
  //             props.cells[i + 1].left === winerComb[d - 1].left &&
  //             props.cells[i + 1].top === winerComb[d - 1].top
  //           ) {
  //             return true;
  //           } else {
  //             return;
  //           }
  //         }
  //       };

  //       if (!check()) {
  //         winer = false;
  //         break;
  //       } else {
  //         winer = true;
  //       }
  //     }
  //     return winer;
  //   },
  //   [props.cells, winerComb]
  // );

  // console.log(props.cells);

  

  // useCallback(() => {
  //   propsSetCells([empty]);
  //   squares.map((text, index) => {
  //     const value = propsNumbers[index];
  //     const left = index % rows;
  //     const top = (index - left) / rows;

  //     propsSetCells(
  //       (prevCells) =>
  //         (prevCells = [
  //           ...prevCells,
  //           {
  //             value: propsNumbers[index],
  //             left: left,
  //             top: top,
  //             element: index,
  //           },
  //         ])
  //     );

  //     text = value;

  //     return (
  //       <SmallCells
  //         index={index}
  //         cellSize={cellSize}
  //         top={top}
  //         left={left}
  //         colorTheme={propsСolorTheme}
  //         winerComb={winerComb}
  //         text={text}
  //         moveCell={moveCells}
  //         key={index}
  //       />
  //     );
  //   });
  // }, [
  //   moveCells,
  //   propsNumbers,
  //   propsSetCells,
  //   propsСolorTheme,
  //   rows,
  //   squares,
  //   winerComb,
  //   empty,
  // ]);

  

  return (
    <main>
      {/* <TimerCounter colorTheme={props.colorTheme} /> */}
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
        // win={win}
        cells={props.cells}
        setTime={props.setTime}
        setStart={props.setStart}
        setCounter={props.setCounter}
      />
    </main>
  );
}
