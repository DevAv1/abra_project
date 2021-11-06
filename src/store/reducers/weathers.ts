import { ActionTypes} from '../actions/actions-types';

export enum FavoritesStatus {
  IS_FAVORITE = "IS_FAVORITE",
  ONCE_FAVORITE = "ONCE_FAVORITE",
}

interface InitialState {
  weatherData:any;
  favorites:any;
  isCelcius:boolean;
}
const initialState:InitialState = {
  weatherData : {},
  favorites: [],
  isCelcius: false
}


export const weathers = (state = initialState, action:any) => {
  switch(action.type) {
    case ActionTypes.SET_CURRENT_LOCATION_NAME:
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          locationName:action.locationDetails
        }
      }
    case ActionTypes.GET_ALL_FORECAST_DATA:
      const currentForecast = action.allWeatherData[0].data.DailyForecasts[0];
      const weeklyForecast = action.allWeatherData[1].data.DailyForecasts;
      // const currentForecast = action.allWeatherData[0].DailyForecasts[0];
      // const weeklyForecast = action.allWeatherData[1].DailyForecasts;
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          currentForecast,
          weeklyForecast
        }
      }
      case ActionTypes.ADD_FAVORITES:
        return {
          ...state, 
          favorites: [
            ...state.favorites,
            action.newFavoriteForecast
          ]
        }

        case ActionTypes.DELETE_FAVORITE:
          const filteredFavorites = state.favorites.filter((forecast:any) => forecast.locationDetails.cityCode !== action.cityCode);
          return {
            ...state,
            favorites:filteredFavorites
          }

          case ActionTypes.SET_TEMP_UNIT:
            return {
              ...state,
              isCelcius:action.isCelcius
            }
    default:
      return state; 
  }
}
