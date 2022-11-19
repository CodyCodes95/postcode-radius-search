import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const PlacesAutocomplete = ({setAddress} :any) => {
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

  const handleSelect = async (address: string) => {
    setValue(address, false);
    setAddress(address);
    clearSuggestions();
  };

  return (
    <Combobox onSelect={handleSelect} aria-labelledby="demo">
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
