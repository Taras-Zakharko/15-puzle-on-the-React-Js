import React, { useCallback, useEffect, useState } from "react";
import TimerCounter from "./TimerCounter";
import Main from "./Main";

import DarckBg from "../bg/mainBlBg.jpg";
import whiteBg from "../bg/mainWhBg.jpg";

export default function Game() {
  const [colorTheme, setColorTheme] = useState(true);

  const [type, setType] = useState("8");

  const [manualMixing, setManualMixing] = useState(true);

  let [numbers, setNumbers] = useState(
    [...Array(+type).keys()].map((x) => x + 1)
  );

  useEffect(() => {
    setType((prevType) => (prevType = document.querySelector("#type").value));
    setNumbers(
      (prevNumbers) =>
        (prevNumbers = [...Array(+type).keys()].map((x) => x + 1))
    );
  }, [setType, type, setNumbers]);

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  let [counter, setCounter] = useState(0);

  const onChangeCountCellHandler = useCallback(
    () =>
      setNumbers(
        (prevNumbers) =>
          (prevNumbers = [...Array(+type).keys()].map((x) => x + 1))
      ),
    [type, setNumbers]
  );

  const onChangeCountCellHandlerRandom = useCallback(
    () =>
      setNumbers(
        [...Array(+type).keys()]
          .map((x) => x + 1)
          .sort(() => Math.random() - 0.5)
      ),
    [type, setNumbers]
  );

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
              onChange={useCallback(() => {
                setType(
                  (prevType) =>
                    (prevType = document.querySelector("#type").value)
                );
                onChangeCountCellHandler();
              }, [setType, onChangeCountCellHandler])}
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
                onClick={useCallback(() => {
                  onChangeCountCellHandler();
                  setManualMixing(true);
                }, [onChangeCountCellHandler, setManualMixing])}
              >
                Перемішати вручну
              </button>
              <button
                className="btn__menu"
                style={{
                  color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                  borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                }}
                onClick={useCallback(() => {
                  onChangeCountCellHandlerRandom();
                  setManualMixing(false);
                }, [onChangeCountCellHandlerRandom, setManualMixing])}
              >
                Перемішати
              </button>
              <button
                className="btn__menu"
                style={{
                  color: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                  borderColor: colorTheme ? "rgb(34, 34, 34)" : "#dedede",
                }}
                onClick={useCallback(() => {
                  onChangeCountCellHandler();
                  setManualMixing(false);
                }, [onChangeCountCellHandler, setManualMixing])}
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
        <TimerCounter
          colorTheme={colorTheme}
          time={time}
          setTime={setTime}
          start={start}
          setStart={setStart}
          counter={counter}
          setCounter={setCounter}
          setManualMixing={setManualMixing}
        />
      </header>
      <Main
        colorTheme={colorTheme}
        numbers={numbers}
        type={type}
        setTime={setTime}
        setStart={setStart}
        setCounter={setCounter}
        manualMixing={manualMixing}
      />
    </div>
  );
}
