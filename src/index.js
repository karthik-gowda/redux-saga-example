import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./redux";
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from './saga';

//intitialize the saga middleware
const sagaMiddleware = createSagaMiddleware()

//store of redux
let store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}> <App /> </Provider>,
  
  document.getElementById('root')
);


reportWebVitals();