import React, { useState, useEffect } from "react";
import TimerCounter from "./TimerCounter";
import Main from "./Main";

import DarckBg from "../bg/mainBlBg.jpg";
import whiteBg from "../bg/mainWhBg.jpg";

export default function Game() {
  const [cells, setCells] = useState([]);

  const [type, setType] = useState("8");
  useEffect(() => setType((prevType) => prevType = '15'), [setType]);

  const [colorTheme, setColorTheme] = useState(true);

  // function changeType(e) {
  //   setType(type = e.target.value)
  //   return type;
  // }

  // if(document.getElementById('type') !== null){
  //   if(document.getElementById('type').value){
  //     console.log(document.getElementById('type').value);
  //   }
  //   console.log('hi');
  // }

  let [numbers, setNumbers] = useState(
    [...Array(+type).keys()].map((x) => x + 1)
  );

  const onChangeCountCellHandler = () =>
    setNumbers([...Array(+type).keys()].map((x) => x + 1));

  return (
    <div
      style={{
        backgroundImage: colorTheme ? `url(${whiteBg})` : `url(${DarckBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="header">
        <h1
          className="title-game"
          style={{
            color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
          }}
        >
          Гра в П'ятнашки
        </h1>
        <nav className="menu">
          <div className="type-game">
            <select
              className="type-game__select"
              style={{
                color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
              }}
              value={type}
              id="type"
              onChange={(e) => {
                setNumbers([...Array(+type).keys()].map((x) => x + 1));
              }}
            >
              <option
                value="8"
                style={{ background: colorTheme ? "#dedede" : "#272727" }}
              >
                8 (3x3)
              </option>
              <option
                value="15"
                style={{ background: colorTheme ? "#dedede" : "#272727" }}
              >
                15 (4x4)
              </option>
            </select>
            <div className="btn__blobk">
              <button
                className="btn__menu"
                style={{
                  color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                  borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                }}
                onClick={onChangeCountCellHandler}
              >
                Перемішати вручну
              </button>
              <button
                className="btn__menu"
                style={{
                  color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                  borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                }}
                onClick={() =>
                  setNumbers(
                    [...Array(+type).keys()]
                      .map((x) => x + 1)
                      .sort(() => Math.random() - 0.5)
                  )
                }
              >
                Перемішати
              </button>
              <button
                className="btn__menu"
                style={{
                  color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                  borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                }}
                onClick={() =>
                  setNumbers([...Array(+type).keys()].map((x) => x + 1))
                }
              >
                Зібрати пазл
              </button>
            </div>
          </div>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => setColorTheme(!colorTheme)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </nav>
        <TimerCounter colorTheme={colorTheme} />
      </header>
      <Main
        colorTheme={colorTheme}
        numbers={numbers}
        type={type}
        cells={cells}
        setCells={setCells}
      />
    </div>
  );
}