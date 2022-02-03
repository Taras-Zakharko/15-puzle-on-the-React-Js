import React from "react";


export default function SmallCells(props) {
  const cellSize = 100;
  let rows = (props.type === '8') ? 3 : 4;

  const empty = {
    value: 0,
    left: 2,
    top: 2
  }

  const cells = [];
  cells.push(empty)

  const squares = Array.from({ length: props.type }, (_, i) => i);

  const winerComb = [];
  function createWinCombin(arr) {
    for (let i = 0; i < arr.length; i++) {
      const left = i % rows;
      const top = (i - left) / rows;
      winerComb.push({
        value: i + 1,
        top: top,
        left: left
      })
    }
  }
  createWinCombin(squares)

  function win(arr) {
    let winer = false;


    for (let i = 0; i < arr.length; i++) {
      let r = document.getElementById(`${i}`);
      const d = r.getAttribute('value');

      const check = () => {
        if (cells[i + 1].value === winerComb[d - 1].value) {
          if (cells[i + 1].left === winerComb[d - 1].left && cells[i + 1].top === winerComb[d - 1].top) {
            return true
          }
          else {
            return;
          }
        }
      }

      if (!check()) {
        winer = false;
        break;
      }
      else { winer = true; }
    }
    return winer;
  }

  function moveCell(e) {
    const cell = e.target;

    const leftDiv = Math.abs(empty.left - cells[+cell.id + 1].left);
    const topDiv = Math.abs(empty.top - cells[+cell.id + 1].top);

    if (leftDiv + topDiv > 1) {
      return;
    }
    
    cell.style.left = `${empty.left * cellSize}px`;
    cell.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;

    empty.left = cells[+cell.id + 1].left;
    empty.top = cells[+cell.id + 1].top;

    cells[+cell.id + 1].left = emptyLeft;
    cells[+cell.id + 1].top = emptyTop;

    let result = win(cells.slice(1));

    if (result) { alert('You win') }
    
  }

  let GameBlock = squares.map((text, index) => {
    (props.type === '8') ? empty.left = 2 : empty.left = 3;
    (props.type === '8') ? empty.top = 2 : empty.top = 3;

    const value = props.numbers[index];
    const left = index % rows;
    const top = (index - left) / rows;

    cells.push({
      value: value,
      left: left,
      top: top,
      element: index
    });
    text = value;

    return <div
      className="cell"
      id={index}
      style={{
        top: `${top * cellSize}px`,
        left: `${left * cellSize}px`,
        background: (props.colorTheme) ? 'linear-gradient(to bottom, #414141 0%, #F8F8F8 100%)' : 'linear-gradient(to bottom, #E4E4E4 0%, #414141 100%)',
      }}
      top={winerComb[index].top}
      left={winerComb[index].left}
      value={text}
      key={index}
      onClick={moveCell}

    >
      {text}
    </div>;
  })
  
  return GameBlock;
}


