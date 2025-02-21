import {
  ClipboardListIcon,
  LogOutIcon,
  MenuIcon,
  UserRoundPlusIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Nome do site */}
        <h1 className="text-2xl font-bold text-white">(Master) Book E-Commerce</h1>

        {/* Área de navegação alinhada à direita */}
        <div className="flex items-center gap-6">
          {/* Link para produtos (ao lado do menu suspenso) */}
          <Link
            href="/produtos"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition duration-300"
          >
            <ClipboardListIcon size={20} />
            Produtos
          </Link>

          {/* Botão do Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              <MenuIcon size={28} />
            </button>

            {/* Menu suspenso */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg py-2 animate-fade-in">
                <Link
                  href="/cadastro"
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                >
                  <UserRoundPlusIcon size={18} />
                  Cadastro de clientes
                </Link>

                <Link
                  href="/clientes"
                  className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                >
                  <UsersRoundIcon size={18} />
                  Lista de clientes
                </Link>

                <hr className="my-2 border-gray-300" />

                <button
                  onClick={logout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition duration-300"
                >
                  <LogOutIcon size={20} />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}