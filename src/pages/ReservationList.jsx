import React, { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { useAppContext } from '../context/AppContext';

const ReservationList = () => {
  const { reservations, salons, cancelReservation } = useAppContext();
  const [targetId, setTargetId] = useState('');

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const sorted = [...reservations].sort((a, b) => `${a.date}-${a.time}`.localeCompare(`${b.date}-${b.time}`));

  const findSalon = (id) => salons.find((s) => s.id === id);

  const isPast = (date) => new Date(date) < today;
  const isCancelable = (date) => new Date(date) > today;

  const handleCancel = async () => {
    await cancelReservation(targetId);
    setTargetId('');
  };

  return (
    <div className="main-content">
      <div className="card">
        <h2 className="section-title">予約一覧</h2>
        {!sorted.length && <div className="empty-state">予約はまだありません。</div>}
        {!!sorted.length && (
          <table className="table">
            <thead>
              <tr>
                <th>サロン</th>
                <th>予約日</th>
                <th>時間</th>
                <th>メニュー</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item) => {
                const salon = findSalon(item.salonId);
                const past = isPast(item.date);
                const canCancel = isCancelable(item.date);
                return (
                  <tr key={item.id}>
                    <td>{salon?.name ?? '不明なサロン'}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.menu}</td>
                    <td>{past ? '利用済み' : '予約中'}</td>
                    <td>
                      {canCancel ? (
                        <button className="button-outline" type="button" onClick={() => setTargetId(item.id)}>
                          キャンセル
                        </button>
                      ) : (
                        <span style={{ color: '#9ca3af' }}>キャンセル不可</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {targetId && (
        <Modal
          title="予約キャンセル"
          onClose={() => setTargetId('')}
          actions={
            <button className="button-primary" onClick={handleCancel} type="button">
              削除する
            </button>
          }
        >
          <p>予約をキャンセルしますか？</p>
          <p>翌日以降の予約のみキャンセルできます。</p>
        </Modal>
      )}
    </div>
  );
};

export default ReservationList;
