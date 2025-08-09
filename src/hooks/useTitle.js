import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Food Fridge`;
    }
  }, [title]);
};

export default useTitle;
