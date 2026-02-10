"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, FileText, AlertCircle, TrendingUp } from "lucide-react";

export default function AdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    cidadaos: 0,
    pendentes: 0,
    taxaSucesso: 0
  });

  const calcularEstatisticas = async () => {
    const { data } = await supabase.from("protocolos").select("status, cidadao");
    
    if (data) {
      const total = data.length;
      const pendentes = data.filter(p => p.status === 'pendente').length;
      const concluidos = data.filter(p => p.status === 'concluido').length;
      const nomesUnicos = new Set(data.map(p => p.cidadao)).size;
      const taxa = total > 0 ? Math.round((concluidos / total) * 100) : 0;

      setStats({ total, cidadaos: nomesUnicos, pendentes, taxaSucesso: taxa });
    }
  };

  useEffect(() => {
    calcularEstatisticas();
    const canal = supabase
      .channel('stats-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'protocolos' }, () => {
        calcularEstatisticas();
      })
      .subscribe();
    return () => { supabase.removeChannel(canal); };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Total de Protocolos</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Cidadãos Únicos</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.cidadaos}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Pendentes</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.pendentes}</p>
          <p className="text-xs text-red-500 mt-1 font-medium">Requer atenção</p>
        </div>
        
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Eficiência</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.taxaSucesso}%</p>
        </div>
    </div>
  );
}