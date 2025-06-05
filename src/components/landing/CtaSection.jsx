import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { 
  ArrowRight, 
  Clock,
  Target,
  Zap // Asegúrate de importar Zap para el icono del botón
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
// No necesitamos Selects aquí ya que eliminamos Presupuesto

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
    // Ya no incluimos presupuesto_estimado
    plan_interesado: 'CTA Section - Demo General', // Valor por defecto para esta sección
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // handleSelectChange ya no es necesario aquí

  // Función para abrir el modal de demo
  const openDemoModal = () => {
    setIsDemoFormOpen(true);
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
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
            // presupuesto_estimado ya no se incluye
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
      setIsDemoFormOpen(false); // Cierra el modal al éxito
      setFormData({ // Resetea el formulario
        nombre: '', apellidos: '', email: '', telefono: '', empresa: '',
        descripcion_solicitud: '', tipo_negocio: '', plan_interesado: 'CTA Section - Demo General',
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

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="gradient-text">ahorrar tiempo</span> y 
            <br />
            <span className="gradient-text">multiplicar el valor</span> de tu contenido?
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a empresas que ya están transformando su atención al cliente y procesos internos con IA
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* BOTÓN "AGENDA UNA DEMO AHORA" - AHORA ABRE UN DIALOG */}
            <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={openDemoModal} // Llama a la función para abrir el modal
                  size="xl" // Asegura el tamaño grande
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow group"
                  // Aseguramos que la variante sea 'default' para usar el gradiente
                  variant="default"
                >
                  <Zap className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:scale-110" /> {/* Usamos Zap como en HeroSection */}
                  Agenda una demo ahora
                  {/* Eliminamos el ArrowRight aquí si no lo quieres */}
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
                  {/* Campo oculto para el plan interesado */}
                  <Input
                    id="plan_interesado"
                    type="hidden"
                    value={formData.plan_interesado}
                    readOnly
                  />
                  <DialogFooter className="mt-4">
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Enviar Solicitud
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Respuesta en 24 horas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;