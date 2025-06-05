import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient'; // <-- ¡HE REVERTIDO ESTA LÍNEA A SU ESTADO ANTERIOR Y CORRECTO!
import { CheckCircle, Star, Shield, Wrench as Tool, Zap } from 'lucide-react';
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

const pricingPlansData = [
  // Tarjeta: Automatización de Procesos
  {
    name: "Automatización de Procesos",
    price: "Presupuesto Personalizado",
    description: "Diseñamos y desarrollamos soluciones a medida para automatizar tus tareas repetitivas, optimizando flujos de trabajo y liberando tiempo para lo que realmente importa en tu negocio.",
    features: [
      "Análisis y diseño de flujos de trabajo personalizados",
      "Integración con tus sistemas existentes (CRM, ERP, etc.)",
      "Automatización de tareas repetitivas (recopilación de datos, informes, email marketing, etc.)",
      "Herramientas clave: Make, n8n"
    ],
    maintenanceNote: "Los costes de mantenimiento se adaptarán a la complejidad y alcance de la solución implementada. Incluye soporte técnico y posibles mejoras.",
    popular: false,
    planIdentifier: "AUTOMATIZACION_PROCESOS",
    hasCustomBudgetOptions: true
  },
  // Tarjetas existentes
  {
    name: "RAG Información General",
    price: "Desde 1.200 €",
    description: "Ideal para empresas que necesitan un asistente IA rápido, preciso y fácil de integrar, que responda preguntas frecuentes y agilice la atención.",
    features: [
      "Configuración completa del flujo RAG con n8n y Qdrant",
      "Integración con tu canal de consulta (Telegram, web, etc.)",
    ],
    maintenanceNote: "Mantenimiento necesario (gestión de tokens, actualizaciones, soporte técnico, etc.) no incluido. Se determinará según las necesidades de cada proyecto.",
    popular: false,
    planIdentifier: "RAG_INICIAL"
  },
  {
    name: "RAG Educativo — Tutor Virtual",
    price: "Desde 2.500 €",
    description: "Para escuelas, academias o formadores que buscan convertir sus contenidos en un asistente personalizado, capaz de transcribir y responder preguntas sobre vídeos y materiales educativos.",
    features: [
      "Procesamiento avanzado de contenido audiovisual (transcripciones + embeddings)",
      "Flujo RAG especializado con capacidad de tutoría interactiva",
    ],
    maintenanceNote: "Mantenimiento necesario (gestión de tokens, actualizaciones, soporte técnico profesional, etc.) no incluido. Se determinará según las necesidades de cada proyecto.",
    popular: false,
    planIdentifier: "RAG_EDUCATIVO"
  }
];

const PricingSection = () => {
  const { toast } = useToast();

  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    empresa: '',
    descripcion_solicitud: '',
    tipo_negocio: '',
    plan_interesado: '',
    presupuesto_estimado: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const openDemoModal = (planName) => {
    setFormData((prev) => ({ ...prev, plan_interesado: planName, presupuesto_estimado: '' }));
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

    if (formData.plan_interesado === "Automatización de Procesos" && !formData.presupuesto_estimado) {
      toast({
        title: "Campo requerido",
        description: "Por favor, selecciona un rango de presupuesto estimado.",
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
      setIsDemoFormOpen(false);
      setFormData({
        nombre: '', apellidos: '', email: '', telefono: '', empresa: '',
        descripcion_solicitud: '', tipo_negocio: '', plan_interesado: '', presupuesto_estimado: '',
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
    <section className="pt-9 pb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Precios transparentes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Soluciones profesionales con precios claros y directos.
          </p>
        </motion.div>

        {/* El contenedor del grid principal debe tener items-stretch para que las tarjetas se estiren */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {pricingPlansData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`
                price-card glass-effect rounded-2xl px-10 pt-2 pb-2 relative flex flex-col
                transform transition-all duration-300 ease-in-out
                hover:scale-[1.03]
                hover:z-10
                ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Más Popular
                  </div>
                </div>
              )}

              {/* === BLOQUE 1: Título del Plan y Precio === */}
              {/* min-h: Asegurarse de que este bloque tenga una altura consistente. */}
              {/* Aplicamos mt-1.5 (6px) al contenedor completo del título y precio de "Automatización" */}
              <div className={`text-center mb-4 flex-shrink-0 flex flex-col justify-end min-h-[130px]
                ${plan.planIdentifier === 'AUTOMATIZACION_PROCESOS' ? 'mt-1.5' : ''}`}>
                {/* Aplicamos mt-[-1] (4px) al h3 solo para RAG_INICIAL */}
                <h3 className={`text-2xl font-bold text-white mb-2 ${plan.planIdentifier === 'RAG_INICIAL' ? '-mt-1' : ''}`}>
                    {plan.name}
                </h3>
                <div className="text-3xl font-bold gradient-text">
                    {plan.price}
                </div>
              </div>

              {/* === BLOQUE 2: Contenedor principal de Descripción y Características === */}
              <div className="flex flex-col flex-grow">
                {/* === SUB-BLOQUE 2.1: Descripción === */}
                {/* min-h: Asegurarse de que este bloque empuje el contenido hacia abajo y las descripciones se alineen. */}
                <div className="mb-6 flex-shrink-0 flex flex-col justify-end min-h-[170px]">
                    <p className="text-gray-300 text-sm leading-relaxed w-full">
                        {plan.description}
                    </p>
                </div>

                {/* === SUB-BLOQUE 2.2: "Incluye:" y Lista de Características === */}
                {/* min-h: Asegurarse de que sea suficiente para la lista más larga (Automatización de Procesos). */}
                <div className="flex-grow flex-shrink-0">
                    <p className="text-white font-semibold mb-3">Incluye:</p>
                    <ul className="space-y-3 mb-6 w-full min-h-[150px]">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                </div>
              </div>

              {/* === BLOQUE 3: Mantenimiento y Botón === */}
              <div className="mt-auto flex-shrink-0">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tool className="w-5 h-5 text-purple-400" />
                    <p className="text-purple-300 font-semibold text-sm">Mantenimiento Esencial</p>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{plan.maintenanceNote}</p>
                </div>

                <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => openDemoModal(plan.name)}
                      size="xl"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow group"
                      variant="default"
                    >
                      <Zap className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                      Solicitar Demo Gratuita
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

                      {formData.plan_interesado === "Automatización de Procesos" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="presupuesto_estimado" className="text-right">
                            Presupuesto Estimado *
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
                              <SelectItem value="750-2500€">750 a 2500€</SelectItem>
                              <SelectItem value="2500-6000€">2500 a 6000€</SelectItem>
                              <SelectItem value="6000€+">Desde 6000€</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;