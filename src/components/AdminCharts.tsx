"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#EF4444"];

export default function AdminCharts() {
  const [dadosStatus, setDadosStatus] = useState<any[]>([]);
  const [dadosServico, setDadosServico] = useState<any[]>([]);

  useEffect(() => {
    const carregarEstatisticas = async () => {
      const { data } = await supabase.from("protocolos").select("status, servico");

      if (data) {
        // 1. Processar Pizza
        const statusCount = data.reduce((acc: any, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {});
        setDadosStatus(Object.keys(statusCount).map((key) => ({ name: key.toUpperCase(), value: statusCount[key] })));

        // 2. Processar Barras
        const servicoCount = data.reduce((acc: any, curr) => {
          acc[curr.servico] = (acc[curr.servico] || 0) + 1;
          return acc;
        }, {});
        setDadosServico(Object.keys(servicoCount).map((key) => ({ name: key, total: servicoCount[key] })));
      }
    };
    carregarEstatisticas();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Gráfico 1: Status */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Eficiência da Gestão</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dadosStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {dadosStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Demandas */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Maiores Demandas</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosServico}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}