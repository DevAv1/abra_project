import "./weatherCard.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useSelector } from "react-redux";
import { getWeathersSelector } from "../../store/selectors/index";
import { useDispatch } from "react-redux";
import {
  addToFavoritesAction,
  deleteFavoriteAction,
} from "../../store/actions/weather.actions";

interface WeatherProps {
  forecast?: any;
  favOption?: boolean;
  locationName?: string;
}
export const WeatherCard: React.FC<WeatherProps> = ({
  forecast,
  favOption,
  locationName,
}: any) => {
  const weatherStore = useSelector(getWeathersSelector);
  const dispatch = useDispatch();
  const getActualDay = (date: any) => {
    let d = new Date(date);
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let day = weekday[d.getDay()];
    return day;
  };

  const setFavorite = (forecast: any, locationDetails: any) => {
    const isFavorite = checkFavorite(locationDetails.cityCode);
    if (!isFavorite) {
      dispatch(addToFavoritesAction(forecast, locationDetails));
    } else {
      dispatch(deleteFavoriteAction(locationDetails.cityCode));
    }
  };

  const checkFavorite = (code: number) => {
    const favorites = weatherStore.favorites;
    const found = favorites?.find(
      (location: any) => location.locationDetails.cityCode === code
    );
    return !!found;
  };

  return (
    <div className="weather-card">
      {favOption && (
        <FavoriteIcon
          color={checkFavorite(locationName.cityCode) ? "secondary" : "primary"}
          className="favorite-icon"
          onClick={() => setFavorite(forecast, locationName)}
        />
      )}
      <div className="weather-info">
        <div className="weather-cityName">{locationName?.cityName}</div>

        <div className="weather-title">{getActualDay(forecast.Date)}</div>
        <div className="weather-temp">{`${
          !weatherStore.isCelcius
            ? `${forecast.Temperature?.Maximum?.Value}℉`
            : `${Math.round(
                (forecast.Temperature?.Maximum?.Value - 32) * 0.5556
              )}°C`
        }`}</div>
        <div className="weather-status">{`${forecast.Day.IconPhrase}`}</div>
      </div>
    </div>
  );
};
