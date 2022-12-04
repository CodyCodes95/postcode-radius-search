import * as React from 'react'
import reactLogo from './assets/react.svg'
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from './components/placesAutocomplete';
import { getGeocode, getLatLng } from 'use-places-autocomplete';


const App = () => {
  const [location, setLocation] = React.useState("")
  const [radius, setRadius] = React.useState("")
  const [results, setResults] = React.useState([])
  const [address, setAddress] = React.useState("")
  const [lat, setLat] = React.useState(0)
  const [lng, setLng] = React.useState(0)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
    libraries: ["places"],
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    const res = await fetch(`https://aus-postcode-radius-search.up.railway.app/api/v1/postcodes/${lat}/${lng}/${radius}`);
    const data = await res.json()
    setResults(data)
  };

  
  return isLoaded ? (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className="flex text-black">
          <PlacesAutocomplete setAddress={setAddress} setLat={setLat} setLng={setLng} />
          <input
            type="text"
            onChange={(e) => setRadius(e.target.value)}
            value={radius as string}
            placeholder="Enter a radius"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[[50%]] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
          onClick={handleSubmit}
        >
          Find Postcodes
        </button>
      </div>
      <footer className="w-full flex items-center justify-center sticky top-[100vh]">
        <a className="p-2" href="https://github.com/CodyCodes95">
          Github
        </a>
        <a className="p-2" href="https://twitter.com/codythatsme95">
          Twitter
        </a>
      </footer>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      Loading...
    </div>
  );
}

export default App
