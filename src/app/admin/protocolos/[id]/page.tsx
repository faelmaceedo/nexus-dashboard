"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, User, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default function DetalheProtocolo({ params }: { params: { id: string } }) {
  const [protocolo, setProtocolo] = useState<any>(null);

  useEffect(() => {
    const carregar = async () => {
      const { data } = await supabase.from('protocolos').select('*').eq('id', params.id).single();
      setProtocolo(data);
    };
    carregar();
  }, [params.id]);

  if (!protocolo) return <div className="p-10">Carregando detalhes...</div>;

  return (
    <div className="max-w-3xl">
      <Link href="/admin/protocolos" className="flex items-center gap-2 text-slate-500 mb-6 hover:text-blue-600">
        <ArrowLeft size={18} /> Voltar
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Protocolo</span>
            <h1 className="text-3xl font-bold text-slate-900">{protocolo.id}</h1>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${protocolo.status === 'concluido' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {protocolo.status}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg text-slate-400"><User /></div>
            <div>
              <p className="text-xs text-slate-500">Solicitante</p>
              <p className="font-bold text-slate-900">{protocolo.cidadao}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="p-2 bg-white rounded-lg text-slate-400"><Calendar /></div>
            <div>
              <p className="text-xs text-slate-500">Data de Abertura</p>
              <p className="font-bold text-slate-900">{new Date(protocolo.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-3">
            <FileText size={18} className="text-blue-500" /> 
            Descrição da Solicitação
          </h3>
          <div className="p-4 bg-slate-50 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
            {protocolo.descricao || "Sem descrição informada."}
          </div>
        </div>

        {/* Área de Ação do Governo */}
        <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Imprimir Ficha</button>
            <button className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50">Encaminhar Setor</button>
        </div>
      </div>
    </div>
  );
}