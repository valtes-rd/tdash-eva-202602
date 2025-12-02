import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { fakeFetch } from '../data/fakeFetch';
import {
  formatDate,
  initialFavorites,
  initialReservations,
  initialSalons,
  initialUsers,
} from '../data/mockData';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  salons: initialSalons,
  reservations: initialReservations,
  favorites: initialFavorites,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...initialState, salons: initialSalons, reservations: initialReservations };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.includes(action.payload);
      const updated = exists
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload];
      return { ...state, favorites: updated };
    }
    case 'ADD_RESERVATION':
      return { ...state, reservations: [...state.reservations, action.payload] };
    case 'CANCEL_RESERVATION':
      return {
        ...state,
        reservations: state.reservations.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (value) => dispatch({ type: 'SET_LOADING', payload: value });

  const withLatency = async (callback) => {
    setLoading(true);
    try {
      await fakeFetch(null);
      return callback();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    return withLatency(() => {
      const found = initialUsers.find((u) => u.email === email);
      if (!found || found.password !== password) {
        throw new Error('メールアドレスまたはパスワードが一致しません');
      }
      dispatch({ type: 'LOGIN', payload: found });
      return found;
    });
  };

  const logout = async () => {
    const ok = window.confirm('ログアウトしますか？');
    if (!ok) return false;
    return withLatency(() => {
      dispatch({ type: 'LOGOUT' });
      return true;
    });
  };

  const toggleFavorite = async (salonId) =>
    withLatency(() => {
      dispatch({ type: 'TOGGLE_FAVORITE', payload: salonId });
      return salonId;
    });

  const addReservation = async ({ salonId, date, time, menu }) =>
    withLatency(() => {
      const newReservation = {
        id: crypto.randomUUID(),
        salonId,
        userEmail: state.user?.email ?? initialUsers[0].email,
        date,
        time,
        menu,
      };
      dispatch({ type: 'ADD_RESERVATION', payload: newReservation });
      return newReservation;
    });

  const cancelReservation = async (reservationId) =>
    withLatency(() => {
      dispatch({ type: 'CANCEL_RESERVATION', payload: reservationId });
      return reservationId;
    });

  const getReservationsBySalonDate = (salonId, date) =>
    state.reservations.filter((r) => r.salonId === salonId && r.date === date);

  const isSlotAvailable = (salon, date) =>
    salon.timeSlots.some((slot) => !getReservationsBySalonDate(salon.id, date).some((r) => r.time === slot));

  const value = useMemo(
    () => ({
      ...state,
      login,
      logout,
      toggleFavorite,
      addReservation,
      cancelReservation,
      getReservationsBySalonDate,
      isSlotAvailable,
      formatDate,
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
