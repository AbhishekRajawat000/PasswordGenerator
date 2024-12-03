import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 sm:px-6 sm:py-4 my-6 sm:my-10 bg-gradient-to-r from-blue-800 to-purple-600 text-white ring-4 ring-pink-600 ring-opacity-50 ">
      <h1 className='text-2xl sm:text-3xl font-bold text-center my-3 sm:my-4'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4 sm:mb-5">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 sm:py-2 sm:px-4 bg-white text-gray-800 rounded-l-lg ring-2 ring-blue-300 ring-opacity-50 animate-pulse"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-r-lg transition duration-300"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label className="text-lg font-medium  ">Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1 sm:gap-x-2">
      <input
          type="checkbox"
          id="numberInput"
          checked={numberAllowed}
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput" className="text-sm sm:text-lg font-medium">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1 sm:gap-x-2">
          <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput" className="text-sm sm:text-lg font-medium">Characters</label>
      </div>
    </div>
</div>
    
  )
}

export default App