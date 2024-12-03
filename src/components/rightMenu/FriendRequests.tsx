import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;
  return (
    <div className="p-4 bg-BlackCalido rounded-lg shadow-md text-sm flex flex-col gap-4 border border-BorderColor">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-WhiteCalido">Solciitudes de amistad</span>
        <Link href="/" className="text-VioletCalido text-xs">
          Ver todo
        </Link>
      </div>
      {/* USER */}
      <FriendRequestList requests={requests}/>
      
    </div>
  );
};

export default FriendRequests;
