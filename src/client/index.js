import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from 'containers//App';
import routes from 'routes//';
import configureStore from './store';

const history = createBrowserHistory();

let data = {};

if(window.hasOwnProperty('__DATA__')) {
  data = window.__DATA__;
}

const rootElement = document.getElementById('app');

let store = configureStore(data);

require('normalize.css');
require('github-markdown-css/github-markdown.css');
require('styles//App');

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
rootElement)
