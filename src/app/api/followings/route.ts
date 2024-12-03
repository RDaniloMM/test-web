import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Obtener todos los usuarios seguidos
    const followingsData = await prisma.follower.findMany({
      where: { followerId: userId },
      include: {
        following: true,
      },
    });

    // Obtener el último mensaje con cada usuario seguido
    const followingsWithMessages = await Promise.all(
      followingsData.map(async (follow) => {
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              {
                senderId: follow.followingId,
                receiverId: userId,
              },
              {
                senderId: userId,
                receiverId: follow.followingId,
              },
            ],
          },
          orderBy: { createdAt: "desc" },
          select: {
            content: true,
            createdAt: true,
          },
        });

        return {
          ...follow.following,
          lastMessage: lastMessage || undefined,
        };
      })
    );

    return NextResponse.json(followingsWithMessages);
  } catch (error) {
    console.error("Error fetching followings:", error);
    return NextResponse.json(
      { error: "Failed to fetch followings" },
      { status: 500 }
    );
  }
}
