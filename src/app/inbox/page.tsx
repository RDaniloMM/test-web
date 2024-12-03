"use client";

import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SearchBar from "./_components/SearchBar";
import UserList from "./_components/UserList";
import ChatWindow from "./_components/ChatWindow"; // Importa el nuevo componente
import { useUser } from "@clerk/nextjs"; // Importa useUser de Clerk

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { user, isLoaded, isSignedIn } = useUser(); // Usamos el hook useUser para obtener el usuario

  // Este efecto es para esperar que los datos del usuario estén listos
  if (!isLoaded) {
    return <p>Loading...</p>; // O alguna UI de carga mientras obtenemos los datos del usuario
  }

  // Si no está autenticado, puedes redirigir o mostrar un mensaje
  if (!isSignedIn) {
    return <p>No estás autenticado</p>;
  }

  // Obtenemos el userId del usuario autenticado
  const userId = user?.id;

  return (
    <SidebarProvider>
      <div className="h-screen w-screen flex flex-col">
        {/* Header */}

        {/* Contenedor principal */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div
            className={`transition-all duration-300 ${
              isSidebarCollapsed ? "w-16" : "w-48"
            }`}
          >
            <AppSidebar
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() =>
                setIsSidebarCollapsed(!isSidebarCollapsed)
              }
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 text-WhiteCalido">
            <div className="flex h-full">
              {/* Sección izquierda: Búsqueda y lista de usuarios */}
              <div className="flex flex-col w-1/4 min-w-[250px]">
                <SearchBar placeholder="Buscar usuario..." />
                <UserList />
              </div>

              {/* Sección derecha: ChatWindow */}
              <div className="flex-1">
                {/* Aquí pasamos el userId al componente ChatWindow */}
                {userId && <ChatWindow userId={userId} />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
