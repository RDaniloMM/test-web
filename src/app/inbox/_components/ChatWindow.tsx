"use client";

import React from "react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "me";
  timestamp: string;
}

const messages: Message[] = [
  { id: 1, content: "Hola, ¿cómo estás?", sender: "user", timestamp: "10:30 AM" },
  { id: 2, content: "Todo bien, ¿y tú?", sender: "me", timestamp: "10:31 AM" },
  { id: 3, content: "Bien, gracias. ¿Qué tal tu día?", sender: "user", timestamp: "10:32 AM" },
  { id: 4, content: "Muy productivo, gracias.", sender: "me", timestamp: "10:33 AM" },
  { id: 5, content: "Eso es genial.", sender: "user", timestamp: "10:34 AM" },
];

const ChatWindow = () => {
  return (
    <div className="flex flex-col bg-BlackCalido rounded-lg shadow-lg h-full border border-BorderColor">
      {/* Header del Chat */}
      <div className="flex items-center justify-between bg-GrayOscuro p-4 rounded-lg mb-4 w-full border-b border-BorderColor">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-GrayCalido rounded-full"></div>
          <h2 className="text-WhiteCalido text-lg">User 1</h2>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.sender === "me"
                  ? "bg-VioletCalido text-WhiteCalido"
                  : "bg-GrayOscuro text-WhiteCalido"
              } p-3 rounded-lg max-w-xs`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Barra para escribir mensajes */}
      <div className="flex items-center bg-BlackCalido p-3 rounded-lg">
        <input
          type="text"
          placeholder="Escribir un mensaje..."
          className="flex-1 bg-GrayOscuro text-WhiteCalido p-3 rounded-lg focus:outline-none border border-BorderColor placeholder-GrayCalido"
        />
        <button className="ml-4 bg-VioletCalido text-WhiteCalido p-3 rounded-lg">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
