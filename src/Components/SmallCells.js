import React, { useMemo, useCallback } from "react";


export default function SmallCells(props) {
 
  const cellArr = document.querySelectorAll(".cell");

  const win = useCallback(() => {
    let winer = false;

    for (let i = 0; i < cellArr.length; i++) {
      console.log(cellArr[i].getAttribute("value"), props.winerComb[i]);
      
      const check = () => {
        if (+cellArr[i].getAttribute("value") === props.winerComb[i].value) {
          if (
            +cellArr[i].getAttribute("left") === props.winerComb[i].left &&
            +cellArr[i].getAttribute("top") === props.winerComb[i].top
          ) {
            return true;
          } else {
            return false;
          }
        }
      };

      if (!check()) {
        winer = false;
        break;
      } else {
        winer = true;
      }
    }

    return winer;
  }, [cellArr, props.winerComb]);

  console.log(props.winerComb);
  
  const moveCells = useCallback(
    (e) => {
      const cell = e.target;
      console.log(cell);

      const leftDiv = Math.abs(props.empty.left - +cell.getAttribute("left"));
      const topDiv = Math.abs(props.empty.top - +cell.getAttribute("top"));
      console.log(props.empty.left, +cell.getAttribute("left"));
      console.log(props.empty.top, +cell.getAttribute("top"));

      console.log(leftDiv + topDiv);

      if (leftDiv + topDiv > 1) {
        return;
      }

      cell.style.left = `${props.empty.left * props.cellSize}px`;
      cell.style.top = `${props.empty.top * props.cellSize}px`;

      const emptyLeft = props.empty.left;
      const emptyTop = props.empty.top;

      props.empty.left = +cell.getAttribute("left");
      props.empty.top = +cell.getAttribute("top");

      cell.setAttribute("left", emptyLeft);
      cell.setAttribute("top", emptyTop);

      props.setStart(true)
      props.setCounter((prev) => prev + 1)

      if (win()) {
        props.setStart(false)
        alert("You win");
      }
    },
    [
      props,
      win
    ]
  );

  const GemeBlock = useMemo(() => {
    const addCell = () =>
      props.squares.map((text, index) => {
        const value = props.numbers[index];
        const left = index % props.rows;
        const top = (index - left) / props.rows;

        text = value;

        return (
          <div
            className="cell"
            id={index}
            style={{
              top: `${top * props.cellSize}px`,
              left: `${left * props.cellSize}px`,
              background: props.colorTheme
                ? "linear-gradient(to bottom, #414141 0%, #F8F8F8 100%)"
                : "linear-gradient(to bottom, #E4E4E4 0%, #414141 100%)",
            }}
            top={props.winerComb[index]?.top}
            left={props.winerComb[index]?.left}
            value={text}
            onClick={moveCells}
            key={index}
          >
            {text}
          </div>
        );
      });
    return addCell();
  }, [
    props.winerComb,
    moveCells,
    props.cellSize,
    props.colorTheme,
    props.numbers,
    props.rows,
    props.squares,
  ]);

  return <React.Fragment>{GemeBlock}</React.Fragment>;
}
