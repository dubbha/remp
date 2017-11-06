import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import moduleStub from './moduleStub';

const store = configureStore();

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

moduleStub(module); // we only need this stub to be able to test the code block below
if (module.hot) {
  module.hot.accept('./App', renderApp);
}
