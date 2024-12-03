"use client";

import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {}
  };
  return (
    <div className='flex items-center justify-between text-sm my-4'>
      <div className='flex gap-8'>
        <div className='flex items-center gap-4 bg-transparent p-2 rounded-xl border border-BorderColor'>
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                width={16}
                height={16}
                alt=''
                className='cursor-pointer'
              />
            </button>
          </form>
          <span className='text-GrayCalido'>|</span>
          <span className='text-GrayCalido'>
            {optimisticLike.likeCount}
            <span className='hidden md:inline'> Likes</span>
          </span>
        </div>
        <div className='flex items-center gap-4 bg-transparent p-2 rounded-xl border border-BorderColor'>
          <Image
            src='/comment.png'
            width={16}
            height={16}
            alt=''
            className='cursor-pointer'
          />
          <span className='text-GrayCalido'>|</span>
          <span className='text-GrayCalido'>
            {commentNumber}
            <span className='hidden md:inline'> Comentarios</span>
          </span>
        </div>
      </div>
      {/*       <div className="">
        <div className="flex items-center gap-4 bg-transparent p-2 rounded-xl border border-BorderColor">
          <Image
            src="/share.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-GrayCalido">|</span>
          <span className="text-GrayCalido">
            <span className="hidden md:inline"> Compartir</span>
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default PostInteraction;
