import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LoadingOverlay from './components/LoadingOverlay';
import { useAppContext } from './context/AppContext';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import ReservationForm from './pages/ReservationForm';
import ReservationList from './pages/ReservationList';
import SalonDetail from './pages/SalonDetail';
import SalonList from './pages/SalonList';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

const App = () => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="app-shell">
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SalonList />
            </PrivateRoute>
          }
        />
        <Route
          path="/salons/:id"
          element={
            <PrivateRoute>
              <SalonDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/reserve/:id"
          element={
            <PrivateRoute>
              <ReservationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <PrivateRoute>
              <ReservationList />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/me"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <LoadingOverlay />
    </div>
  );
};

export default App;
