import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Modal from '../components/Modal';

const ReservationForm = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { salons, formatDate, getReservationsBySalonDate, addReservation } = useAppContext();
  const navigate = useNavigate();

  const salon = salons.find((s) => s.id === id);
  const defaultDate = searchParams.get('date') || formatDate(new Date());
  const [date, setDate] = useState(defaultDate);
  const [menu, setMenu] = useState(salon?.menus[0] ?? '');
  const [time, setTime] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const reservedTimes = useMemo(() => getReservationsBySalonDate(id, date).map((r) => r.time), [date, getReservationsBySalonDate, id]);

  if (!salon) {
    return (
      <div className="main-content">
        <div className="card">該当するサロンがありません。</div>
      </div>
    );
  }

  const selectableTimes = salon.timeSlots.map((slot) => ({
    value: slot,
    disabled: reservedTimes.includes(slot),
  }));

  const openConfirm = (e) => {
    e.preventDefault();
    setError('');
    if (!date || !menu || !time) {
      setError('入力内容を確認してください');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await addReservation({ salonId: id, date, time, menu });
      setShowConfirm(false);
      navigate('/reservations');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: 640 }}>
      <div className="card">
        <h2 className="section-title">予約登録</h2>
        <p>{salon.name} での予約を登録します。</p>
        <form onSubmit={openConfirm}>
          <div className="form-row">
            <label className="label" htmlFor="date">
              予約日
            </label>
            <input
              className="input"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="label" htmlFor="menu">
              メニュー
            </label>
            <select
              id="menu"
              className="select"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            >
              {salon.menus.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="label" htmlFor="time">
              時間帯
            </label>
            <select
              id="time"
              className="select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">選択してください</option>
              {selectableTimes.map((slot) => (
                <option key={slot.value} value={slot.value} disabled={slot.disabled}>
                  {slot.value} {slot.disabled ? '(予約不可)' : ''}
                </option>
              ))}
            </select>
          </div>
          {error && <div style={{ color: '#d93025', marginBottom: 10 }}>{error}</div>}
          <button className="button-primary" type="submit">
            予約確認
          </button>
        </form>
      </div>

      {showConfirm && (
        <Modal
          title="予約内容の確認"
          onClose={() => setShowConfirm(false)}
          actions={
            <button className="button-primary" type="button" onClick={handleConfirm}>
              確定する
            </button>
          }
        >
          <p>サロン: {salon.name}</p>
          <p>予約日: {date}</p>
          <p>メニュー: {menu}</p>
          <p>時間帯: {time}</p>
        </Modal>
      )}
    </div>
  );
};

export default ReservationForm;
