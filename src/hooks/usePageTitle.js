import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | サロン予約システム` : 'サロン予約システム';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default usePageTitle;
