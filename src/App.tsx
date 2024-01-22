import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import Main from './pages/Main';
import Header from './pages/Header';

function App() {
  return (
    <Provider store={store}>
      <div className="wrap">
        <div className="container">
          <Header />
          <Main />
        </div>
      </div>
    </Provider>
  );
}

export default App;
