import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getOnlineUsers } from "@/lib/socket";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const onlineUserIds = getOnlineUsers();

    const followers = await prisma.user.findMany({
      where: {
        followers: {
          some: {
            followingId: userId,
          },
        },
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    // Annotate followers with online status
    const followersWithStatus = followers.map((follower) => ({
      ...follower,
      isOnline: onlineUserIds.includes(follower.id),
    }));

    return NextResponse.json(followersWithStatus);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch followers" },
      { status: 500 }
    );
  }
}
