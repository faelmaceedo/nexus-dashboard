"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula uma requisição ao servidor
    setTimeout(() => {
      alert("Login realizado com sucesso! (Simulação)");
      setLoading(false);
      window.location.href = "/";
    }, 1500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <Link href="/" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Acesso ao Cidadão</h1>
          <p className="text-slate-500">Entre com seus dados do Gov.br ou local.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition-all disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Acessar Conta"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Não tem conta? <a href="#" className="font-bold text-blue-600 hover:underline">Cadastre-se</a>
        </div>
      </div>
    </main>
  );
}