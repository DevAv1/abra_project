import { ActionTypes } from './actions-types';
import {Dispatch} from 'redux'
import {getAllWeatherForecast } from '../../services/api';

export const getCurrentWeatherLocationNameAction = (locationDetails:any) => {
  return async(dispatch:Dispatch) => {
    try {
      dispatch({
        type: ActionTypes.SET_CURRENT_LOCATION_NAME,
        locationDetails
      })
    } catch(err) {
      console.error(err)
    }
  }
}

export const getAllForecastWeatherAction = (locationCode:number) => {
  console.log('fetching all forecast data...')
  return async(dispatch:Dispatch) => {
    try {
      const allWeatherData = await getAllWeatherForecast(locationCode);
      console.log('Get Data success!')
      dispatch({
        type:ActionTypes.GET_ALL_FORECAST_DATA,
        allWeatherData
      })
    } catch (err) {
        console.error(err)
    }
  }
}

export const addToFavoritesAction = (forecast:any, locationDetails:any) => {
  const newFavoriteForecast = {
    forecast,
    locationDetails
  }
  return async(dispatch:Dispatch, getState:any) => {
    try {
      dispatch({
        type: ActionTypes.ADD_FAVORITES,
        newFavoriteForecast
      })
    } catch (err) {
      console.error(err)
    }
  }
}


export const deleteFavoriteAction = (cityCode:number) => {
  return async (dispatch:Dispatch) => {
    try {
      dispatch({
        type:ActionTypes.DELETE_FAVORITE,
        cityCode
      })
    } catch (err) {
      console.error(err)
    }
  }
}


export const setTempUnitAction = (isCelcius:boolean) => {
  return async(dispatch:Dispatch) => {
    try {
      dispatch({
        type: ActionTypes.SET_TEMP_UNIT,
        isCelcius
      })
    } catch(err) {
      console.log(err)
    }
  }
}
