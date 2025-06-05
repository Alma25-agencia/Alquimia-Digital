import { Brain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-purple-500/20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Alquimia Digital</span>
          </div>

          <p className="text-gray-400 mb-6">
            Impulsando tu negocio con automatización de procesos mediante inteligencia artificial.
          </p>

          {/* Sección para logos de tecnologías clave */}
          <div className="mt-10 mb-8">
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Tecnologías clave que nos impulsan:</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Make Logo */}
              <a href="https://www.make.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Make">
                <img
                  src="/images/logos/make-color.png"
                  alt="Logo de Make"
                  width={80}
                  height={40}
                  className="h-9 md:h-11 object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                />
              </a>

              {/* n8n Logo */}
              <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer" aria-label="Visitar n8n">
                <img
                  src="/images/logos/n8n-color.png"
                  alt="Logo de n8n"
                  width={80}
                  height={40}
                  className="h-9 md:h-11 object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                />
              </a>

              {/* Anthropic Logo (o Claude) */}
              <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Anthropic">
                <img
                  src="/images/logos/anthropic.png"
                  alt="Logo de Anthropic"
                  width={80}
                  height={40}
                  className="h-9 md:h-11 object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                />
              </a>

              {/* OpenAI Logo */}
              <a href="https://openai.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar OpenAI">
                <img
                  src="/images/logos/openai.png"
                  alt="Logo de OpenAI"
                  width={80}
                  height={40}
                  className="h-9 md:h-11 object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                />
              </a>

              {/* Google Gemini Logo */}
              <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" aria-label="Visitar Google Gemini">
                <img
                  src="/images/logos/gemini-color.png"
                  alt="Logo de Google Gemini"
                  width={80}
                  height={40}
                  className="h-9 md:h-11 object-contain filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300"
                />
              </a>

            </div>
          </div>
          {/* Fin de la sección de logos */}
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 border-t border-gray-700/30 pt-8 mt-8">
            <span>© {new Date().getFullYear()} Alquimia Digital</span>
            <span>•</span>
            <span>Asistentes IA Personalizados</span>
            <span>•</span>
            <span>Automatización Inteligente</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;