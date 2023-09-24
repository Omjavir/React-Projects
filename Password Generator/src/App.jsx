import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(6);
  const [numbersIncluded, setNumbersIncluded] = useState(false);
  const [specialCharactersIncluded, setSpecialCharactersIncluded] =
    useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersIncluded) str += "0123456789";
    if (specialCharactersIncluded) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbersIncluded, specialCharactersIncluded, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Copied!!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersIncluded, specialCharactersIncluded, passwordGenerator]);

  return (
    <>
      <div className="m-10 justify-center align-middle text-center">
        <h1 className="text-2xl my-2 font-semibold">Password Generator</h1>
        <div className="flex justify-center gap-x-2">
          <input
            className="border-black bg-gray-300 px-2 py-1 rounded-md"
            type="text"
            ref={passwordRef}
            value={password}
            readOnly
            placeholder="password"
          />
          <button
            className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center gap-x-2">
          <input
            type="range"
            min={0}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <h4>
            Length <b>{length}</b>
          </h4>
          <input
            type="checkbox"
            id="numbers"
            onChange={() => setNumbersIncluded((prev) => !prev)}
          />
          <label htmlFor="numbers">Numbers</label>
          <input
            type="checkbox"
            id="specialcharacters"
            onChange={() => setSpecialCharactersIncluded((prev) => !prev)}
          />
          <label htmlFor="specialcharacters">Special Characters</label>
        </div>
      </div>
    </>
  );
};

export default App;
