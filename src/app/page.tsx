import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import Image from "next/image"; // Importante para a imagem

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* --- HERO SECTION COM IMAGEM REALISTA --- */}
      {/* --- HERO SECTION: VERSÃO CINEMATOGRÁFICA (Fundo Total) --- */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-slate-900">
        
        {/* 1. A IMAGEM DE FUNDO (Background) */}
        <Image
          src="/hero-city.png" // <--- Confirme se o nome do arquivo está certo na pasta public
          alt="Cidade Inteligente Nexus"
          fill={true} // Isso faz a imagem esticar para cobrir tudo
          priority
          className="object-cover object-center -z-20" // -z-20 garante que fique atrás de tudo
        />

        {/* 2. A MÁSCARA ESCURA (Overlay) */}
        {/* Sem isso, o texto fica impossível de ler se a imagem for clara */}
        <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent -z-10"></div>

        {/* 3. O CONTEÚDO (Texto e Botões) */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
            
            {/* Badge de "Novidade" */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-md border border-blue-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Sistema Online 24h
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg">
              A Cidade do Futuro,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Na Palma da Sua Mão.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Acesse serviços públicos, acompanhe obras e abra protocolos com a transparência que você merece. Bem-vindo ao Nexus Gov.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link 
                href="/novo-protocolo" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-500 hover:scale-105 shadow-xl shadow-blue-900/50 backdrop-blur-sm"
              >
                Abrir Protocolo <ArrowRight size={20} />
              </Link>
              <Link 
                href="#servicos" 
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50"
              >
                Ver Serviços
              </Link>
            </div>

          </div>
        </div>

        {/* Detalhe estético: Uma "onda" ou degradê no final para conectar com a próxima seção */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* --- SEÇÃO DE SERVIÇOS (Mantivemos igual) --- */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Serviços Digitais</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Resolva suas pendências sem sair de casa.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <ServiceCard 
              title="Iluminação Pública" 
              icon={Clock} // Passando o ícone direto se seu componente esperar assim, ou <Clock /> dependendo da versão
              description="Informe postes apagados ou lâmpadas queimadas na sua rua." // Mudei de desc para description
              href="/servicos/iluminacao" // Mudei de link para href
            />
            <ServiceCard 
              title="Zeladoria Urbana" 
              icon={ShieldCheck}
              description="Solicite limpeza, poda de árvores ou tapa-buracos."
              href="/servicos/zeladoria"
            />
            <ServiceCard 
              title="Consulta de Processos" 
              icon={FileText}
              description="Acompanhe o andamento dos seus protocolos abertos."
              href="/admin/protocolos" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}