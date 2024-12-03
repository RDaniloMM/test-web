"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import io from "socket.io-client";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

interface ChatWindowProps {
  userId: string; // El id del usuario con el que estamos chateando
}

const ChatWindow = ({ userId }: ChatWindowProps) => {
  const { user: clerkUser } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    // Connect to Socket.io server
    const socketInstance = io();

    // Listen for incoming private messages
    socketInstance.on("private_message", (newMessage: Message) => {
      setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleSendMessage = async () => {
    if (!messageContent || !socket || !clerkUser) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: clerkUser.id,
      content: messageContent,
      receiverId: userId,
      timestamp: new Date().toISOString(),
    };

    // Emitir el mensaje al servidor para guardarlo en la base de datos
    socket.emit("private_message", newMessage);

    // Guardar temporalmente el mensaje en el cliente
    setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
    setMessageContent("");
  };

  return (
    <div className='flex flex-col bg-BlackCalido rounded-lg shadow-lg h-full border border-BorderColor'>
      {/* Header del Chat */}
      <div className='flex items-center justify-between bg-GrayOscuro p-4 rounded-lg mb-4 w-full border-b border-BorderColor'>
        <div className='flex items-center space-x-4'>
          <div className='w-10 h-10 bg-GrayCalido rounded-full'></div>
          <h2 className='text-WhiteCalido text-lg'>{userId}</h2>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className='flex-1 overflow-y-auto space-y-4 p-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === clerkUser?.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`${
                message.senderId === clerkUser?.id
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
      <div className='flex items-center bg-BlackCalido p-3 rounded-lg'>
        <input
          type='text'
          placeholder='Escribir un mensaje...'
          className='flex-1 bg-GrayOscuro text-WhiteCalido p-3 rounded-lg focus:outline-none border border-BorderColor placeholder-GrayCalido'
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button
          className='ml-4 bg-VioletCalido text-WhiteCalido p-3 rounded-lg'
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
