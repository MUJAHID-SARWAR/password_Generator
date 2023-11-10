import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(7);
  const [numberAllocation, setNumberAllocation] = useState(false);
  const [charAllocation, setCharAllocation] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllocation) str += "012345678";
    if (charAllocation) str += "!%*^%^$%$/;&~!#$%^";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllocation, charAllocation, setPassword]);
       
      const copyPasswordToClipBoard = useCallback(() =>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 81)
        window.navigator.clipboard.writeText(password)
      }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllocation,charAllocation, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800  text-yellow-400">
      <h1 className="text-white text-center my-3 ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-gray-100  text-green-600"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          
        />
        <button className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0l"
        onClick={copyPasswordToClipBoard}>
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={80}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllocation}
            id="numberInput"
            onChange={() => {
              setNumberAllocation((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllocation}
            id="charInput"
            onChange={() => {
              setCharAllocation((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
