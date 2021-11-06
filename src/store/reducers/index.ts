import { combineReducers} from 'redux';
import { weathers} from './weathers';

export const reducers = () => {
  return combineReducers({
    weathers
  })
}
