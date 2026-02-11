"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import Image from "next/image"; // Importante
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Acesso negado. Verifique suas credenciais.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
      
      {/* --- FUNDO REALISTA (Background) --- */}
      {/* A imagem cobre tudo (fill) e fica atrás (-z-10) */}
      <Image
        src="/login-bg.jpg"
        alt="Nexus Security Background"
        fill={true}
        priority
        className="absolute inset-0 -z-10 object-cover"
      />
      {/* Máscara escura para garantir leitura do texto */}
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] -z-10"></div>

      {/* --- CARD DE LOGIN --- */}
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl border border-white/20 backdrop-blur-md animate-in fade-in zoom-in duration-500">
        <Link href="/" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft size={16} /> Voltar para o Site
        </Link>
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Acesso Governamental</h1>
          <p className="text-slate-500 text-sm mt-1">Identifique-se para acessar o painel.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">E-mail Oficial</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="servidor@nexus.gov" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-medium"
                required
              />
            </div>
          </div>

          {errorMsg && (
             <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-bold border border-red-100 animate-pulse">
               {errorMsg}
             </div>
          )}

          <button 
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Entrar no Sistema"}
          </button>
        </form>
      </div>
    </main>
  );
}