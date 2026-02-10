"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
            Sua cidade, mais <span className="text-blue-600">inteligente.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Acesse serviços públicos de forma simples e rápida.
          </p>
        </motion.div>
      </div>
    </section>
  );
}