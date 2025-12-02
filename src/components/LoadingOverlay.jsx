import React from 'react';
import { useAppContext } from '../context/AppContext';

const LoadingOverlay = () => {
  const { loading } = useAppContext();
  if (!loading) return null;
  return (
    <div className="loading-overlay" data-testid="loading-overlay">
      <div>
        <div className="spinner" />
        <p style={{ marginTop: 12, fontWeight: 700 }}>通信中です...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
