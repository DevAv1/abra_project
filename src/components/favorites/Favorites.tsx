import React from "react";
import "./favorites.scss";
import { useSelector } from "react-redux";
import { getWeathersSelector } from "../../store/selectors/index";
import { WeatherCard } from "../../components/shared-components/WeatherCard";
import { Link } from "react-router-dom";
import {
  getAllForecastWeatherAction,
  getCurrentWeatherLocationNameAction,
} from "../../store/actions/weather.actions";
import { useDispatch } from "react-redux";

export const Favorites = () => {
  const favoritesData = useSelector(getWeathersSelector);
  const dispatch = useDispatch();

  const getFavoriteForecast = (forecast: any) => {
    dispatch(getCurrentWeatherLocationNameAction(forecast.locationDetails));
    dispatch(getAllForecastWeatherAction(forecast.locationDetails.cityCode));
  };
  return (
    <div className="favorites">
      {favoritesData.favorites.length &&
        favoritesData.favorites.map((forecast: any) => {
          return (
            <Link to="/" key={forecast.locationDetails.cityCode}>
              <div onClick={() => getFavoriteForecast(forecast)}>
                <WeatherCard
                  locationName={forecast.locationDetails}
                  forecast={forecast.forecast}
                  favOption={false}
                />
              </div>
            </Link>
          );
        })}
    </div>
  );
};
