"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Importamos o cérebro
import { useRouter } from "next/navigation"; // Para redirecionar
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // 🔐 Tenta fazer login no Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("E-mail ou senha incorretos.");
      setLoading(false);
    } else {
      // Sucesso! Redireciona para o Admin
      router.push("/admin");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-slate-100">
        <Link href="/" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Acesso Restrito</h1>
          <p className="text-slate-500">Área exclusiva para servidores públicos.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">E-mail Oficial</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexus.gov" 
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {errorMsg && (
             <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
               {errorMsg}
             </div>
          )}

          <button 
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white hover:bg-slate-800 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Acessar Sistema"}
          </button>
        </form>
      </div>
    </main>
  );
}