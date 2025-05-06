"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; // Adicione esta importação, se usar toast
import {
  LayoutDashboardIcon,
  HomeIcon,
  CreditCardIcon,
  CalendarIcon,
  HeartIcon,
  FileTextIcon,
  UserIcon,
  LogOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        if (mobile) setCollapsed(true);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile]);

  const navItems: NavItem[] = [
    { name: "Dashboard", href: "/cliente/dashboard", icon: <LayoutDashboardIcon className="h-5 w-5" /> },
    { name: "Meus Imóveis", href: "/cliente/imoveis", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Financeiro", href: "/cliente/financeiro", icon: <CreditCardIcon className="h-5 w-5" /> },
    { name: "Visitas", href: "/cliente/visitas", icon: <CalendarIcon className="h-5 w-5" /> },
    { name: "Favoritos", href: "/cliente/favoritos", icon: <HeartIcon className="h-5 w-5" /> },
    { name: "Documentos", href: "/cliente/documentos", icon: <FileTextIcon className="h-5 w-5" /> },
    { name: "Meu Perfil", href: "/cliente/perfil", icon: <UserIcon className="h-5 w-5" /> },
  ];

  if (isMobile) {
    // TODO: Integrar com ClientNavbar para abrir como menu deslizante em telas móveis
    return null;
  }

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("token"); // Ajuste conforme sua autenticação
    toast.success("Logout realizado com sucesso!"); // Opcional, se usar react-hot-toast
    router.push("/cliente/login");
    setIsLoggingOut(false);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0",
        collapsed ? "w-[70px] p-2" : "w-[250px]",
      )}
    >
      <div className="p-4 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-emerald-800"
          aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          aria-expanded={!collapsed}
        >
          {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  pathname === item.href ? "bg-emerald-50 text-emerald-800" : "text-gray-700 hover:bg-gray-100",
                  collapsed ? "justify-center" : "",
                )}
                aria-label={collapsed ? item.name : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className={cn(
            "text-red-600 hover:bg-red-50 hover:text-red-700 w-full",
            collapsed ? "justify-center px-2" : "justify-start",
          )}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <span>Carregando...</span>
          ) : (
            <>
              <LogOutIcon className="h-5 w-5" />
              {!collapsed && <span className="ml-2">Sair</span>}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}