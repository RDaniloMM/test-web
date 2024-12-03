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
  userId: string | null; // El id del usuario con el que estamos chateando
}

const ChatWindow = ({ userId }: ChatWindowProps) => {
  const { user: clerkUser } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  // Cargar los mensajes previos desde la base de datos solo si hay un chat seleccionado
  useEffect(() => {
    if (!userId) return; // Si no hay un usuario seleccionado, no se hace nada

    const fetchMessages = async () => {
      if (!clerkUser) return;
      try {
        const response = await fetch(`/api/messages/${clerkUser.id}/${userId}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setSelectedUserName(data.name); // Suponiendo que el endpoint devuelve un campo "name"
      } catch (error) {
        console.error("Error al cargar el nombre del usuario:", error);
      }
    };

    fetchMessages();
    fetchUserName();

    // Conexión con Socket.io
    const socketInstance = io();

    socketInstance.on("private_message", (newMessage: Message) => {
      // Solo añadir el mensaje si pertenece a la conversación actual
      if (newMessage.senderId === userId || newMessage.receiverId === userId) {
        setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [clerkUser, userId]);

  const handleSendMessage = async () => {
    if (!messageContent || !socket || !clerkUser || !userId) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: clerkUser.id,
      content: messageContent,
      receiverId: userId,
      timestamp: new Date().toISOString(),
    };

    // Emitir el mensaje al servidor
    socket.emit("private_message", newMessage);

    // Guardar el mensaje en la base de datos
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
    }

    // Actualizar el estado para mostrar el mensaje enviado
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageContent("");
  };

  return (
    <div className='flex flex-col bg-BlackCalido rounded-lg shadow-lg h-full border border-BorderColor'>
      {/* Header del Chat */}
      <div className='flex items-center justify-between bg-GrayOscuro p-4 rounded-lg mb-4 w-full border-b border-BorderColor'>
        <div className='flex items-center space-x-4'>
          <div className='w-10 h-10 bg-GrayCalido rounded-full'></div>
          <h2 className='text-WhiteCalido text-lg'>
            {selectedUserName || "Selecciona un usuario"}
          </h2>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className='flex-1 overflow-y-auto space-y-4 p-4'>
        {messages.length === 0 ? (
          <div className='flex justify-center items-center text-gray-400'>
            <p>No hay mensajes. Comienza a chatear!</p>
          </div>
        ) : (
          messages.map((message) => (
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
          ))
        )}
      </div>

      {/* Barra para escribir mensajes */}
      <div className='flex items-center bg-BlackCalido p-3 rounded-lg border-t border-BorderColor'>
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
