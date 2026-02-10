import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import { FileText, CreditCard, ShieldCheck, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-3xl font-bold text-slate-900">Serviços Populares</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard 
              icon={FileText} 
              title="Processos" 
              description="Consulte o andamento."
              href="/servicos/processos" 
            />
            <ServiceCard 
              icon={CreditCard} 
              title="Benefícios" 
              description="Extratos e saldos."
              href="/servicos/beneficios"
            />
            <ServiceCard 
              icon={ShieldCheck} 
              title="Segurança" 
              description="Boletim online."
              href="/servicos/seguranca"
            />
            <ServiceCard 
              icon={HelpCircle} 
              title="Ouvidoria" 
              description="Registre sua dúvida."
              href="/servicos/ouvidoria"
            />
          </div>
        </div>
      </section>
    </main>
  );
}