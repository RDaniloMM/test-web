import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex gap-2'
    >
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Escribe un mensaje...'
        className='flex-1 p-2 border rounded'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Enviar
      </button>
    </form>
  );
}
