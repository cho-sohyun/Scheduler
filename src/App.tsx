import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Calendar from './pages/CalendarPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="wrap">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
