// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import reducer from 'src/store/reducer';
import logMiddleware from './middlewares/logMiddleware';
import homeMiddleware from './middlewares/homeMiddleware';
import profileMiddleware from './middlewares/profileMiddleware';
import storyMiddleware from './middlewares/storyMiddleware';

// == Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    logMiddleware,
    homeMiddleware,
    profileMiddleware,
    storyMiddleware,
    // secondMiddleware,
  ),
);

const store = createStore(
  reducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
