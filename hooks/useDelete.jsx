import { useState } from "react";

const useDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);

  const deleteData = async (url) => {
    setIsDeleting(true);
    setDeleteError(null);
    setDeleteResponse(null);

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to delete data");
      }

      setDeleteResponse(result);
      return result;
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteData, isDeleting, deleteError, deleteResponse };
};

export default useDelete;
