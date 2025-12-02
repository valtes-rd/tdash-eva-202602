const today = new Date();

const formatDate = (date) => date.toISOString().split('T')[0];

export const initialUsers = [
  {
    email: 'test@example.com',
    password: 'password',
    name: 'テスト花子',
    registeredAt: '2023-06-01',
    memberId: 'EV-1001',
  },
];

export const initialSalons = [
  {
    id: 'salon-1',
    name: 'Shibuya Luxe Hair',
    category: 'ヘアサロン',
    description: '表参道にある上質なヘアサロン。丁寧なカウンセリングとトレンドを押さえたスタイル提案が得意です。',
    image: 'https://placehold.co/400x250?text=Hair+Salon',
    menus: ['カット', 'カット＋カラー', 'カット＋トリートメント'],
    timeSlots: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    address: '東京都渋谷区神宮前1-1-1',
    phone: '03-0000-1111',
  },
  {
    id: 'salon-2',
    name: 'Ginza Nail Studio',
    category: 'ネイルサロン',
    description: '銀座駅徒歩3分。シンプルからトレンドデザインまで豊富に取り揃えたネイルサロン。',
    image: 'https://placehold.co/400x250?text=Nail+Salon',
    menus: ['ワンカラー', 'フレンチ', 'アートデザイン'],
    timeSlots: ['11:00', '13:00', '15:00', '17:00'],
    address: '東京都中央区銀座2-2-2',
    phone: '03-0000-2222',
  },
  {
    id: 'salon-3',
    name: 'Spa Bloom Aoyama',
    category: 'エステサロン',
    description: 'アロマトリートメントやフェイシャルが人気の隠れ家スパ。非日常のリラックスタイムを提供します。',
    image: 'https://placehold.co/400x250?text=Spa+Salon',
    menus: ['アロマボディ', 'フェイシャル', 'リンパドレナージュ'],
    timeSlots: ['09:00', '11:00', '13:00', '15:00', '17:00'],
    address: '東京都港区北青山3-3-3',
    phone: '03-0000-3333',
  },
  {
    id: 'salon-4',
    name: 'Shinjuku Quick Hair',
    category: 'ヘアサロン',
    description: '新宿駅近くのカジュアルヘアサロン。短時間でまとまる時短メニューが人気。',
    image: 'https://placehold.co/400x250?text=Hair+Studio',
    menus: ['クイックカット', '前髪カット', 'カラーリタッチ'],
    timeSlots: ['10:00', '11:00', '13:00', '15:00', '17:00'],
    address: '東京都新宿区西新宿4-4-4',
    phone: '03-0000-4444',
  },
  {
    id: 'salon-5',
    name: 'Yokohama Nail & Relax',
    category: 'ネイルサロン',
    description: '横浜で人気のリラクゼーションネイルサロン。落ち着いた空間で丁寧なケアを提供します。',
    image: 'https://placehold.co/400x250?text=Nail+Relax',
    menus: ['ケアコース', 'ジェルネイル', 'フットケア'],
    timeSlots: ['10:00', '12:00', '14:00', '16:00'],
    address: '神奈川県横浜市西区1-1-1',
    phone: '045-000-5555',
  },
];

export const initialReservations = [
  {
    id: 'res-1',
    salonId: 'salon-1',
    userEmail: 'test@example.com',
    date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
    time: '12:00',
    menu: 'カット',
  },
  {
    id: 'res-2',
    salonId: 'salon-2',
    userEmail: 'test@example.com',
    date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)),
    time: '13:00',
    menu: 'ワンカラー',
  },
  {
    id: 'res-3',
    salonId: 'salon-3',
    userEmail: 'test@example.com',
    date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)),
    time: '11:00',
    menu: 'フェイシャル',
  },
];

export const initialFavorites = ['salon-2'];

export { formatDate };
