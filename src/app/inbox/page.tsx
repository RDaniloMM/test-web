"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { ChatInput } from "./_components/ChatInput";
import { useChat } from "@/hooks/useChat";
import Image from "next/image";
import io from "socket.io-client";

interface Follower {
  id: string;
  username: string;
  avatar: string | null;
  isOnline: boolean;
}

export default function ChatPage() {
  const { user } = useUser();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [selectedUser, setSelectedUser] = useState<Follower | null>(null);
  const { messages, sendMessage } = useChat(selectedUser?.id);

  useEffect(() => {
    // Socket connection for online status
    if (user) {
      const socket = io({
        path: "/api/socket",
        addTrailingSlash: false,
      });

      // Notify server of user's online status
      socket.emit("user-online", user.id);

      // Listen for user status changes
      socket.on("user-status-change", ({ userId, isOnline }) => {
        setFollowers((prev) =>
          prev.map((follower) =>
            follower.id === userId ? { ...follower, isOnline } : follower
          )
        );
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await fetch("/api/followers");
      const data = await response.json();
      setFollowers(data);
    };

    if (user) {
      fetchFollowers();
    }
  }, [user]);

  const handleUserSelect = (follower: Follower) => {
    setSelectedUser(follower);
  };

  if (!user) return <div>Please log in</div>;

  return (
    <div className='flex h-screen'>
      {/* Followers List */}
      <div className='w-1/4 border-r p-4 overflow-y-auto'>
        <h2 className='text-xl font-bold mb-4'>Followers</h2>
        {followers.map((follower) => (
          <div
            key={follower.id}
            onClick={() => handleUserSelect(follower)}
            className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 ${
              selectedUser?.id === follower.id ? "bg-gray-200" : ""
            }`}
          >
            {follower.avatar && (
              <div className='relative'>
                <Image
                  src={follower.avatar}
                  alt={follower.username}
                  width={40}
                  height={40}
                  className='rounded-full mr-2'
                />
                {follower.isOnline && (
                  <span
                    className='absolute bottom-0 right-2 w-3 h-3 
                    bg-green-500 rounded-full border-2 border-white'
                  />
                )}
              </div>
            )}
            <span className='mr-2'>{follower.username}</span>
            {follower.isOnline && (
              <span className='text-green-500 text-xs'>Online</span>
            )}
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className='w-3/4 flex flex-col'>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className='p-4 border-b flex items-center'>
              {selectedUser.avatar && (
                <div className='relative'>
                  <Image
                    src={selectedUser.avatar}
                    alt={selectedUser.username}
                    width={40}
                    height={40}
                    className='rounded-full mr-2'
                  />
                  {selectedUser.isOnline && (
                    <span
                      className='absolute bottom-0 right-2 w-3 h-3 
                      bg-green-500 rounded-full border-2 border-white'
                    />
                  )}
                </div>
              )}
              <div>
                <h2 className='text-xl font-bold'>{selectedUser.username}</h2>
                {selectedUser.isOnline && (
                  <span className='text-green-500 text-xs'>Online</span>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className='flex-1 overflow-y-auto p-4'>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-2 ${
                    msg.senderId === user.id ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded ${
                      msg.senderId === user.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className='p-4 border-t'>
              <ChatInput
                onSendMessage={(message) => {
                  sendMessage(message, selectedUser.id);
                }}
              />
            </div>
          </>
        ) : (
          <div className='flex items-center justify-center h-full text-gray-500'>
            Tus mensajes
          </div>
        )}
      </div>
    </div>
  );
}
