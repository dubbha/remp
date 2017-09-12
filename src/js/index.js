import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

require('../css/app.sass');

const renderApp = () => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', renderApp);
}
