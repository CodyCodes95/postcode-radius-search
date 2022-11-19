import * as React from 'react'
import reactLogo from './assets/react.svg'
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const App = () => {

  const [location, setLocation] = React.useState("")
  const [radius, setRadius] = React.useState("")
  const [results, setResults] = React.useState([])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.GOOGLE_API_KEY}`,
    libraries: ["places"],
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    // const {latitude, longitude} = await getCoordinates(location)
    // const res = await fetch(`${import.meta.env.API_URL}/api/v1/postcodes/${latitude}/${longitude}/${radius}}}`)
    // const data = await res.json()
    // setResults(data)
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div className="flex text-black">
          <input type="text" value={location} placeholder="Enter a location" />
          <input type="text" onChange={(e) => setRadius(e.target.value)} value={radius as string} placeholder="Enter a radius" />
        </div>
        <button onClick={handleSubmit}>Find Postcodes</button>
      </div>
      <footer className="w-full flex items-center justify-center sticky top-[100vh]">
        <a className="p-2" href="https://github.com/CodyCodes95">
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
