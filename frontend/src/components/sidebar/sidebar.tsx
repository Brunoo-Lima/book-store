import {
  ClipboardListIcon,
  LogOutIcon,
  UserRoundPlusIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Link from 'next/link';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="h-full w-[300px] bg-blue-700 flex flex-col items-center pb-[2rem] px-2">
      <div className="py-4">
        <h1 className="text-3xl font-semibold text-white">Menu</h1>
      </div>

      <nav className="pt-6 flex-1 space-y-3 w-full">
        <Link
          href="/cadastro"
          className="flex items-center gap-2 hover:bg-blue-900 transition duration-500 w-full p-2"
        >
          <UserRoundPlusIcon size={16} />
          Cadastro de clientes
        </Link>

        <Link
          href="/clientes"
          className="flex items-center gap-2 hover:bg-blue-900 transition duration-500 w-full p-2"
        >
          <UsersRoundIcon size={16} />
          Lista de clientes
        </Link>

        <Link
          href="/produtos"
          className="flex items-center gap-2 hover:bg-blue-900 transition duration-500 w-full p-2"
        >
          <ClipboardListIcon size={16} />
          Produtos
        </Link>
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-2 hover:bg-blue-900 transition duration-500 w-full p-2"
      >
        <LogOutIcon size={24} />
        <p>Sair</p>
      </button>
    </div>
  );
}
