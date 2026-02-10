import { LucideIcon } from "lucide-react";
import Link from "next/link"; // Importamos o Link

interface ServiceProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string; // Nova propriedade para o link
}

export default function ServiceCard({ title, description, icon: Icon, href }: ServiceProps) {
  return (
    <Link href={href} className="block"> 
      <div className="group h-full cursor-pointer rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-blue-100">
        <div className="mb-4 inline-block rounded-lg bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
    </Link>
  );
}