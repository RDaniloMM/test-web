import { Server } from "socket.io";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false, // Necesario para manejar archivos binarios como los de socket.io
  },
};

let io: Server;

import { NextApiRequest, NextApiResponse } from "next";

const socketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Verificamos si `io` ya está inicializado
    if (!io) {
      // Aseguramos que el socket res.server es válido
      const socket = res.socket as any; // Hacemos un cast para acceder a `res.socket.server`

      if (socket && socket.server) {
        // Creamos el servidor Socket.io solo si socket.server está disponible
        const socketIo = new Server(socket.server);

        socketIo.on("connection", (socket) => {
          console.log("Nuevo usuario conectado");

          // Escuchar los mensajes privados
          socket.on("private_message", async (newMessage) => {
            try {
              // Guardar el mensaje en la base de datos usando Prisma
              const savedMessage = await prisma.message.create({
                data: {
                  content: newMessage.content,
                  senderId: newMessage.senderId,
                  receiverId: newMessage.receiverId,
                  roomId: newMessage.roomId || null, // Si hay una sala
                },
              });

              // Emitir el mensaje a los clientes
              socket.emit("private_message", savedMessage);
              socket
                .to(newMessage.receiverId)
                .emit("private_message", savedMessage);
            } catch (error) {
              console.error("Error al guardar el mensaje:", error);
            }
          });
        });

        // Asignamos el servidor Socket.io a la variable `io`
        io = socketIo;
      }
    }

    return res.status(200).end();
  }

  // Si no es una solicitud POST, responder con un error
  res.status(405).json({ message: "Method Not Allowed" });
};

export default socketHandler;
