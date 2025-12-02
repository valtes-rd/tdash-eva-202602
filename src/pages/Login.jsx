import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const { login, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="main-content" style={{ maxWidth: 420 }}>
      <div className="card">
        <h2 className="section-title">ログイン</h2>
        <p>登録済みのEmailとPasswordでログインしてください。</p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: '#d93025', marginBottom: 10 }}>{error}</div>}
          <button className="button-primary" type="submit" style={{ width: '100%' }}>
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
