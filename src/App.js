import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles/App.css';
import Navbar from './UI/Navbar/Navbar';
import Movies from './pages/Movies/Movies';
import MoviesDetails from './pages/MovieDetails/MoviesDetails';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store/store';
import Footer from './UI/Footer/Footer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/movie/:id" element={<MoviesDetails />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
