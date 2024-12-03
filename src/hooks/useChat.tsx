import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useUser } from "@clerk/nextjs";
import { Message } from "@prisma/client";

export function useChat(receiverId?: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !receiverId) return;

      const response = await fetch(`/api/messages?receiverId=${receiverId}`);
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();
  }, [user, receiverId]);

  useEffect(() => {
    if (!receiverId) return;

    const socketInitializer = async () => {
      await fetch("/api/socket");

      const socketInstance = io({
        path: "/api/socket",
        addTrailingSlash: false,
      });

      socketInstance.on("connect", () => {
        console.log("Socket connected");
      });

      socketInstance.on("receive-message", (message: Message) => {
        console.log("Mensaje recibido:", message); // Verifica que llegue el mensaje
        setMessages((prev) => [...prev, message]);
      });

      setSocket(socketInstance);
    };

    socketInitializer();

    return () => {
      socket?.disconnect();
    };
  }, [receiverId]);
  const sendMessage = async (content: string, receiverId?: string) => {
    if (!user || !socket) return;

    const newMessage = {
      id: `${Date.now()}`, // O usa una librería para generar un ID único
      content,
      createdAt: new Date(), // Establece la fecha actual
      senderId: user.id,
      receiverId: receiverId || null,
      roomId: null, // O asigna el roomId si es necesario
    };

    // Actualiza el estado inmediatamente con el nuevo mensaje
    setMessages((prev) => [...prev, newMessage]);

    // Luego, emite el mensaje al servidor
    socket.emit("send-message", newMessage);

    // Guarda el mensaje en la base de datos
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { messages, sendMessage };
}
