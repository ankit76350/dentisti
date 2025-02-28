import { useEffect, useState } from "react";

export const useFetch = (url, token = '') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (!url) {
        setError('URL is required');
        setLoading(false);
        return;
      }
  
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          setData(result ?? []);  // Ensure it's not undefined
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url, token]);
  
    return { data, loading, error };
  };
  
