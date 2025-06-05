import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  FileText,
  TrendingUp
} from 'lucide-react';

const useCasesData = [
  {
    type: "Escuela de formación",
    benefit: "Tutor IA para alumnos, menos soporte manual",
    icon: GraduationCap
  },
  {
    type: "Consultora o Pyme",
    benefit: "Asistente que responde dudas y organiza documentos",
    icon: FileText
  },
  {
    type: "Agencia o coach",
    benefit: "Automatización de atención y seguimiento con IA",
    icon: TrendingUp
  }
];

const UseCasesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Casos de uso concretos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre cómo diferentes tipos de negocio aprovechan nuestros asistentes IA
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-500/20">
              {useCasesData.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 text-center hover:bg-purple-500/5 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{useCase.type}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{useCase.benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;