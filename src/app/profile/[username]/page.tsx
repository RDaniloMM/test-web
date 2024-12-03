import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserWithFollowers } from "@/types/types";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params; // Captura el parámetro username de la URL

  // Busca el usuario por su username
  const user: UserWithFollowers | null = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound(); // Si no se encuentra el usuario, muestra 404

  const { userId: currentUserId } = auth();

  let isBlocked = false;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  }

  if (isBlocked) return notFound(); // Si el usuario está bloqueado, muestra 404

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
            <h1 className='mt-20 mb-4 text-2xl font-medium text-slate-100'>
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
            <div className='flex items-center justify-center gap-12 mb-4'>
              <div className='flex flex-col items-center'>
                <span className='font-medium text-slate-50'>
                  {user._count.posts}
                </span>
                <span className='text-sm text-slate-50'>Publicaciones</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium text-slate-50'>
                  {user._count.followers}
                </span>
                <span className='text-sm text-slate-50'>Seguidores</span>
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-medium text-slate-50'>
                  {user._count.followings}
                </span>
                <span className='text-sm text-slate-50'>Siguiendo</span>
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
