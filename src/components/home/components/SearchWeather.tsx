import { useState, useEffect } from "react";
import "./searchWeather.scss";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { getAllForecastWeatherAction } from "../../../store/actions/weather.actions";
import { useDispatch } from "react-redux";
import { getAutoComplete } from "../../../services/api";
import { ActionTypes } from "../../../store/actions/actions-types";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { getWeathersSelector } from "../../../store/selectors/index";

export const SearchWeather = () => {
  const [searchTerm, setSearchTerm] = useState<any>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<any>([]);
  const [isSearching, setIsSearching] = useState(false);
  const weatherStore = useSelector(getWeathersSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    // default Tel Aviv view
    const locationDetails = {
      cityName: "Tel Aviv",
      cityCode: "215793",
    };
    if (!weatherStore.favorites.length) {
      dispatch({
        type: ActionTypes.SET_CURRENT_LOCATION_NAME,
        locationDetails,
      });
    }
  }, []);

  const handleLocationChange = (name: any) => {
    const locationDetails = {
      cityName: name.label,
      cityCode: name.code,
    };
    dispatch(getAllForecastWeatherAction(locationDetails.cityCode));

    dispatch({
      type: ActionTypes.SET_CURRENT_LOCATION_NAME,
      locationDetails,
    });
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        fetchAutoCompleteData(debouncedSearchTerm);
        setIsSearching(false);
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const fetchAutoCompleteData = async (searchTerm: any) => {
    const autoCompleteResolve = await getAutoComplete(searchTerm);
    const autoCompleteListFormat = autoCompleteResolve.data.map(
      (result: any) => {
        return {
          label: result.LocalizedName,
          code: result.Key,
        };
      }
    );
    setResults(autoCompleteListFormat);
  };

  return (
    <div className="searchWeather">
      <div className="search-wrapper">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          selectOnFocus
          loading={isSearching}
          options={results}
          sx={{ width: 200 }}
          onChange={(event, value) => handleLocationChange(value || "")}
          renderOption={(props, option: any) => {
            return (
              <li {...props} key={option.code}>
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              value={searchTerm || "Tel Aviv"}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        />
      </div>
    </div>
  );
};
