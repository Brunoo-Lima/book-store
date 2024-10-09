'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IHeaderProps {
  title: string;
  isButtonBack?: boolean;
}

export default function Header({ title, isButtonBack = false }: IHeaderProps) {
  const router = useRouter();

  return (
    <header className="py-6 flex gap-1 items-center">
      {isButtonBack && (
        <button onClick={() => router.back()}>
          <ChevronLeft size={32} color="#fff" className="-ml-2" />
        </button>
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}
