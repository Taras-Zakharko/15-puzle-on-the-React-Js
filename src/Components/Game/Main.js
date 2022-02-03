import React, {useState} from "react";
import TimerCounter from "./TimerCounter";
import BorderGame from "./BorderGame";


export default function Main(props) {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <main onClick={(e)=> console.log(e.target)}>
      <TimerCounter colorTheme={props.colorTheme} start={start} setStart={setStart} time={time} setTime={setTime} counter={counter} setCounter={setCounter} />
      <BorderGame type={props.type} colorTheme={props.colorTheme} numbers={props.numbers}/>
    </main>
  )
}