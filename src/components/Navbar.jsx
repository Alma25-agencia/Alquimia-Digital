import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-md py-4 px-4 sm:px-8 transition-all duration-300"
    >
      <div className="flex justify-end items-center max-w-7xl mx-auto">
        {/* Menú hamburguesa */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Enlaces */}
        <div className={`flex-col sm:flex-row sm:flex space-y-6 sm:space-y-0 sm:space-x-10 items-center absolute sm:static top-full left-0 w-full sm:w-auto transition-all duration-300 z-40 bg-transparent ${open ? 'flex' : 'hidden sm:flex'}`}>
          <a href="#inicio" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Inicio</a>
          <a href="#soluciones" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Soluciones a tu medida</a>
          <a href="#casos" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Casos de Uso</a>
          <a href="#precios" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Pricing</a>
          <a href="#contacto" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Contacto</a>
          <a href="#faq" className="text-white font-medium hover:text-[#2563EB] transition py-2 sm:py-0 w-full sm:w-auto text-center">Faq</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 