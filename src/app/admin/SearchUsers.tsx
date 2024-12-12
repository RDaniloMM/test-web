"use client";

import { usePathname, useRouter } from "next/navigation";
export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <form
        className="flex items-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <label htmlFor='search' className="text-white font-semibold">Buscar usuarios</label>
        <input
          id='search'
          name='search'
          type='text'
          className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button 
          type='submit' 
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
};
