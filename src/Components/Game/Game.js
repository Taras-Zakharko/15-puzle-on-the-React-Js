import React, { useState } from "react";



export default function Game() {

  const cellSize = 100;
  let rows = 3;




  const empty = {
    value: 0,
    left: 2,
    top: 2
  }

  const cells = [];
  cells.push(empty)

  const [type, setType] = useState('8');

  function changeType(event) {
    setType(event.target.value)
  }

  const squares = Array.from({ length: type }, (_, i) => i);

  const numbers = [...Array(+type).keys()]
  .map(x => x+1)
  // .sort(() => Math.random() - 0.5);

  

  let GameBlock = squares.map((text, index) => {
    (type === '8') ? rows = 3 : rows = 4;
    (type === '8') ? empty.left = 2 : empty.left = 3;
    (type === '8') ? empty.top = 2 : empty.top = 3;

    
    const value = numbers[index];
    const left = index % rows;
    const top = (index - left) / rows;

    cells.push({
      value: numbers[index],
      left: left,
      top: top,
      element: index 
    });
    text = value - 1;
    
    
    function moveCell(e) {
      e.stopPropagation();
      const cell = e.target;

      const leftDiv = Math.abs(empty.left - cells[+cell.id + 1].left);
      const topDiv = Math.abs(empty.top - cells[+cell.id + 1].top);

      if(leftDiv + topDiv > 1){
        return;
      }

      cell.style.left = `${empty.left * cellSize}px`;
      cell.style.top = `${empty.top * cellSize}px`;
  
      const emptyLeft = empty.left;
      const emptyTop = empty.top;
      

      empty.left = cells[+cell.id + 1].left;
      empty.top = cells[+cell.id +1].top;
  
      cells[+cell.id +1].left = emptyLeft;
      cells[+cell.id+1].top = emptyTop;

      console.log(cell.getAttribute('top'), cell.getAttribute('left'));
      console.log(cells[+cell.id +1].left, cells[+cell.id+1].top);
     
      let result = win(cells.slice(1));
      
      if(result){alert('You win') } 
  
    }

    function win(arr){
      
      let winer = false;

      for (let i = 0; i < arr.length; i++) {
        let r = document.getElementById(`${i}`);
        
        const check = arr[i].left === +r.getAttribute('left') && arr[i].top === +r.getAttribute('top');

        if(!check){
          
          winer = false;
          break;
        }
        else{winer = true; }
        
      }
      return winer;
      
    }
    
  
    

    return <div
      className="cell"
      id={index}
      style={{
        top: `${top * cellSize}px`,
        left: `${left * cellSize}px`
      }}
      top={cells[index+1].top}
      left={cells[index+1].left}
      value={numbers[index]}
      key={index}
      onClick={moveCell}
    >
      {text + 1}
    </div>
  })





  return (
    <React.Fragment>
      <header className="header">
        <h1 className="title-game">Гра в П'ятнашки</h1>
        <nav className="menu">
          <div className="type-game">
            <select className="type-game__select" value={type} id="type" onChange={changeType} >
              <option value="9">8 (3x3)</option>
              <option value="15">15 (4x4)</option>
            </select>
            <h3>Перемішування</h3>
            <select className="type-game__select" id="mix">
              <option value="перемішувати самостійно">Самостійно</option>
              <option value="випадкове перемішування">Автоматично</option>
            </select>
            <h3>Збирати</h3>
            <select className="type-game__select" id="collect">
              <option value="Самостійне збирання">Самостійно</option>
              <option value="Комп'ютер збирає">Автоматично</option>
            </select>
          </div>
          <div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </nav>
      </header>
      <main>
        <div
          className="feild"
          style={{
            width: (type === '8') ? '300px' : '400px',
            height: (type === '8') ? '300px' : '400px'
          }}>
          {GameBlock}
        </div>
      </main>
    </React.Fragment>
  )

}