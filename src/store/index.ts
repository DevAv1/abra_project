import { 
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { reducers } from '../store/reducers';

export const store = createStore(
  reducers(),
  composeWithDevTools(compose(applyMiddleware(thunk)))
);