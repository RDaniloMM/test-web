import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Obtener los mensajes entre dos usuarios
export async function GET(
  req: NextRequest,
  { params }: { params: { senderId: string; receiverId: string } }
) {
  const { senderId, receiverId } = params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.error();
  }
}

// Guardar un mensaje nuevo
export async function POST(req: NextRequest) {
  const { senderId, receiverId, content, timestamp } = await req.json();

  try {
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
        createdAt: new Date(timestamp),
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.error();
  }
}
