import React from 'react';
import Footer from './footer';
import List from './list';
import Search from './search';
import Film from './film';

const App = () => (
  <div className="app">
    { true && <Search /> }
    { false && <Film /> }
    <List />
    <Footer />
  </div>
);

export default App;
