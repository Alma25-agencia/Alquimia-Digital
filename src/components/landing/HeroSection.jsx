import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import {
  Brain,
  Calendar,
  ChevronDown,
  Zap,
  Sparkles,
  Bot
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// IMPORTACIÓN DEL LOGO - ASEGÚRATE DE QUE LA RUTA Y EL NOMBRE SEAN CORRECTOS (.png)
import logoAlquimiaDigital from '../../assets/images/Untitled.png'; // Cambia 'Untitled.png' si lo guardaste con otro nombre

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const { toast } = useToast();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

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
    presupuesto_estimado: '',
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.descripcion_solicitud || !formData.presupuesto_estimado) {
      toast({
        title: "Campos obligatorios",
        description: "Por favor, completa Nombre, Email, Descripción y Presupuesto.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('leads') // Asumiendo que usas la tabla 'leads'
        .insert([
          {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            email: formData.email,
            telefono: formData.telefono,
            empresa: formData.empresa,
            descripcion_solicitud: formData.descripcion_solicitud,
            tipo_negocio: formData.tipo_negocio,
            presupuesto_estimado: formData.presupuesto_estimado,
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "¡Demo solicitada! 🚀",
        description: "Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas.",
      });
      setIsDemoFormOpen(false); // Cierra el modal al éxito
      setFormData({ // Resetea el formulario
        nombre: '', apellidos: '', email: '', telefono: '', empresa: '',
        descripcion_solicitud: '', tipo_negocio: '', presupuesto_estimado: '',
      });
    } catch (error) {
      toast({
        title: "Error al solicitar demo",
        description: "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo. Asegúrate de que todos los campos sean correctos.",
        variant: "destructive",
      });
      console.error('Error inserting demo request:', error);
    }
  };

  // MODIFICADO: Esta función ahora redirige a Calendly en una nueva pestaña
  const handleScheduleMeeting = () => {
    const calendlyUrl = 'https://calendly.com/albertam2886/new-meeting'; // <-- TU URL ESPECÍFICA DE CALENDLY AQUÍ!
    window.open(calendlyUrl, '_blank'); // Abre en una nueva pestaña

    toast({
      title: "Agendar Reunión 📅",
      description: "Serás redirigido a Calendly para elegir tu horario.",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: y1 }}
      >
        {/* Orbes de fondo con efecto de desenfoque - SOLO CAMBIO DE COLORES */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.img
              src={logoAlquimiaDigital}
              alt="Alquimia Digital Logo"
              className="mx-auto lg:mx-0 mb-4 h-48 md:h-64 lg:h-80 w-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Tu conocimiento,</span>
              <br />
              <span className="text-white">disponible</span>
              <br />
              <span className="gradient-text">24/7 con IA</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Creamos asistentes personalizados con IA que entienden tu negocio,
              responden dudas y automatizan tareas, <span className="text-accent-400 font-semibold">sin alucinar</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* BOTÓN "SOLICITA UNA DEMO PERSONALIZADA" - SOLO CAMBIO DE COLORES */}
              <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="xl"
                    className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow group"
                  >
                    <Zap className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                    Solicita una demo personalizada
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-2xl gradient-text">Solicita tu Demo Personalizada</DialogTitle>
                    <DialogDescription className="text-gray-400">
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white min-h-[80px]"
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
                        className="col-span-3 bg-gray-700 border-gray-600 text-white"
                        placeholder="Ej: E-commerce, Educación, Consultoría..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="presupuesto_estimado" className="text-right">
                        Presupuesto *
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange(value, 'presupuesto_estimado')}
                        value={formData.presupuesto_estimado}
                        required
                      >
                        <SelectTrigger className="col-span-3 bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="250-1000">250 € a 1.000 € (+IVA)</SelectItem>
                          <SelectItem value="1000-2500">1.000 € a 2.500 € (+IVA)</SelectItem>
                          <SelectItem value="2500-5000">2.500 € a 5.000 € (+IVA)</SelectItem>
                          <SelectItem value="5000+">Más de 5.000 € (+IVA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter className="mt-4">
                      <Button type="submit" className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white">
                        Enviar Solicitud
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* BOTÓN "AGENDA UNA REUNIÓN" - SOLO CAMBIO DE COLORES */}
              <Button
                onClick={handleScheduleMeeting}
                size="xl"
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow group"
              >
                <Calendar className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:rotate-6" />
                Agenda una reunión
              </Button>
            </div>
          </motion.div>

          {/* COLUMNA DERECHA: DEMO DEL CHAT - MANTENIENDO TODOS LOS EFECTOS ORIGINALES */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:flex justify-center items-center"
            style={{ y: y2 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Fondo oscuro y borde del chat para un mejor contraste - MANTENIENDO glass-effect y floating-animation */}
              <div className="glass-effect rounded-2xl p-6 floating-animation bg-gray-900 border border-gray-700 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">Asistente IA</span>
                  <div className="ml-auto w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  {/* Mensaje del usuario - MANTENIENDO chat-bubble y user-message */}
                  <div className="chat-bubble user-message bg-accent-600 text-white p-3 rounded-lg ml-auto">
                    <p className="text-sm text-left">¿Cuál es nuestra política de devoluciones?</p>
                  </div>

                  {/* Mensaje del asistente - MANTENIENDO chat-bubble y assistant-message */}
                  <div className="chat-bubble assistant-message bg-primary-600 text-white p-3 rounded-lg mr-auto">
                    <p className="text-sm text-left">Según nuestras políticas, tienes 30 días para solicitar una devolución. Te ayudo con el proceso...</p>
                  </div>

                  <div className="flex items-center gap-2 text-accent-400">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Icono Brain flotante - SOLO CAMBIO DE COLORES */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <ChevronDown className="w-6 h-6 text-accent-400" />
      </motion.div>
    </section>
  );
};

export default HeroSection;