import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqsData = [
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo necesitas tus documentos, cursos o material de conocimiento en formato digital. Nosotros nos encargamos de todo el proceso técnico de implementación."
  },
  {
    question: "¿Qué tipo de contenidos puede entender el asistente?",
    answer: "Nuestros asistentes pueden procesar PDFs, documentos de texto, transcripciones de vídeo, páginas web, bases de conocimiento y prácticamente cualquier contenido textual."
  },
  {
    question: "¿Cuánto tarda la implementación?",
    answer: "El tiempo de implementación varía entre 2-4 semanas dependiendo de la complejidad y cantidad de contenido. Te mantenemos informado en cada paso del proceso."
  },
  {
    question: "¿Puedo probarlo antes de contratar?",
    answer: "¡Por supuesto! Ofrecemos una demo gratuita personalizada donde podrás ver cómo funcionaría el asistente con una muestra de tu contenido."
  }
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Preguntas frecuentes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros asistentes IA
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqsData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="faq-item glass-effect rounded-xl mb-4 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-500/5 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: openFaq === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;