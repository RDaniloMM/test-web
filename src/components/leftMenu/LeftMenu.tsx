import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-BlackCalido rounded-lg shadow-md text-sm text-GrayCalido flex flex-col gap-2 border border-BorderColor">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/posts.png" alt="" width={20} height={20} />
          <span>Inicio</span>
        </Link>
        <hr className="border-t-1 border-BorderColor w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/activity.png" alt="" width={20} height={20} />
          <span>Chats</span>
        </Link>
        <hr className="border-t-1 border-BorderColor w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/market.png" alt="" width={20} height={20} />
          <span>Recursos Educaivos</span>
        </Link>
        <hr className="border-t-1 border-BorderColor w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/events.png" alt="" width={20} height={20} />
          <span>Cursos</span>
        </Link>
        <hr className="border-t-1 border-BorderColor w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/albums.png" alt="" width={20} height={20} />
          <span>Mis clases</span>
        </Link>
        <hr className="border-t-1 border-BorderColor w-36 self-center" />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-GrayOscuro hover:text-WhiteCalido"
        >
          <Image src="/settings.png" alt="" width={20} height={20} />
          <span>Configuración</span>
        </Link>
      </div>
      <Ad size="sm"/>
    </div>
  );
};

export default LeftMenu;
