import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HttpServer } from "http";
import prisma from "@/lib/prisma";

interface OnlineUsers {
  [userId: string]: string[]; // Socket IDs
}

const onlineUsers: OnlineUsers = {};

export function configureSocketIO(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    const httpServer = (res.socket as any).server as HttpServer;
    const io = new Server(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.on("user-online", async (userId: string) => {
        // Track user's online status
        if (!onlineUsers[userId]) {
          onlineUsers[userId] = [];

          // Update user status in database
          await prisma.user.update({
            where: { id: userId },
            data: { isOnline: true },
          });

          // Broadcast online status to all users
          socket.broadcast.emit("user-status-change", {
            userId,
            isOnline: true,
          });
        }
        onlineUsers[userId].push(socket.id);
      });

      socket.on("disconnect", async () => {
        // Find and remove the user associated with this socket
        for (const [userId, socketIds] of Object.entries(onlineUsers)) {
          const index = socketIds.indexOf(socket.id);
          if (index !== -1) {
            socketIds.splice(index, 1);

            // If no more socket connections for this user
            if (socketIds.length === 0) {
              delete onlineUsers[userId];

              // Update user status in database
              await prisma.user.update({
                where: { id: userId },
                data: { isOnline: false },
              });

              // Broadcast offline status to all users
              socket.broadcast.emit("user-status-change", {
                userId,
                isOnline: false,
              });
            }
            break;
          }
        }
      });
    });
    (res.socket as any).server.io = io;
  }

  res.end();
}

export function getOnlineUsers() {
  return Object.keys(onlineUsers);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    configureSocketIO(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
