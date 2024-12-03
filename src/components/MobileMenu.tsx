"use client";

import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='md:hidden'>
      <div
        className='flex flex-col gap-[4.5px] cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-WhiteCalido rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-WhiteCalido rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-WhiteCalido rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-BlackCalido flex flex-col items-center justify-center gap-8 font-medium text-xl z-10 border border-BorderColor text-GrayCalido'>
          <Link href='/'>Inicio</Link>
          <Link href='/inbox'>Chats</Link>
          <Link href='/'>Recursos Educativos</Link>
          <Link href='/'>Cursos</Link>
          <Link href='/'>Mis Clases</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
