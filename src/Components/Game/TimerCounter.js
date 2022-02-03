import React, { useEffect } from "react";


export default function TimerCounter(props) { 
  let pCounter = props.counter;


  useEffect(() => {
    
    let interval = null;
    if (props.start) {
      interval = setInterval(() => {
        props.setTime(prevTime => prevTime + 10)
      }, 10)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [props, props.start])



  return (
    <div className="time-block">
      <div className="btn-time-blobk" >
        <button
          className="btn__time"
          style={{ color: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede', borderColor: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede' }}
          onClick={() => props.setStart(true)}>
          Старт
        </button>
        <button
          className="btn__time"
          style={{ color: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede', borderColor: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede' }}
          onClick={() => props.setStart(false)}>
          Пауза
        </button>
        <button
          className="btn__time"
          style={{ color: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede', borderColor: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede' }}
          onClick={() => { props.setTime(0); props.setStart(false) }}>
          Почати заново
        </button>
      </div>
      <div className="time-value">
        <h2 style={{ color: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede' }}>Ваш час:
          <span> {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + (props.time / 10) % 1000).slice(-2)}</span>
        </h2>
        <h2 style={{ color: (props.colorTheme) ? 'rgb(34, 34, 34)' : '#dedede' }}>Steps: {pCounter}</h2>
      </div>
    </div>
  ) 

  
}


