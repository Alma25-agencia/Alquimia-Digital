import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle, Star, Shield, Wrench as Tool, Zap, Sparkles, TrendingUp } from 'lucide-react';
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
    hasCustomBudgetOptions: true,
    icon: TrendingUp,
    gradient: "from-primary-500 to-accent-500"
  },
  {
    name: "RAG Información General",
    price: "Desde 1.200 €",
    description: "Ideal para empresas que necesitan un asistente IA rápido, preciso y fácil de integrar, que responda preguntas frecuentes y agilice la atención.",
    features: [
      "Configuración completa del flujo RAG con n8n y Qdrant",
      "Integración con tu canal de consulta (Telegram, web, etc.)",
    ],
    maintenanceNote: "Mantenimiento necesario (gestión de tokens, actualizaciones, soporte técnico, etc.) no incluido. Se determinará según las necesidades de cada proyecto.",
    popular: true,
    planIdentifier: "RAG_INICIAL",
    icon: Zap,
    gradient: "from-accent-500 to-primary-500"
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
    planIdentifier: "RAG_EDUCATIVO",
    icon: Shield,
    gradient: "from-primary-600 to-accent-400"
  }
];

const PricingSection = () => {
  const { toast } = useToast();
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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
        description: "Hubo un problema al enviar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      console.error('Error inserting demo request:', error);
    }
  };

  return (
    <section className="relative pt-16 pb-16 overflow-hidden">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header con animación mejorada */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 rounded-full px-3 py-1.5 mb-4"
          >
            <Sparkles className="w-3 h-3 text-accent-400" />
            <span className="text-accent-400 text-xs font-medium">Soluciones Profesionales</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Precios transparentes</span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Soluciones profesionales con precios claros y directos.
          </p>
        </motion.div>

        {/* Grid de tarjetas mejorado */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {pricingPlansData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              {/* Efecto de resplandor en hover */}
              <motion.div
                className={`absolute -inset-0.5 bg-gradient-to-r ${plan.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500`}
                animate={{
                  opacity: hoveredCard === index ? 0.5 : 0,
                }}
              />

              {/* Tarjeta principal */}
              <motion.div
                className={`
                  relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-5 pt-4 pb-5 
                  h-full flex flex-col transition-all duration-500 ease-out
                  ${plan.popular ? 'ring-2 ring-accent-500/50 scale-105' : ''}
                `}
                whileHover={{ 
                  y: -8,
                  scale: plan.popular ? 1.08 : 1.03,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Badge de popular mejorado */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                      <Star className="w-3 h-3" />
                      Más Popular
                    </div>
                  </motion.div>
                )}

                {/* Icono del plan */}
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                {/* Título y precio */}
                <div className="text-center mb-4 flex-shrink-0">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {plan.name}
                  </h3>
                  <motion.div 
                    className="text-2xl font-bold gradient-text"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {plan.price}
                  </motion.div>
                </div>

                {/* Descripción */}
                <div className="mb-4 flex-shrink-0">
                  <p className="text-neutral-300 text-xs leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Características */}
                <div className="flex-grow flex-shrink-0">
                  <p className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent-400" />
                    Incluye:
                  </p>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="w-3 h-3 text-accent-400 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-300 text-xs leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Mantenimiento */}
                <div className="mt-auto flex-shrink-0">
                  <motion.div 
                    className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-3 mb-4 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Tool className="w-4 h-4 text-accent-400" />
                      <p className="text-accent-300 font-semibold text-xs">Mantenimiento Esencial</p>
                    </div>
                    <p className="text-neutral-400 text-xs leading-relaxed">{plan.maintenanceNote}</p>
                  </motion.div>

                  {/* Botón mejorado */}
                  <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button
                          onClick={() => openDemoModal(plan.name)}
                          size="lg"
                          className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-sm py-2.5`}
                        >
                          {/* Efecto de brillo en hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "200%" }}
                            transition={{ duration: 0.6 }}
                          />
                          <Zap className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110 relative z-10" />
                          <span className="relative z-10">Solicitar Demo Gratuita</span>
                        </Button>
                      </motion.div>
                    </DialogTrigger>

                    {/* Modal actualizado */}
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
                              <SelectTrigger className="col-span-3 bg-neutral-700 border-neutral-600 text-white">
                                <SelectValue placeholder="Selecciona un rango" />
                              </SelectTrigger>
                              <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
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
                          <Button type="submit" className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white">
                            Enviar Solicitud
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;