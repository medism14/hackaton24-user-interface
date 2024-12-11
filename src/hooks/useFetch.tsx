import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Fetch error:', error))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
};

export default useFetch;
