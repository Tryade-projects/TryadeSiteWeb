import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import StreamersPage from './pages/StreamersPage/StreamersPage';
import UpdatesPage from './pages/UpdatesPage/UpdatesPage';
import Rules from './pages/Rules/Rules';
import ModalNav from './components/ModalNav/ModalNav';
import { handleResize } from './utils/handleResize';

const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200,
};

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ifMobile, setIfMobile] = useState(
    window.innerWidth < breakpoints.large
  );
  console.log(ifMobile);
  // if the screen width is more than 992px, the modal is closed
  useEffect(() => {
    const screenWidthThreshold = breakpoints.large;
    const cleanupResizeEvent = handleResize(
      screenWidthThreshold,
      setModalIsOpen,
      setIfMobile
    );
    // Clean up the event listener when the component unmounts
    return () => {
      cleanupResizeEvent();
    };
  }, []);
  return (
    <BrowserRouter>
      <Header
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <Routes>
        <Route
          path='/'
          element={<Navigate to='/home' />}
        />
        <Route
          path='/home'
          element={
            modalIsOpen ? (
              <ModalNav setModalIsOpen={setModalIsOpen} />
            ) : (
              <Home ifMobile={ifMobile} />
            )
          }
        />
        <Route
          path='/home/streamers'
          element={
            modalIsOpen ? (
              <ModalNav setModalIsOpen={setModalIsOpen} />
            ) : (
              <StreamersPage />
            )
          }
        />
        <Route
          path='/home/updates'
          element={
            modalIsOpen ? (
              <ModalNav setModalIsOpen={setModalIsOpen} />
            ) : (
              <UpdatesPage />
            )
          }
        />
        <Route
          path='/rules'
          element={
            modalIsOpen ? (
              <ModalNav setModalIsOpen={setModalIsOpen} />
            ) : (
              <Rules />
            )
          }
        />
        <Route
          path='/wiki'
          element={<h1>Wiki</h1>}
        />
        <Route
          path='/shop'
          element={<h1>Boutique</h1>}
        />
        <Route
          path='/discord'
          element={<h1>Discord</h1>}
        />
        <Route
          path='*'
          element={<h1>404</h1>}
        />
      </Routes>
      {/* If the modal is open, the footer is display in the modal  */}
      {!modalIsOpen && <Footer ifMobile={ifMobile} />}
    </BrowserRouter>
  );
}

export default App;
