import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ReservationForm from './pages/ReservationForm';
import ReservationList from './pages/ReservationList';
import SalonDetail from './pages/SalonDetail';
import SalonList from './pages/SalonList';

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-shell">
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SalonList />} />
        <Route path="/salons/:id" element={<SalonDetail />} />
        <Route path="/reserve/:id" element={<ReservationForm />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoadingOverlay />
    </div>
  );
};

export default App;
