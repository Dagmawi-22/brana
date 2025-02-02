import { useState } from "react";

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">
          Confirm Delete
        </h3>
        <p className="text-gray-700">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
