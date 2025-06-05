import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  GraduationCap, 
  Cog, 
  CheckCircle
} from 'lucide-react';

const featuresData = [
  {
    icon: MessageSquare,
    title: "Asistente RAG Informativo",
    description: "Para resolver preguntas frecuentes, buscar documentos, políticas, procedimientos y más.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: GraduationCap,
    title: "Asistente RAG Educativo",
    description: "Tutor IA basado en tus cursos, transcripciones de vídeo y material didáctico. Ideal para escuelas de formación o academias online.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Cog,
    title: "Automatizaciones Inteligentes",
    description: "Automatizamos tareas repetitivas con IA + n8n: generación de informes, gestión de leads, email follow-ups…",
    color: "from-green-500 to-emerald-500"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 relative">
      <div className="section-divider mb-20"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Soluciones a tu medida</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformamos tu conocimiento en asistentes inteligentes que trabajan 24/7 para tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="feature-card glass-effect rounded-2xl p-8 text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              
              <div className="mt-6">
                <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;