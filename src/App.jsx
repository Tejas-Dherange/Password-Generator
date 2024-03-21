import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [allownumber, setAllownumber] = useState(false);
  const [allowSymbol, setAllowSymbol] = useState(false);
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (allowSymbol) str += "!@#$-_/|?:;%&*";
    if (allownumber) str += "1234567890";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      // console.log(pass);
    }
    setPassword(pass);
  }, [length, setPassword, allownumber, allowSymbol]);

  useEffect(() => {
    passwordGenerator();
  }, [length, passwordGenerator, allownumber, allowSymbol]);

  const copy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div
        className={
          "container flex flex-col gap-8 p-16 w-[60vw] m-auto mt-36   backdrop-blur-2xl border border-solid  rounded-lg border-white "
        }
      >
        <div className="header m-auto">
          <h1 className="text-4xl text-white font-bold">Password Generator</h1>
        </div>
        <div className="pass flex m-auto  gap-1">
          <input
            type="text"
            readOnly
            value={password}
            placeholder="password"
            className=" w-[80vh] outline-none text-2xl font-bold text-blue-700 rounded-sm "
            ref={passwordRef}
          />

          <button
            onClick={copy}
            class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
          >
            Copy
          </button>
        </div>
        <div className="options flex gap-4 text-white  m-auto font-bold text-xl">
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
            min={8}
            max={25}
          />
          <label htmlFor="length">length:{length}</label>
          <input
            checked={allownumber}
            onChange={() => {
              setAllownumber((prev) => !prev);
            }}
            className="w-4 cursor-pointer"
            type="checkbox"
            id="nums"
          />
          <label htmlFor="Numbers">Numbers</label>
          <input
            checked={allowSymbol}
            onChange={() => {
              setAllowSymbol((prev) => !prev);
            }}
            className="w-4 cursor-pointer"
            type="checkbox"
            name=""
            id="symbols "
          />
          <label htmlFor="Symbols">Symbols</label>
        </div>
      </div>
    </>
  );
}

export default App;
