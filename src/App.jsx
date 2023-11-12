import { useEffect, useRef, useState } from "react";
import ColorPicker from "react-pick-color";
import "./App.css";

function App() {
  const [bgColor, setBgColor] = useState("");
  const [colorPicker, setColorPicker] = useState("");
  const [themeColor, setColorTheme] = useState("");
  console.log(colorPicker);
  console.log(themeColor);
  const [show, setShow] = useState(false);

  let useClickOutside = (handler) => {
    let outClickRef = useRef();

    useEffect(() => {
      let mayClickHandler = (e) => {
        if (!outClickRef.current.contains(e.target)) {
          handler();
        }
      };

      document.addEventListener("mousedown", mayClickHandler);

      return () => {
        document.removeEventListener("mousedown", mayClickHandler);
      };
    });

    return outClickRef;
  };

  let outClickRefHandler = useClickOutside(() => {
    setShow(false);
  });

  //
  useEffect(() => {
    if (colorPicker) {
      setColorTheme(colorPicker);
      localStorage.setItem("theme", colorPicker);
    } else {
      setColorTheme(bgColor);
    }
  }, [bgColor, colorPicker]);

  useEffect(() => {
    const storeBgc = localStorage.getItem("theme");
    if (storeBgc !== null) {
      setColorTheme(storeBgc);
    } else {
      localStorage.setItem("theme", "#0f172a");
    }
  }, [bgColor]);

  const colorChange = (color) => {
    if (color) {
      setBgColor(color);
      // console.log(color);
      setColorPicker("");
      localStorage.setItem("theme", color);
    } else {
      setBgColor("");
    }
  };

  return (
    <div
      style={{ backgroundColor: `${themeColor}` }}
      className={`bg-${bgColor} h-screen flex md:pb-8 items-end justify-center`}
    >
      <div className="flex justify-center flex-wrap gap-2 bg-white md:w-[40rem] md:rounded-xl py-2 fixed w-full ">
        <button
          onClick={() => colorChange("#0f172a")}
          className={
            bgColor !== "#0f172a"
              ? "outline-0 px-3 py-2 text-white rounded-lg bg-slate-900 w-24"
              : "hidden"
          }
        >
          Black
        </button>
        <button
          onClick={() => colorChange("#3b82f6")}
          className={
            bgColor !== "#3b82f6"
              ? "outline-0 px-3 py-2 ml-2 text-white bg-blue-500 rounded-lg w-24"
              : "hidden"
          }
        >
          Blue
        </button>
        <button
          onClick={() => colorChange("#22c55e")}
          className={
            bgColor !== "#22c55e"
              ? "outline-0 px-3 py-2 ml-2 text-white bg-green-500 rounded-lg w-24"
              : "hidden"
          }
        >
          Green
        </button>
        <button
          onClick={() => colorChange("#172554")}
          className={
            bgColor !== "#172554"
              ? "outline-0 px-3 py-2 ml-2 text-white rounded-lg bg-blue-950 w-24"
              : "hidden"
          }
        >
          Navy Blue
        </button>

        <button
          onClick={() => setShow(!show)}
          className="w-24 px-3 py-2 ml-2 text-center text-white rounded-lg outline-0 bg-slate-900"
        >
          Choose
        </button>
      </div>
      <div
        ref={outClickRefHandler}
        className={
          show ? "block relative md:bottom-[20%] bottom-[30%]" : "hidden"
        }
      >
        <ColorPicker
          color={colorPicker}
          onChange={(colorPicker) => setColorPicker(colorPicker.hex)}
        />
      </div>
    </div>
  );
}

export default App;
