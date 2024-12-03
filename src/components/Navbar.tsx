import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className='h-18 flex items-center justify-between'>
      {/* LEFT */}
      <div className='md:hidden lg:block w-[20%]'>
        <img
          src='/logo.svg'
          alt='logo'
          className='w-10 h-10'
        />
        <Link
          href='/'
          className='font-bold text-xl text-WhiteCalido'
        >
          EDUCONNECT
        </Link>
      </div>
      {/* CENTER */}
      <div className='hidden md:flex w-[50%] text-sm items-center justify-between'>
        {/* LINKS */}
        <div className='flex gap-6 text-GrayCalido'>
          <Link
            href='/'
            className='flex items-center gap-2 hover:text-WhiteCalido'
          >
            <span>Recursos</span>
          </Link>
          <Link
            href='/'
            className='flex items-center gap-2 hover:text-WhiteCalido'
          >
            <span>Cursos</span>
          </Link>
          <Link
            href='/'
            className='flex items-center gap-2 hover:text-WhiteCalido'
          >
            <span>Foros de discusión</span>
          </Link>
        </div>
        <div className='hidden xl:flex p-2 bg-BlackCalido items-center rounded-xl bg-BlackCalido border border-BorderColor'>
          <input
            type='text'
            placeholder='Buscar...'
            className='bg-transparent outline-none placeholder-GrayCalido'
          />
          <Image
            src='/search.png'
            alt=''
            width={14}
            height={14}
          />
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
        <ClerkLoading>
          <div className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className='cursor-pointer'>
              <Image
                src='/people.png'
                alt=''
                width={24}
                height={24}
              />
            </div>
            <div className='cursor-pointer'>
              <Image
                src='/messages.png'
                alt=''
                width={20}
                height={20}
              />
            </div>
            <div className='cursor-pointer'>
              <Image
                src='/notifications.png'
                alt=''
                width={20}
                height={20}
              />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className='flex items-center gap-2 text-sm text-WhiteCalido'>
              <Image
                src='/login.png'
                alt=''
                width={20}
                height={20}
              />
              <Link href='/sign-in'>Login/Registro</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
