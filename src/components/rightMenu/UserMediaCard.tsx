import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='p-4 bg-BlackCalido rounded-lg shadow-md text-sm flex flex-col gap-4 border border-BorderColor'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-WhiteCalido'>Contenido del Usuario</span>
        <Link
          href='/'
          className='text-VioletCalido text-xs'
        >
          Ver todo
        </Link>
      </div>
      {/* BOTTOM */}
      <div className='flex gap-4 justify-between flex-wrap'>
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div
                className='relative w-1/5 h-24'
                key={post.id}
              >
                <Image
                  src={post.img || "/noImage.png"}
                  alt=''
                  fill
                  className='object-cover rounded-md'
                />
              </div>
            ))
          : "No media found!"}
      </div>
    </div>
  );
};

export default UserMediaCard;
