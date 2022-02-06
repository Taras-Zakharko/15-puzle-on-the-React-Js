import React, {useCallback,useState,useEffect,useMemo} from "react";
// import TimerCounter from "./TimerCounter";
import BorderGame from "./BorderGame";
import SmallCells from "./SmallCells";



export default function Main(props) {
  const cellSize = 100;
  let rows = props.type === "8" ? 3 : 4;

  const [empty, setEmpty] = useState({
    value: 0,
    left: 0,
    top: 0,
  })
  // const empty = {
  //   value: 0,
  //   left: 0,
  //   top: 0,
  // };
  // (props.type === '8') ? empty.left = 2 : empty.left = 3;
  // (props.type === '8') ? empty.top = 2 : empty.top = 3;

  // const cells = [];
  // cells.push(empty)
  const [winerComb, setWinerComb] = useState([]);

  useEffect(() => {
    setEmpty((prevEmpty)=>{
      props.type === "8" ? (prevEmpty.left = 2) : (prevEmpty.left = 3);
      props.type === "8" ? (prevEmpty.top = 2) : (prevEmpty.top = 3);
      return prevEmpty;
    })

    props.setCells((prevCells) => ({ ...prevCells, empty }));
  }, [props, empty]);

  const [squares, setSquares] = useState([]);

  useEffect(()=> setSquares((prevSquares) => prevSquares = Array.from({ length: +props.type }, (_, i) => i)), [setSquares, props.type]
  )

  console.log(squares);
  function createWinCombin(arr) {
    for (let i = 0; i < arr.length; i++) {
      const left = i % rows;
      const top = (i - left) / rows;
      const wc = { value: i + 1,
        top: top,
        left: left,}
      setWinerComb((prevWinnerComb)=> ({
        ...prevWinnerComb, wc
      }));
    }
  }
  useEffect(()=> createWinCombin(squares)) 

  const win = useCallback((arr) => {

    let winer = false;

    for (let i = 0; i < arr.length; i++) {
      let r = document.getElementById(`${i}`);
      const d = r.getAttribute("value");

      const check = () => {
        if (props.cells[i + 1].value === winerComb[d - 1].value) {
          if (
            props.cells[i + 1].left === winerComb[d - 1].left &&
            props.cells[i + 1].top === winerComb[d - 1].top
          ) {
            return true;
          } else {
            return;
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
  }, [props.cells, winerComb])

   const moveCell = useCallback((e) => {
    e.stopPropagation();

    const cell = e.target;

    const leftDiv = Math.abs(
      props.cells[0].left - props.cells[+cell.id + 1].left
    );
    const topDiv = Math.abs(props.cells[0].top - props.cells[+cell.id + 1].top);

    if (leftDiv + topDiv > 1) {
      return;
    }

    cell.style.left = `${props.cells[0].left * cellSize}px`;
    cell.style.top = `${props.cells[0].top * cellSize}px`;

    const emptyLeft = props.cells[0].left;
    const emptyTop = props.cells[0].top;

    props.setCells((prevCells) => prevCells[0].left = prevCells[+cell.id + 1].left)
    props.setCells((prevCells) => prevCells[0].top = prevCells[+cell.id + 1].top)
  
    props.setCells((prevCells) => prevCells[+cell.id + 1].left = prevCells[+cell.id + 1].top = emptyLeft)
    props.setCells((prevCells) => prevCells[+cell.id + 1].top = prevCells[+cell.id + 1].top = emptyTop)
  

    if (win(props.setCells((prevCells) => prevCells.slice(1)))) {
      alert("You win");
    }
  }, [win, props])

  let GameBlock = useMemo(()=>squares.map((text, index) => {
    const value = props.numbers[index];
    const left = index % rows;
    const top = (index - left) / rows;

    // props.cells.push({
    //   value: props.numbers[index],
    //   left: left,
    //   top: top,
    //   element: index
    // });
    const em = {
      value: props.numbers[index],
      left: left,
      top: top,
      element: index,
    };
    props.setCells((prevCells) => ({ ...prevCells, em }));
    text = value;

    return (
      <SmallCells
        index={index}
        cellSize={cellSize}
        top={top}
        left={left}
        colorTheme={props.colorTheme}
        winerComb={winerComb}
        text={text}
        moveCell={moveCell}
        key={index}
      />
    );
  }),[moveCell, props, rows, squares, winerComb]);

  return (
    <main>
      {/* <TimerCounter colorTheme={props.colorTheme} /> */}
      <BorderGame
        type={props.type}
        colorTheme={props.colorTheme}
        numbers={props.numbers}
        GameBlock={GameBlock}
      />
    </main>
  );
}
