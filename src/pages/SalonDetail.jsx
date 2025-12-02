import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const SalonDetail = () => {
  const { id } = useParams();
  const { salons, favorites, toggleFavorite, isSlotAvailable, formatDate } = useAppContext();
  const [message, setMessage] = useState('');

  const salon = salons.find((s) => s.id === id);
  const isFavorite = favorites.includes(id);

  const upcoming = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, idx) =>
      formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + idx)),
    );
  }, [formatDate]);

  if (!salon) {
    return (
      <div className="main-content">
        <div className="card">サロンが見つかりませんでした。</div>
      </div>
    );
  }

  const handleFavorite = async () => {
    setMessage('');
    try {
      await toggleFavorite(id);
      setMessage(isFavorite ? 'お気に入りを解除しました。' : 'お気に入りに登録しました。');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="flex-between">
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              {salon.name}
            </h2>
            <span className="badge">{salon.category}</span>
          </div>
          <button className="button-primary" type="button" onClick={handleFavorite}>
            {isFavorite ? 'お気に入り解除' : 'お気に入り登録'}
          </button>
        </div>
        {message && <p style={{ color: '#2563eb' }}>{message}</p>}
        <img
          src={salon.image}
          alt={salon.name}
          style={{ width: '100%', borderRadius: 12, margin: '12px 0' }}
        />
        <p style={{ color: '#4b5563' }}>{salon.description}</p>
        <div className="tag-row" style={{ marginTop: 10 }}>
          <span className="badge">住所: {salon.address}</span>
          <span className="badge">TEL: {salon.phone}</span>
        </div>
        <h3 className="section-title" style={{ marginTop: 20 }}>
          直近1週間の空き状況
        </h3>
        <div className="grid">
          {upcoming.map((date) => {
            const available = isSlotAvailable(salon, date);
            return (
              <div className="card" key={date} style={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}>
                <div className="flex-between">
                  <div style={{ fontWeight: 700 }}>{date}</div>
                  <span className={available ? 'status-available' : 'status-unavailable'}>
                    {available ? '予約可' : '予約不可'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
