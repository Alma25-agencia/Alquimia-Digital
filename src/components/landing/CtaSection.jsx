import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { 
  ArrowRight, 
  Clock,
  Target,
  Zap,
  Sparkles,
  CheckCircle
} from 'lucide-react';

// Importaciones para el Dialog (Modal) - NECESARIAS PARA EL FORMULARIO DE DEMO
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CtaSection = () => {
  const { toast } = useToast();

  // Estado para el formulario de la demo
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    empresa: '',
    descripcion_solicitud: '',
    tipo_negocio: '',
    plan_interesado: 'CTA Section - Demo General',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const openDemoModal = () => {
    setIsDemoFormOpen(true);
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.descripcion_solicitud) {
      toast({
        title: "Campos obligatorios",
        description: "Por favor, completa Nombre, Email y Descripción.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            email: formData.email,
            telefono: formData.telefono,
            empresa: formData.empresa,
            descripcion_solicitud: formData.descripcion_solicitud,
            tipo_negocio: formData.tipo_negocio,
            plan_interesado: formData.plan_interesado,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Demo solicitada! 🚀",
        description: "Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas.",
      });
      setIsDemoFormOpen(false);
      setFormData({
        nombre: '', apellidos: '', email: '', telefono: '', empresa: '',
        descripcion_solicitud: '', tipo_negocio: '', plan_interesado: 'CTA Section - Demo General',
      });
    } catch (error) {
      toast({
        title: "Error al solicitar demo",
        description: "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error('Error inserting demo request:', error);
    }
  };

  // Datos para las estadísticas animadas
  const stats = [
    { number: "24h", label: "Tiempo de respuesta", icon: Clock },
    { number: "85%", label: "Reducción en consultas", icon: Target },
    { number: "3x", label: "Más conversiones", icon: Sparkles }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con gradiente mejorado y nueva paleta */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-primary-800/20 to-accent-900/30"></div>
      
      {/* Orbes de fondo animados con nueva paleta */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge superior animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 rounded-full px-4 py-2 mb-8"
          >
            <CheckCircle className="w-4 h-4 text-accent-400" />
            <span className="text-accent-400 text-sm font-medium">Prueba sin compromiso • 100% personalizado</span>
          </motion.div>

          {/* Título principal con animación de palabras */}
          <div className="mb-6">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              ¿Listo para{" "}
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ahorrar tiempo
              </motion.span>{" "}
              y
              <br />
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                multiplicar el valor
              </motion.span>{" "}
              de tu contenido?
            </motion.h2>
          </div>
          
          {/* Subtítulo con animación */}
          <motion.p 
            className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Únete a empresas que ya están transformando su atención al cliente y procesos internos con IA
          </motion.p>

          {/* Estadísticas animadas */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200,
                    delay: 0.8 + (index * 0.1)
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-neutral-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Botón principal mejorado */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button 
                    onClick={openDemoModal}
                    size="xl"
                    className="relative bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-accent-500/25 transition-all duration-300 pulse-glow group overflow-hidden"
                  >
                    {/* Efecto de brillo animado */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                    <Zap className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:scale-110 relative z-10" />
                    <span className="relative z-10">Agenda una demo ahora</span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[425px] bg-neutral-800 text-white border-neutral-700">
                <DialogHeader>
                  <DialogTitle className="text-2xl gradient-text">Solicita tu Demo Personalizada</DialogTitle>
                  <DialogDescription className="text-neutral-400">
                    Completa el formulario para que podamos preparar una demo a tu medida.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleDemoSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nombre" className="text-right">
                      Nombre *
                    </Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="apellidos" className="text-right">
                      Apellidos
                    </Label>
                    <Input
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="telefono" className="text-right">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="empresa" className="text-right">
                      Empresa
                    </Label>
                    <Input
                      id="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="descripcion_solicitud" className="text-right pt-2">
                      Descripción *
                    </Label>
                    <Textarea
                      id="descripcion_solicitud"
                      value={formData.descripcion_solicitud}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white min-h-[80px] focus:border-accent-500"
                      placeholder="Describe brevemente qué necesitas y para qué tipo de negocio..."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="tipo_negocio" className="text-right">
                      Tipo de Negocio
                    </Label>
                    <Input
                      id="tipo_negocio"
                      value={formData.tipo_negocio}
                      onChange={handleInputChange}
                      className="col-span-3 bg-neutral-700 border-neutral-600 text-white focus:border-accent-500"
                      placeholder="Ej: E-commerce, Educación, Consultoría..."
                    />
                  </div>
                  <Input
                    id="plan_interesado"
                    type="hidden"
                    value={formData.plan_interesado}
                    readOnly
                  />
                  <DialogFooter className="mt-4">
                    <Button type="submit" className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white">
                      Enviar Solicitud
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            {/* Información adicional mejorada */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2 text-neutral-400 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-accent-400" />
                <span className="text-sm">Respuesta en 24 horas</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CtaSection;