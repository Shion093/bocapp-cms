import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';
import App from './App';

import 'cropperjs/dist/cropper.css';
import 'semantic-ui-css/semantic.min.css';
import 'cropperjs/dist/cropper.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
