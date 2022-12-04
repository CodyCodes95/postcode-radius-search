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
    const results = await getDetails({ placeId: id });
    console.log(results)
    const lat = await results.geometry.location.lat();
    const lng = await results.geometry.location.lng();
    setLat(lat);
    setLng(lng);
  };

  return (
    <Combobox>
      <ComboboxInput
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
