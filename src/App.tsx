import { useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "./components/PlacesAutocomplete";
import loader from "./assets/loader.svg";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [radius, setRadius] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [resultsLoading, setResultsLoading] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [radiusParam, setRadiusParam] = useState<string>("");
  const [latParam, setLatParam] = useState<string>("");
  const [lngParam, setLngParam] = useState<string>("");

  const apiDiv = useRef<HTMLDivElement>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`,
    libraries: ["places"],
  });

  const handleSubmit = async () => {
    setResultsLoading(true);
    const res = await fetch(
      `https://postcode-radius-search.up.railway.app/api/v1/postcodes/${lat}/${lng}/${radius}`
    );
    const data = (await res.json()) as string[];
    setResults(data);
    setResultsLoading(false);
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <img src={loader} alt="Loading spinner" />
      </div>
    );

  return (
    <>
      <Toaster />
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
        <div className="flex justify-around w-full md:w-1/2 flex-col md:flex-row items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col md:flex-row text-black">
              <PlacesAutocomplete setLat={setLat} setLng={setLng} />
              <div className="p-2"></div>
              <input
                type="text"
                onChange={(e) => setRadius(e.target.value)}
                value={radius as string}
                placeholder="Enter a radius"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          {results.length ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col max-h-[25rem] overflow-scroll bg-slate-800 rounded-md w-10/12 md:w-40"
            >
              {results.map((result) => (
                <p className="p-2 text-gray-400 text-center">{result}</p>
              ))}
            </motion.div>
          ) : null}
        </div>
        {results.length ? (
          <div className="flex flex-col justify-center items-center relative top-[9rem]">
            <p className="text-white text-center">
              {results.length} postcodes found within {radius}km of the selected location
            </p>
            <button
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4"
              onClick={() => setResults([])}
            >
              Clear Results
            </button>
          </div>
        ) : null}
        <footer className="w-full flex items-center justify-center sticky top-[100vh]">
          <a target="_blank" className="p-2 text-lg" href="https://github.com/CodyCodes95">
            Github
          </a>
          <a className="p-2 text-lg" target="_blank" href="https://twitter.com/codythatsme95">
            Twitter
          </a>
          <a
            className={`p-2 text-lg cursor-pointer ${results.length ? "animate-bounce" : ""}`}
            onClick={() => {
              apiDiv.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Is there an API?
          </a>
        </footer>
      </div>
      <div
        ref={apiDiv}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-gray-300 text-lg text-center"
      >
        <p className="w-1/2 p-4 text-xl">Yes there is!</p>
        <p className="w-1/2 p-4 text-xl">The API is free to use and available by querying:</p>
        <p
          onClick={() => {
            navigator.clipboard.writeText(`
        https://postcode-radius-search.up.railway.app/api/v1/postcodes/${latParam}/${lngParam}/${radiusParam}
        `);
            toast.success("Copied to clipboard");
          }}
          className="p-5 bg-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 duration-150 ease-in-out"
        >
          https://postcode-radius-search.up.railway.app/api/v1/postcodes/{latParam || "lat"}/{lngParam || "lng"}/
          {radiusParam || "radius"}
        </p>
        <div className="p-2"></div>
        <div className="flex flex-col md:flex-row">
          <input
            type="text"
            onChange={(e) => setLatParam(e.target.value)}
            value={latParam as string}
            placeholder="Latitude"
            className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="text"
            onChange={(e) => setLngParam(e.target.value)}
            value={lngParam as string}
            placeholder="Longitude"
            className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <input
            type="text"
            onChange={(e) => setRadiusParam(e.target.value)}
            value={radiusParam as string}
            placeholder="Radius"
            className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default App;
