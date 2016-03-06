import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import io from 'socket.io-client';

import scheduleReducer from './reducers/schedule';
import ScheduleTable from './containers/ScheduleTable';

const loggerMiddleware = createLogger();

const store = createStore(
  scheduleReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const socket = io.connect('http://ganxus.com:9999');

render(
  <Provider store={store}>
    <ScheduleTable socket={socket} />
  </Provider>,
  document.getElementById('root')
);

