import * as React from 'react'
import reactLogo from './assets/react.svg'

const App = () => {

  const [location, setLocation] = React.useState("")
  const [radius, setRadius] = React.useState("")

  const handleSubmit = (e: React.MouseEvent) => {
    
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className='flex'>
          <input type="text" value={location} placeholder="Enter a location" />
          <input type="text" value={radius as string} placeholder="Enter a radius" />
        </div>
        <button onClick={handleSubmit}>Find Postcodes</button>
      </div>
      <footer className="w-full flex items-center justify-center sticky top-[100vh]">
        <a className="p-2" href="">
          Github
        </a>
        <a className="p-2" href="">
          Twitter
        </a>
      </footer>
    </div>
  );
}

export default App
