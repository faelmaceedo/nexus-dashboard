import Navbar from "@/components/Navbar";
import ServiceForm from "@/components/ServiceForm"; // Importamos o form
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const dadosServicos = {
  processos: { title: "Consulta de Processos", desc: "Acompanhe o trâmite dos seus documentos oficiais." },
  beneficios: { title: "Portal de Benefícios", desc: "Consulte saldos, extratos e datas de pagamento." },
  seguranca: { title: "Segurança Pública", desc: "Registre ocorrências e solicite patrulhamento." },
  ouvidoria: { title: "Ouvidoria Digital", desc: "Envie sugestões, reclamações ou elogios." },
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const servico = dadosServicos[params.slug as keyof typeof dadosServicos];

  if (!servico) {
    return <div className="p-10 text-center">Serviço não encontrado. <Link href="/" className="text-blue-500 underline">Voltar</Link></div>;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/" className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> Voltar para Home
        </Link>
        
        <div className="rounded-3xl bg-white p-8 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{servico.title}</h1>
          <p className="mt-2 text-lg text-slate-600 mb-8">{servico.desc}</p>
          
          {/* Aqui entra nosso Formulário Real */}
          <ServiceForm serviceName={servico.title} />
          
        </div>
      </div>
    </main>
  );
}