import { useEffect } from "react";
import "./home.scss";
import Switch from "@mui/material/Switch";

import { SearchWeather } from "./components/SearchWeather";
import { WeatherCard } from "../shared-components/WeatherCard";
import { useSelector, useDispatch } from "react-redux";
import { getWeathersSelector } from "../../store/selectors";
import {
  getAllForecastWeatherAction,
  setTempUnitAction,
} from "../../store/actions/weather.actions";

export const Home = () => {
  const weatherStore = useSelector(getWeathersSelector);
  const defaultCode = 215793; // Tel-Aviv code
  const dispatch = useDispatch();

  useEffect(() => {
    if (!weatherStore.favorites.length) {
      dispatch(getAllForecastWeatherAction(defaultCode));
    }
  }, []);

  const handleTempUnit = () => {
    dispatch(setTempUnitAction(!weatherStore.isCelcius));
  };

  return (
    <div className="home">
      <div className="home__search">
        <SearchWeather />
      </div>
      <div className="home__unit-toggler">
        <span>Fahrenheit - Celcius</span>
        <Switch checked={weatherStore.isCelcius} onChange={handleTempUnit} />
      </div>
      <div className="home__default-weather-view">
        <div className="selected-weather">
          {weatherStore?.weatherData.currentForecast && (
            <WeatherCard
              locationName={weatherStore.weatherData.locationName}
              forecast={weatherStore.weatherData.currentForecast}
              favOption={true}
            />
          )}
        </div>
      </div>
      <div className="home__weekly-weather-view">
        {weatherStore.weatherData.weeklyForecast &&
          weatherStore.weatherData.weeklyForecast.map(
            (forecast: any, index: number) => {
              return <WeatherCard key={index} forecast={forecast} />;
            }
          )}
      </div>
    </div>
  );
};
