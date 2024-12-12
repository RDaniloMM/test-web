import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;

  const filteredUsers = query
    ? users.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(query.toLowerCase()) ||
          user.emailAddresses.some((email) =>
            email.emailAddress.toLowerCase().includes(query.toLowerCase())
          )
      )
    : users;

  return (
    <div className='min-h-screen bg-gray-900 text-white p-8'>
      <p className='text-xl font-bold mb-6'>Panel de Administración</p>

      <SearchUsers />

      <div className='grid grid-cols-1 gap-6 mt-6'>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className='bg-gray-800 p-6 rounded-lg shadow-md'
          >
            <div className='text-lg font-semibold'>
              {user.firstName} {user.lastName}
            </div>

            <div className='text-gray-400'>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>

            <div className='text-gray-300 mt-2'>
              Rol: {(user.publicMetadata.role as string) || "Usuario"}
            </div>

            <div className='mt-4 flex gap-4'>
              <form
                action={setRole}
                className='inline-block'
              >
                <input
                  type='hidden'
                  value={user.id}
                  name='id'
                />
                <input
                  type='hidden'
                  value='admin'
                  name='role'
                />
                <button
                  type='submit'
                  className='bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded'
                >
                  Hacer Admin
                </button>
              </form>

              <form
                action={removeRole}
                className='inline-block'
              >
                <input
                  type='hidden'
                  value={user.id}
                  name='id'
                />
                <button
                  type='submit'
                  className='bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded'
                >
                  Eliminar Rol
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
