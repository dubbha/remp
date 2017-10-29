import React from 'react';

require('app');

jest.mock('react-hot-loader', () => ({
  AppContainer({ children }) {
    return (<x-app-container>{children}</x-app-container>);
  },
}));

jest.mock('react-redux', () => ({
  Provider({ children }) {
    return (<x-provider>{children}</x-provider>);
  },
  connect: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter({ children }) {
    return (<x-browser-router>{children}</x-browser-router>);
  },
}));


jest.mock('app/App', () => function App() { return <x-app />; });

jest.mock('app/configureStore', () => jest.fn());

describe('app/index', () => {
  it('should render successfully', () => {
    expect(document.getElementById().innerHTML).toMatchSnapshot();
  });
});

