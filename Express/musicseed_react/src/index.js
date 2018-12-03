import React from "react";
import ReactDOM from "react-dom";

import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);