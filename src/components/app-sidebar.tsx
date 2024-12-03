import React from "react";
import {
  HomeIcon,
  ChatBubbleLeftIcon,
  CogIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const homeRoute = "/";
const chatRoute = "/inbox";
const coursesRoute = "/cursos";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const items = [
  { title: "Inicio", url: homeRoute, icon: HomeIcon },
  { title: "Chats", url: chatRoute, icon: ChatBubbleLeftIcon },
  { title: "Recursos educativos", url: "#", icon: CogIcon },
  { title: "Cursos", url: coursesRoute, icon: BookOpenIcon },
  { title: "Mis clases", url: "#", icon: AcademicCapIcon },
];

export function AppSidebar({ isCollapsed, onToggleCollapse }: AppSidebarProps) {
  return (
    <Sidebar
      className={`bg-BlackCalido text-GrayCalido border-r border-BorderColor ${
        isCollapsed ? "w-16" : "w-64"
      } h-[calc(100vh-70px)] fixed top-[70px] left-0`} // Ajuste del top y la altura
    >
      {/* Contenedor con scroll oculto */}
      <div className='h-full overflow-y-auto scrollbar-hide'>
        <SidebarContent>
          {/* Botón para alternar sidebar */}
          <div className='flex justify-end p-2'>
            <button
              onClick={onToggleCollapse}
              className='text-WhiteCalido focus:outline-none'
            >
              {isCollapsed ? "➤" : "✖"}
            </button>
          </div>

          {!isCollapsed && (
            <SidebarHeader>
              <div className='flex flex-col items-center p-4'>
                <img
                  src='/noAvatar.png'
                  alt='Profile'
                  className='w-20 h-20 rounded-full mb-4 border-4 border-GrayCalido'
                />
                <p className='text-WhiteCalido'>Edson Josué P. Ch.</p>
                <p className='text-xs text-GrayCalido mb-4'>UNJBG</p>
                <div className='flex gap-6 mt-4 text-sm'>
                  <div className='flex flex-col items-center'>
                    <span className='font-extrabold text-WhiteCalido'>
                      100k
                    </span>
                    <span className='text-xs text-GrayCalido'>Subidos</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='font-extrabold text-WhiteCalido'>100</span>
                    <span className='text-xs text-GrayCalido'>Seguidores</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <span className='font-extrabold text-WhiteCalido'>100</span>
                    <span className='text-xs text-GrayCalido'>Seguidos</span>
                  </div>
                </div>
              </div>
            </SidebarHeader>
          )}

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className='hover:bg-GrayOscuro hover:text-WhiteCalido rounded-lg'
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className='flex items-center p-2'
                      >
                        <item.icon
                          className={`w-6 h-6 ${
                            isCollapsed ? "mx-auto" : "mr-3"
                          }`}
                        />
                        {!isCollapsed && <span>{item.title}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarFooter>
            <SidebarMenuItem className='hover:bg-GrayOscuro hover:text-WhiteCalido rounded-lg'>
              <SidebarMenuButton asChild>
                <a
                  href='#'
                  className='flex items-center p-2'
                >
                  <ArrowRightOnRectangleIcon
                    className={`w-6 h-6 ${isCollapsed ? "mx-auto" : "mr-3"}`}
                  />
                  {!isCollapsed && <span>Cerrar sesión</span>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
