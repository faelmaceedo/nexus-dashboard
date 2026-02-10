import AdminCharts from "@/components/AdminCharts";
import AdminStats from "@/components/AdminStats"; // <--- Importamos o novo cérebro

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Visão Geral</h1>

      {/* 1. CARDS INTELIGENTES (Conectados ao Banco) */}
      <AdminStats />

      {/* 2. GRÁFICOS INTELIGENTES */}
      <AdminCharts />

      {/* 3. RODAPÉ SIMPLES */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Atalho Rápido</h3>
        </div>
        <div className="p-8 text-center">
            <p className="text-slate-500 mb-4">Para gerenciar, aprovar ou ver detalhes dos chamados, acesse a área dedicada.</p>
            <a href="/admin/protocolos" className="inline-block px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
              Gerenciar Protocolos →
            </a>
        </div>
      </div>
    </div>
  );
}