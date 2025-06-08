import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  GraduationCap, 
  Cog, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

const featuresData = [
  {
    icon: MessageSquare,
    title: "Asistente RAG Informativo",
    description: "Para resolver preguntas frecuentes, buscar documentos, políticas, procedimientos y más.",
    gradient: "from-primary-500 to-accent-500",
    hoverGradient: "from-primary-400 to-accent-400",
    benefits: [
      "Respuestas instantáneas 24/7",
      "Integración con sistemas existentes",
      "Reducción del 85% en consultas repetitivas"
    ],
    stats: { number: "85%", label: "Menos consultas" }
  },
  {
    icon: GraduationCap,
    title: "Asistente RAG Educativo",
    description: "Tutor IA basado en tus cursos, transcripciones de vídeo y material didáctico. Ideal para escuelas de formación o academias online.",
    gradient: "from-accent-500 to-primary-500",
    hoverGradient: "from-accent-400 to-primary-400",
    benefits: [
      "Tutoría personalizada e interactiva",
      "Procesamiento de contenido audiovisual",
      "Experiencia de aprendizaje mejorada"
    ],
    stats: { number: "3x", label: "Mejor retención" }
  },
  {
    icon: Cog,
    title: "Automatizaciones Inteligentes",
    description: "Automatizamos tareas repetitivas con IA + n8n: generación de informes, gestión de leads, email follow-ups…",
    gradient: "from-primary-600 to-accent-400",
    hoverGradient: "from-primary-500 to-accent-300",
    benefits: [
      "Flujos de trabajo automatizados",
      "Integración con herramientas existentes",
      "ROI inmediato en productividad"
    ],
    stats: { number: "70%", label: "Tiempo ahorrado" }
  }
];

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Fondo con gradiente y elementos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900"></div>
      
      {/* Orbes de fondo animados */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Separador con animación */}
      <motion.div 
        className="section-divider mb-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge superior */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 rounded-full px-4 py-2 mb-6"
          >
            <Target className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Soluciones Personalizadas</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Soluciones a tu medida</span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Transformamos tu conocimiento en asistentes inteligentes que trabajan 24/7 para tu negocio
          </p>
        </motion.div>

        {/* Grid de características mejorado */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Efecto de resplandor en hover */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.hoverGradient} rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`}
                animate={{
                  opacity: hoveredCard === index ? 0.4 : 0,
                }}
              />

              {/* Tarjeta principal */}
              <motion.div
                className="relative feature-card glass-effect rounded-2xl p-8 h-full flex flex-col"
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Icono con animación mejorada */}
                <motion.div 
                  className="relative mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-2xl relative overflow-hidden`}>
                    {/* Efecto de brillo en el icono */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                    <feature.icon className="w-10 h-10 text-white relative z-10" />
                  </div>
                  
                  {/* Partículas alrededor del icono */}
                  {hoveredCard === index && (
                    <div className="absolute inset-0">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-accent-400 rounded-full"
                          style={{
                            left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                            top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
                
                {/* Contenido */}
                <div className="text-center flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-neutral-300 leading-relaxed mb-6">{feature.description}</p>
                  
                  {/* Lista de beneficios */}
                  <div className="space-y-3 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefitIndex}
                        className="flex items-center gap-3 text-sm text-neutral-400"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (benefitIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Estadística destacada */}
                <motion.div 
                  className="mt-auto pt-6 border-t border-white/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold gradient-text">{feature.stats.number}</div>
                      <div className="text-xs text-neutral-400">{feature.stats.label}</div>
                    </div>
                    <motion.div
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="w-5 h-5 text-accent-400" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Indicador de hover */}
                <motion.div
                  className="absolute bottom-4 right-4 w-2 h-2 bg-accent-400 rounded-full"
                  animate={{
                    scale: hoveredCard === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredCard === index ? [1, 0.5, 1] : 0.3,
                  }}
                  transition={{ duration: 1, repeat: hoveredCard === index ? Infinity : 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Sección inferior con estadísticas globales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "24/7", label: "Disponibilidad" },
              { number: "< 2s", label: "Tiempo de respuesta" },
              { number: "99.9%", label: "Precisión" },
              { number: "0", label: "Alucinaciones" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  delay: 0.8 + (index * 0.1)
                }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-neutral-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Partículas flotantes de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;