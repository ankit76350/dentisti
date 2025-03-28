import { useState } from "react";

const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateData = async (url, body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "PUT", // Use "PATCH" if only updating specific fields
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      
      if (!response.ok) throw new Error(result.message || "Failed to update");

      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, updateData };
};

export default usePut;
