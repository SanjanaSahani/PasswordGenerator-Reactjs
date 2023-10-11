import { useState, useCallback, useEffect, useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState("")

// useRef hook
const passwordRef = useRef(null)

  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*_+?/\="

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passGenerator()
  }, [length, numberAllowed, charAllowed, passGenerator])

  return (
    <>
      <div className='w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-black-600 text-4xl text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>

            <input type="range"
              min={1}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />

            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }} />
            <label>Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='CharacterInput'
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
