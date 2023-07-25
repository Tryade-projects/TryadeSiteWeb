import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Rules from './pages/Rules/Rules';

function App() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  return (
    <BrowserRouter>
      <Header
        isBurgerOpen={isBurgerOpen}
        setIsBurgerOpen={setIsBurgerOpen}
      />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/rules'
          element={<Rules />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
