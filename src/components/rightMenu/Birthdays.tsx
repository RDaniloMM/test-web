import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-BlackCalido rounded-lg shadow-md text-sm flex flex-col gap-4 border border-BorderColor">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-WhiteCalido">Cumpleaños</span>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/18207381/pexels-photo-18207381/free-photo-of-window-in-bar.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-WhiteCalido">Rivaldo Danilo</span>
        </div>
        <div className="flex gap-3 justify-end">
          <button className="bg-VioletCalido text-white text-xs px-2 py-1 rounded-md">
            Felicitar
          </button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className="p-4 bg-transparent rounded-lg flex items-center gap-4 border border-BorderColor">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-WhiteCalido font-semibold">
            Proximos Cumpleaños
          </span>
          <span className="text-GrayCalido">
            Mira los próximos cumpleaños
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
