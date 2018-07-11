import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import immutableCheckMiddleWare from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducers from './reducer';

const middleWare = [];

middleWare.push(thunk);

// Immutability Check
if (process.env.NODE_ENV === 'development') {
  middleWare.push(immutableCheckMiddleWare());
}

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});

middleWare.push(loggerMiddleware);


const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middleWare)
  )
);

export default store;
