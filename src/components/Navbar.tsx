"use client";
import { Search, User } from "lucide-react";
import Link from "next/link"; // Importação importante

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
          NEXUS<span className="text-slate-900">CORP</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full">
            <Search size={20} className="text-slate-500" />
          </button>
          
          {/* Botão Atualizado com Link */}
          <Link href="/login">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              <User size={16} />
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}