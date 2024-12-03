import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { senderId: string; receiverId: string } }
) {
  const { senderId, receiverId } = params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        senderId,
        receiverId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener los mensajes" },
      { status: 500 }
    );
  }
}
