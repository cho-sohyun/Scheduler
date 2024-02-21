import React from 'react';
import './App.css';
import Main from './pages/Main';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Calendar from './pages/CalendarPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { recoilPersist } from 'recoil-persist';

recoilPersist({
  key: 'recoil-persist',
  storage: localStorage
});

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="wrap">
          <div className="container">
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Routes>
            <Footer />
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
