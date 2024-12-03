"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import SearchBar from "./_components/SearchBar";
import UserList from "./_components/UserList";
import ChatWindow from "./_components/ChatWindow"; // Importa el nuevo componente

export default function Layout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <SidebarProvider>
      <div className='h-screen w-screen flex flex-col'>
        {/* Header */}

        {/* Contenedor principal */}
        <div className='flex flex-1'>
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
          <main className='flex-1 text-WhiteCalido'>
            <div className='flex h-full'>
              {/* Sección izquierda: Búsqueda y lista de usuarios */}
              <div className='flex flex-col w-1/4 min-w-[250px]'>
                <SearchBar placeholder='Buscar usuario...' />
                <UserList />
              </div>

              {/* Sección derecha: ChatWindow */}
              <div className='flex-1'>
                <ChatWindow />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}