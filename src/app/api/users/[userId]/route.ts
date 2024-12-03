// app/api/users/[userId]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }, // Asegúrate de que esto esté correctamente configurado
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ name: user.name }); // Asegúrate de devolver 'name'
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
