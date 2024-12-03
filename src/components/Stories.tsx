import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) return null;

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      // Filtra las historias de los usuarios que el usuario sigue o las propias del usuario
      OR: [
        {
          userId: currentUserId, // Historias del propio usuario
        },
        {
          userId: {
            in: await prisma.follower
              .findMany({
                where: {
                  followerId: currentUserId, // Obtén los `followings` de este usuario
                },
                select: {
                  followingId: true, // Solo obtenemos los IDs de las personas que sigue el usuario
                },
              })
              .then((followings) => followings.map((f) => f.followingId)), // Mapea los IDs de las personas que sigue
          },
        },
      ],
    },
    include: {
      user: true, // Incluye los detalles del usuario que publicó la historia
    },
  });

  return (
    <div className='p-4 bg-BlackCalido border border-BorderColor rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide'>
      <div className='flex gap-8 w-max'>
        <StoryList
          stories={stories}
          userId={currentUserId}
        />
      </div>
    </div>
  );
};

export default Stories;
