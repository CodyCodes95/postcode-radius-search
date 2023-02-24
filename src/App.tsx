import reactLogo from "./assets/react.svg";
import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "./components/PlacesAutocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import loader from "./assets/loader.svg";
import { useRef, useState } from "react";

const App = () => {
  const [radius, setRadius] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [resultsLoading, setResultsLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const whyRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
    libraries: ["places"],
  });

  const handleSubmit = async () => {
    setResultsLoading(true);
    const res = await fetch(
      `https://aus-postcode-radius-search.up.railway.app/api/v1/postcodes/${lat}/${lng}/${radius}`
    );
    const data = (await res.json()) as string[];
    setResults(data);
    setResultsLoading(false);
  };

  if (!isLoaded || resultsLoading)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <img src={loader} alt="Loading spinner" />
      </div>
    );

  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col md:flex-row text-black">
              <PlacesAutocomplete setLat={setLat} setLng={setLng} />
              <div className="p-2"></div>
              <input
                type="text"
                onChange={(e) => setRadius(e.target.value)}
                value={radius as string}
                placeholder="Enter a radius"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[[50%]] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 ${
                radius === "" || lat === 0 || lng === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleSubmit}
              disabled={radius === "" || lat === 0 || lng === 0}
            >
              Find Postcodes
            </button>
          </div>
        </div>
        <footer className="w-full flex items-center justify-center sticky top-[100vh]">
          <a target="_blank" className="p-2" href="https://github.com/CodyCodes95">
            Github
          </a>
          <a className="p-2" target="_blank" href="https://twitter.com/codythatsme95">
            Twitter
          </a>
          <a
            className="p-2 cursor-pointer"
            onClick={() => {
              whyRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Why does this exist?
          </a>
        </footer>
      </div>
      <div
        ref={whyRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white"
      ></div>
    </>
  );
};

export default App;
