import React from "react";
import ReactDOM from "react-dom";

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';

import App from './components/App';
import reducers from './reducers';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={createStore(reducers)}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.querySelector("#root")
);