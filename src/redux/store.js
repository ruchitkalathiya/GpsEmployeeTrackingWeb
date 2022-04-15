import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isLoadingReducer } from './reducers/loadingReducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  loading: isLoadingReducer
});


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


export { store };
