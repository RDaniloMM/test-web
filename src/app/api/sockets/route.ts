import { Server } from "socket.io";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Asegúrate de que Prisma esté configurado correctamente

// Este es el punto de entrada para la API
export async function POST(req: NextRequest) {
  const socketHandler = (req: any, res: any) => {
    if (req.method === "POST") {
      const io = new Server(res.socket.server);

      // Cuando un usuario se conecta
      io.on("connection", (socket) => {
        console.log("Nuevo usuario conectado");

        // Escuchar por mensajes privados
        socket.on("private_message", async (newMessage) => {
          try {
            // Guardar el mensaje en la base de datos usando Prisma
            const savedMessage = await prisma.message.create({
              data: {
                content: newMessage.content,
                senderId: newMessage.senderId,
                receiverId: newMessage.receiverId,
                roomId: newMessage.roomId || null, // Si existe una sala
              },
            });

            // Emitir el mensaje a los clientes conectados
            socket.emit("private_message", savedMessage);
            socket
              .to(newMessage.receiverId)
              .emit("private_message", savedMessage);
          } catch (error) {
            console.error("Error al guardar el mensaje:", error);
          }
        });
      });

      // Asegurarse de que el servidor WebSocket funcione
      res.socket.server.io = io;
      res.end();
    }
  };

  return new Promise((resolve, reject) => {
    socketHandler(req, NextResponse);
  });
}

export const config = {
  api: {
    bodyParser: false, // Necesario para manejar archivos binarios como los de socket.io
  },
};
