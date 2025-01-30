import React from "react";

interface PopupProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <div
          className={`text-2xl font-semibold ${
            type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "success" ? "✅ Success" : "❌ Error"}
        </div>
        <p className="text-gray-700 mt-2">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
