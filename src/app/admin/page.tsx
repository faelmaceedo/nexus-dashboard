import { Users, FileText, AlertCircle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h1>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Total de Protocolos</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">1,248</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><TrendingUp size={12}/> +12% esse mês</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Cidadãos Ativos</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Users size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">8,502</p>
          <p className="text-xs text-slate-400 mt-1">Cadastrados na base</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-500 font-medium">Pendentes</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertCircle size={20} /></div>
          </div>
          <p className="text-3xl font-bold text-slate-900">42</p>
          <p className="text-xs text-red-500 mt-1">Requer atenção urgente</p>
        </div>
      </div>

      {/* Tabela Recente (Simples) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Últimas Solicitações</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-900 font-medium">
            <tr>
              <th className="px-6 py-4">Protocolo</th>
              <th className="px-6 py-4">Serviço</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-6 py-4 font-mono">#NX-8821</td>
              <td className="px-6 py-4">Iluminação Pública</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Pendente</span></td>
              <td className="px-6 py-4">Hoje, 10:30</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono">#NX-8820</td>
              <td className="px-6 py-4">IPTU 2 Via</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Concluído</span></td>
              <td className="px-6 py-4">Ontem, 15:45</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono">#NX-8819</td>
              <td className="px-6 py-4">Ouvidoria</td>
              <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Em Análise</span></td>
              <td className="px-6 py-4">Ontem, 09:12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}