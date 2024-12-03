"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface UserWithLastMessage {
  id: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
  lastMessage?: {
    content: string;
    createdAt: Date;
  };
}

interface UserListProps {
  onUserSelect: (userId: string) => void; // Función para pasar el userId al componente padre
}

const UserList = ({ onUserSelect }: UserListProps) => {
  const { user: clerkUser } = useUser();
  const [followings, setFollowings] = useState<UserWithLastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFollowings = async () => {
      if (!clerkUser) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/followings`);
        if (!response.ok) {
          throw new Error("Failed to fetch followings");
        }
        const data = await response.json();
        setFollowings(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching followings:", error);
        setIsLoading(false);
      }
    };

    fetchFollowings();
  }, [clerkUser]);

  if (!clerkUser) return null;

  if (isLoading) {
    return (
      <div className='bg-BlackCalido rounded-lg shadow-lg p-4 h-full overflow-y-auto w-full max-w-xs border border-BorderColor'>
        <p className='text-WhiteCalido'>Cargando seguidores...</p>
      </div>
    );
  }

  return (
    <div className='bg-BlackCalido rounded-lg shadow-lg p-4 h-full overflow-y-auto w-full max-w-xs border border-BorderColor'>
      {followings.length === 0 ? (
        <p className='text-WhiteCalido'>No sigues a ningún usuario</p>
      ) : (
        <ul className='space-y-4'>
          {followings.map((user) => (
            <li
              key={user.id}
              className='flex items-center justify-between p-2 rounded-lg hover:bg-GrayOscuro transition'
              onClick={() => onUserSelect(user.id)} // Llamamos a la función al hacer clic
            >
              <div className='flex items-center space-x-4'>
                <div
                  className='w-10 h-10 bg-GrayCalido rounded-full'
                  style={{
                    backgroundImage: user.avatar
                      ? `url(${user.avatar})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div>
                  <h4 className='text-sm text-WhiteCalido'>
                    {user.name || user.username}
                  </h4>
                  <p className='text-xs text-GrayPalido truncate'>
                    {user.lastMessage?.content || "Sin mensajes"}
                  </p>
                </div>
              </div>
              <span className='text-xs text-GrayPalido'>
                {user.lastMessage?.createdAt
                  ? new Date(user.lastMessage.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
