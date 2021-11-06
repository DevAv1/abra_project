import axios from 'axios';
import mockForecast from '../services/mock-forecast.json';
import mockAutocomplete from '../services/mock-autocomplete.json';
import mockCurrent from '../services/mock-current_weather.json';


export const getAutoComplete = (searchCharacters:any) => {  
  const autoCompleteResolve = axios(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${searchCharacters}`);
  return autoCompleteResolve
  // return mockAutocomplete;
   
} 
    
export const getAllWeatherForecast = (locationCode:number) => {
  try {
    const currentWeather = axios(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationCode}?apikey=${process.env.REACT_APP_API_KEY}&metric=false`);
    const forecastWeather = axios(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationCode}?apikey=${process.env.REACT_APP_API_KEY}&metric=false`);

    return Promise.all([currentWeather, forecastWeather]);
    // return [mockCurrent,mockForecast ]
  } catch(err) {
    console.error(err)
  }
}