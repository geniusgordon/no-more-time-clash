import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import io from 'socket.io-client';

import scheduleReducer from './reducers/schedule';
import fbReducer from './reducers/fb';
import ScheduleTable from './containers/ScheduleTable';

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers({
    fb: fbReducer,
    schedule: scheduleReducer,
  }),
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const socket = io.connect('http://ganxus.com:9876');

render(
  <Provider store={store}>
    <ScheduleTable socket={socket} />
  </Provider>,
  document.getElementById('root')
);

