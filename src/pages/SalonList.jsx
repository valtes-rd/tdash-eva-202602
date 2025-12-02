import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const categories = ['すべて', 'ヘアサロン', 'ネイルサロン', 'エステサロン'];

const SalonList = () => {
  const { salons, isSlotAvailable, formatDate } = useAppContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const filteredSalons = useMemo(
    () =>
      salons.filter((salon) => {
        if (selectedCategory === 'すべて') return true;
        // categoriesがある場合はそれを使用、なければcategoryを使用
        if (salon.categories) {
          return salon.categories.includes(selectedCategory);
        }
        return salon.category === selectedCategory;
      }),
    [salons, selectedCategory],
  );

  const handleReserve = (salonId) => {
    if (!selectedDate) return;
    navigate(`/reserve/${salonId}?date=${selectedDate}`);
  };

  return (
    <div className="main-content">
      <div className="hero">
        <h2 className="section-title">サロン一覧</h2>
        <div className="tag-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`button-outline ${selectedCategory === cat ? 'button-secondary' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <label className="label" htmlFor="reserve-date">
            予約希望日
          </label>
          <input
            className="input"
            type="date"
            id="reserve-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <p style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
            日付を変更すると空き状況が更新されます。
          </p>
        </div>
      </div>

      <div className="grid">
        {filteredSalons.map((salon) => {
          const available = selectedDate ? isSlotAvailable(salon, selectedDate) : false;
          return (
            <div className="card" key={salon.id}>
              <img
                src={salon.image}
                alt={salon.name}
                style={{ width: '100%', borderRadius: 10, marginBottom: 10 }}
              />
              <div className="flex-between">
                <div>
                  <h3 style={{ margin: '6px 0' }}>{salon.name}</h3>
                  <span className="badge">{salon.category}</span>
                </div>
                <div className={available ? 'status-available' : 'status-unavailable'}>
                  {available ? '予約可' : '予約不可'}
                </div>
              </div>
              <p style={{ color: '#4b5563', minHeight: 60 }}>{salon.description}</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
                <Link
                  className="link"
                  to={`/salons/${salon.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  詳細を見る（{salon.name}）
                </Link>
                <button
                  className="button-primary"
                  disabled={!available}
                  onClick={() => handleReserve(salon.id)}
                  type="button"
                >
                  予約する
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalonList;
