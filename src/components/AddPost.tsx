"use client";

import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className='p-4 bg-BlackCalido shadow-md rounded-lg flex gap-4 justify-between text-sm border border-BorderColor'>
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=''
        width={48}
        height={48}
        className='w-12 h-12 object-cover rounded-full'
      />
      {/* POST */}
      <div className='flex-1'>
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className='flex gap-4'
        >
          <textarea
            placeholder='¿Qué estás pensando?'
            className='flex-1 bg-transparent rounded-lg p-2 border border-BorderColor placeholder-GrayCalido text-WhiteCalido'
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className=''>
            <Image
              src='/emoji.png'
              alt=''
              width={20}
              height={20}
              className='w-5 h-5 cursor-pointer self-end'
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className='flex items-center gap-4 mt-4 text-gray-400 flex-wrap'>
          <CldUploadWidget
            uploadPreset='social'
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className='flex items-center gap-2 cursor-pointer text-WhiteCalido'
                  onClick={() => open()}
                >
                  <Image
                    src='/addimage.png'
                    alt=''
                    width={20}
                    height={20}
                  />
                  Imágen
                </div>
              );
            }}
          </CldUploadWidget>
          <div className='flex items-center gap-2 cursor-pointer text-WhiteCalido'>
            <Image
              src='/addVideo.png'
              alt=''
              width={20}
              height={20}
            />
            Video
          </div>
          <div className='flex items-center gap-2 cursor-pointer text-WhiteCalido'>
            <Image
              src='/poll.png'
              alt=''
              width={20}
              height={20}
            />
            Encuesta
          </div>
          <div className='flex items-center gap-2 cursor-pointer text-WhiteCalido'>
            <Image
              src='/addevent.png'
              alt=''
              width={20}
              height={20}
            />
            Evento
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
