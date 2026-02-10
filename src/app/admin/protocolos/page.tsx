"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Search, RefreshCcw, Eye, CheckCircle } from "lucide-react";
import Link from "next/link"; // Importante para o Passo B

interface Protocolo {
  id: string;
  cidadao: string;
  servico: string;
  status: string;
  created_at: string;
}

export default function ProtocolosPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);

  const buscarProtocolos = async () => {
    const { data } = await supabase
      .from('protocolos')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProtocolos(data);
    setLoading(false);
  };

  useEffect(() => {
    buscarProtocolos();

    // 📡 MÁGICA DO REALTIME: Escuta mudanças no banco
    const canal = supabase
      .channel('tabela-protocolos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'protocolos' },
        (payload) => {
          console.log('Mudança detectada!', payload);
          buscarProtocolos(); // Recarrega os dados ao detectar mudança
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(canal); };
  }, []);

  const aprovarProtocolo = async (id: string) => {
    await supabase.from('protocolos').update({ status: 'concluido' }).eq('id', id);
  };

  const statusColor = (status: string) => {
    switch(status) {
      case "concluido": return "bg-green-100 text-green-700";
      case "pendente": return "bg-amber-100 text-amber-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Protocolos (Ao Vivo 🔴)</h1>
          <p className="text-slate-500">Monitoramento em tempo real.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Conectando ao satélite...</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-medium">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Cidadão</th>
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {protocolos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors animate-in fade-in">
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="px-6 py-4">{item.cidadao}</td>
                  <td className="px-6 py-4">{item.servico}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status === "pendente" && (
                        <button onClick={() => aprovarProtocolo(item.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <CheckCircle size={20} />
                        </button>
                      )}
                      
                      {/* Link para o Passo B */}
                      <Link href={`/admin/protocolos/${item.id}`}>
                        <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600 rounded-lg">
                          <Eye size={20} />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}