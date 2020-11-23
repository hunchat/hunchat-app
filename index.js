import React from 'react';
import { Provider } from 'react-redux';

import { registerRootComponent } from 'expo';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import App from './App';


class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )

  }
}


// Set as root component
registerRootComponent(Root);
