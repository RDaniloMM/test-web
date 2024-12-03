"use client";

import React, { useState } from "react";
import UserList from "./_components/UserList";
import ChatWindow from "./_components/ChatWindow"; // Importa el nuevo componente

const Page = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className='flex h-screen'>
      {/* Lista de usuarios */}
      <div className='w-1/3 h-full'>
        <UserList onUserSelect={handleUserSelect} />
      </div>

      {/* Ventana de chat */}
      <div className='w-2/3 h-full'>
        <ChatWindow userId={selectedUserId} />
      </div>
    </div>
  );
};

export default Page;
