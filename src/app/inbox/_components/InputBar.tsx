"use client";

import React, { useState } from "react";

interface InputBarProps {
  onSendMessage: (message: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 border-t border-gray-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribir un mensaje..."
        className="flex-1 p-3 text-sm bg-gray-700 text-white rounded-lg focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="ml-4 p-3 bg-blue-600 text-white rounded-lg"
      >
        Enviar
      </button>
    </div>
  );
};

export default InputBar;
