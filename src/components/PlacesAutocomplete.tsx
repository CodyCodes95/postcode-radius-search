import usePlacesAutocomplete, { getDetails } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = ({setAddress, setLat, setLng} :any) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(regions)"],
      componentRestrictions: {
        country: "AU",
      },
      fields: ["geometry"],
    } as any,
    debounce: 300,
  });

  const handleSelect = async (id: string, address: string) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getDetails({ placeId: id }) as any
    const lat = await results.geometry.location.lat();
    const lng = await results.geometry.location.lng();
    setLat(lat);
    setLng(lng);
  };

  return (
    <Combobox>
      <ComboboxInput
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Enter a place"
        onClick={() => setValue("")}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption onClick={() => handleSelect(place_id, description)} key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
