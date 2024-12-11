import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setShouldRender(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShouldRender(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading, shouldRender };
};
