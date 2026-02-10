"use client";
import { useState } from "react";
import { CheckCircle, Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Importamos o cérebro

export default function ServiceForm({ serviceName }: { serviceName: string }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [protocoloId, setProtocoloId] = useState("");

  // Estados do formulário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Gera um ID aleatório tipo "NX-1234"
    const novoId = `NX-${Math.floor(1000 + Math.random() * 9000)}`;

    // 🚀 O ENVIO REAL PARA O SUPABASE
    const { error } = await supabase
      .from('protocolos')
      .insert([
        { 
          id: novoId, 
          cidadao: nome, 
          servico: serviceName, 
          descricao: desc,
          status: 'pendente' 
        },
      ]);

    if (error) {
      alert("Erro ao enviar: " + error.message);
    } else {
      setProtocoloId(novoId);
      setStep(2); // Vai para a tela de sucesso
    }
    setLoading(false);
  };

  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl bg-green-50 p-10 text-center border border-green-100 animate-in fade-in zoom-in">
        <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
        <h3 className="text-2xl font-bold text-green-800">Solicitação Gravada!</h3>
        <p className="mt-2 text-green-700">Seu protocolo oficial é: <strong className="text-xl">{protocoloId}</strong></p>
        <p className="text-sm text-green-600 mt-1">Os dados já estão no sistema do governo.</p>
        <button 
          onClick={() => { setStep(1); setNome(""); setDesc(""); }}
          className="mt-6 text-sm font-bold text-green-800 underline hover:text-green-900"
        >
          Nova solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-slate-50 p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">
        Preencha os dados para {serviceName}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
          <input 
            required 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">CPF / Matrícula</label>
          <input 
            required 
            type="text" 
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00" 
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Descrição da Solicitação</label>
        <textarea 
          required 
          rows={4} 
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-70"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? "Enviando..." : "Enviar Protocolo Oficial"}
      </button>
    </form>
  );
}