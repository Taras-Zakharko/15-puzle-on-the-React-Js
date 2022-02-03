import React from "react"
import SmallCells from "./SmallCells";


export default function BorderGame(props){

  


  return(
    <div
          className="feild"
          style={{
            width: (props.type === '8') ? '320px' : '420px',
            height: (props.type === '8') ? '320px' : '420px',
            border: (props.colorTheme) ? '10px inset #3f3f3f' : '10px inset #dedede',
            backgroundColor: (props.colorTheme) ? '#dedede' : '#3f3f3f'
          }} >
            <SmallCells 
          type={props.type} 
          numbers={props.numbers} 
          colorTheme={props.colorTheme}
          />
          </div>
  )
}