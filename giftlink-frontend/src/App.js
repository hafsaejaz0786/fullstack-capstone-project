import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage/MainPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold">Welcome to GiftLink</h1>
      <p className="lead">Connecting community members to share and recycle household items.</p>
      <Link to="/gifts" className="btn btn-primary btn-lg mt-3">Browse Gifts</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand font-weight-bold" to="/">GiftLink</Link>
        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/gifts">Gifts</Link>
          <Link className="nav-link" to="/search">Search</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gifts" element={<MainPage />} />
        <Route path="/gifts/:id" element={<DetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;