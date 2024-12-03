"use server";

import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {

  const { username } = params;

  // Obtén los datos del usuario de manera asincrónica
  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: {
        select: { followers: true, followings: true, posts: true },
      },
    },
  });

  // Si no se encuentra el usuario, se redirige a una página 404
  if (!user) return notFound();

  // Obtener el ID del usuario autenticado
  const { userId: currentUserId } = auth();

  // Verificar si el usuario actual está bloqueado por el usuario al que se está accediendo
  let isBlocked;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  // Si el usuario está bloqueado, redirigir a una página 404
  if (isBlocked) return notFound();

  return (
    <div className='flex gap-6 pt-6'>
      <div className='hidden xl:block w-[20%]'>
        <LeftMenu type='profile' />
      </div>
      <div className='w-full lg:w-[70%] xl:w-[50%]'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full h-64 relative'>
              <Image
                src={user.cover || "/noCover.png"}
                alt=''
                fill
                className='rounded-md object-cover'
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=''
                width={128}
                height={128}
                className='w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover'
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium text-WhiteCalido">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4 text-WhiteCalido">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Publicaciones</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Seguidores</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Seguidos</span>
              </div>
            </div>
          </div>
          <Feed username={user.username} />
        </div>
      </div>
      <div className='hidden lg:block w-[30%]'>
        <RightMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
