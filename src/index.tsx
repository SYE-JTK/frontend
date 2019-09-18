
import App from './App';
import configureStore from './jtk.store.root-reducer';
import registerServiceWorker from './registerServiceWorker';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

ReactDOM.render(
  <Provider store={ configureStore() }>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
