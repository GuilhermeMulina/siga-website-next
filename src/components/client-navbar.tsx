"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BellIcon, MenuIcon, UserIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClientNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Ajuste conforme sua autenticação
    router.push("/cliente/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Siga Imóveis Logo"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
            </Link>
            <div className="hidden md:flex items-center ml-8 space-x-6">
              <Link href="/cliente/dashboard" className="text-gray-700 hover:text-emerald-800 font-medium">
                Dashboard
              </Link>
              <Link href="/cliente/imoveis" className="text-gray-700 hover:text-emerald-800 font-medium">
                Meus Imóveis
              </Link>
              <Link href="/cliente/financeiro" className="text-gray-700 hover:text-emerald-800 font-medium">
                Financeiro
              </Link>
              <Link href="/cliente/visitas" className="text-gray-700 hover:text-emerald-800 font-medium">
                Visitas
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-800"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Abrir menu de conta">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/cliente/perfil">Meu Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu lateral"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
              style={{ transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="flex flex-col space-y-4 p-6 mt-12">
                <Link
                  href="/cliente/dashboard"
                  className="px-2 py-1 text-gray-700 hover:text-emerald-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/cliente/imoveis"
                  className="px-2 py-1 text-gray-700 hover:text-emerald-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Meus Imóveis
                </Link>
                <Link
                  href="/cliente/financeiro"
                  className="px-2 py-1 text-gray-700 hover:text-emerald-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Financeiro
                </Link>
                <Link
                  href="/cliente/visitas"
                  className="px-2 py-1 text-gray-700 hover:text-emerald-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Visitas
                </Link>
                <Link
                  href="/cliente/perfil"
                  className="px-2 py-1 text-gray-700 hover:text-emerald-800 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Meu Perfil
                </Link>
                <button
                  className="px-2 py-1 text-left text-red-600 font-medium flex items-center"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  <span>Sair</span>
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}