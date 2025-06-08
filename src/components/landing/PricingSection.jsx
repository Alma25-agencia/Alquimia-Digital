import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { CheckCircle, Star, Shield, Settings, Zap, Sparkles, TrendingUp } from 'lucide-react';
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
    gradient: "from-blue-500 to-blue-600",
    glowColor: "blue"
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
    gradient: "from-blue-400 to-blue-600",
    glowColor: "blue"
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
    gradient: "from-emerald-400 to-emerald-600",
    glowColor: "emerald"
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
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Fondo animado premium - CORREGIDO */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900"></div>
      
      {/* Elementos animados de fondo - CORREGIDOS */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Partículas flotantes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header espectacular - CORREGIDO Y COMPACTO */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-blue-300 font-medium">Soluciones Premium con IA</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Precios Transparentes
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            Soluciones profesionales de IA con precios claros y directos. 
            Sin sorpresas, sin letras pequeñas.
          </motion.p>
        </motion.div>

        {/* Grid de tarjetas premium */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlansData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15, 
                delay: index * 0.2 
              }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group perspective-1000"
            >
              {/* Glow effect premium - CORREGIDO */}
              <motion.div
                animate={{
                  opacity: hoveredCard === index ? [0.3, 0.7, 0.3] : [0.1, 0.3, 0.1],
                  scale: hoveredCard === index ? [1, 1.3, 1] : [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`absolute -inset-4 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-2xl`}
              />
              
              {/* Tarjeta principal */}
              <motion.div
                className={`
                  relative bg-slate-800/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 
                  h-full flex flex-col transition-all duration-500 ease-out
                  shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.3)]
                  ${plan.popular ? 'ring-2 ring-blue-400/50 scale-105' : ''}
                `}
                whileHover={{
                  y: -20,
                  rotateY: 5,
                  scale: plan.popular ? 1.08 : 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {/* Badge popular mejorado - CORREGIDO */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-4 h-4" />
                      </motion.div>
                      Más Popular
                    </div>
                  </motion.div>
                )}

                {/* Icono animado - CORREGIDO */}
                <motion.div 
                  className="flex justify-center mb-6"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center 
                               shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.2)]`}
                    animate={{
                      boxShadow: [
                        `0_8px_32px_rgba(37,99,235,0.3),inset_0_2px_0_rgba(255,255,255,0.2)`,
                        `0_8px_32px_rgba(37,99,235,0.6),inset_0_2px_0_rgba(255,255,255,0.3)`,
                        `0_8px_32px_rgba(37,99,235,0.3),inset_0_2px_0_rgba(255,255,255,0.2)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                {/* Contenido */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                    {plan.name}
                  </h3>
                  <motion.div 
                    className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {plan.price}
                  </motion.div>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed text-center">
                  {plan.description}
                </p>

                {/* Features con animaciones - CORREGIDO */}
                <div className="flex-grow">
                  <p className="text-white font-semibold mb-4 flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    Incluye:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.1 * i + 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 360, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        >
                          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Nota de mantenimiento - CORREGIDA */}
                <motion.div 
                  className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-4 h-4 text-blue-400" />
                    <p className="text-blue-300 font-semibold text-sm">Mantenimiento Esencial</p>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{plan.maintenanceNote}</p>
                </motion.div>

                {/* Botón premium - CORREGIDO */}
                <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Button
                        onClick={() => openDemoModal(plan.name)}
                        className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-bold py-4 rounded-xl
                                   shadow-[0_8px_32px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.6)]
                                   transition-all duration-300 relative overflow-hidden group`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.8 }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.div>
                          Solicitar Demo Gratuita
                        </span>
                      </Button>
                    </motion.div>
                  </DialogTrigger>

                  {/* Modal FUNCIONANDO - CORREGIDO */}
                  <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto bg-slate-800 text-white border border-slate-600 rounded-xl shadow-xl">
                    
                    {/* Header simple pero elegante */}
                    <DialogHeader className="pb-4 border-b border-slate-600">
                      <DialogTitle className="text-xl font-bold text-white">
                        Solicita tu Demo Personalizada
                      </DialogTitle>
                      <DialogDescription className="text-slate-300 text-sm">
                        Completa el formulario y te contactaremos en menos de 24 horas
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleDemoSubmit} className="space-y-4 py-4">
                      
                      {/* Nombre y Apellidos */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="nombre" className="text-sm font-medium text-slate-200 mb-1 block">
                            Nombre *
                          </Label>
                          <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Tu nombre"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="apellidos" className="text-sm font-medium text-slate-200 mb-1 block">
                            Apellidos
                          </Label>
                          <Input
                            id="apellidos"
                            value={formData.apellidos}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Tus apellidos"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium text-slate-200 mb-1 block">
                          Email Corporativo *
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 pr-10"
                            placeholder="nombre@empresa.com"
                            required
                          />
                          {formData.email.includes('@') && (
                            <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                      </div>

                      {/* Empresa y Teléfono */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="empresa" className="text-sm font-medium text-slate-200 mb-1 block">
                            Empresa
                          </Label>
                          <Input
                            id="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="telefono" className="text-sm font-medium text-slate-200 mb-1 block">
                            Teléfono
                          </Label>
                          <Input
                            id="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                            placeholder="+34 600 000 000"
                          />
                        </div>
                      </div>

                      {/* Tipo de Negocio */}
                      <div>
                        <Label htmlFor="tipo_negocio" className="text-sm font-medium text-slate-200 mb-1 block">
                          Tipo de Negocio
                        </Label>
                        <Input
                          id="tipo_negocio"
                          value={formData.tipo_negocio}
                          onChange={handleInputChange}
                          className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                          placeholder="E-commerce, Educación, Consultoría, SaaS..."
                        />
                      </div>

                      {/* Descripción */}
                      <div>
                        <Label htmlFor="descripcion_solicitud" className="text-sm font-medium text-slate-200 mb-1 block">
                          Describe tu proyecto *
                        </Label>
                        <Textarea
                          id="descripcion_solicitud"
                          value={formData.descripcion_solicitud}
                          onChange={handleInputChange}
                          className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 min-h-[80px] resize-none"
                          placeholder="Cuéntanos qué necesitas automatizar, qué problemas quieres resolver y cuáles son tus objetivos principales..."
                          required
                        />
                        <div className="text-right mt-1">
                          <span className="text-xs text-slate-400">
                            {formData.descripcion_solicitud.length}/500 caracteres
                          </span>
                        </div>
                      </div>

                      {/* Presupuesto (solo para Automatización) */}
                      <AnimatePresence>
                        {formData.plan_interesado === "Automatización de Procesos" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Label htmlFor="presupuesto_estimado" className="text-sm font-medium text-slate-200 mb-1 block">
                              Presupuesto Estimado *
                            </Label>
                            <Select
                              onValueChange={(value) => handleSelectChange(value, 'presupuesto_estimado')}
                              value={formData.presupuesto_estimado}
                              required
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-blue-500">
                                <SelectValue placeholder="Selecciona tu rango de presupuesto" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-700 border-slate-600">
                                <SelectItem value="750-2500€" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                                  750 - 2.500€ (Proyectos pequeños)
                                </SelectItem>
                                <SelectItem value="2500-6000€" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                                  2.500 - 6.000€ (Proyectos medianos)
                                </SelectItem>
                                <SelectItem value="6000€+" className="text-white hover:bg-slate-600 focus:bg-slate-600">
                                  Desde 6.000€ (Proyectos enterprise)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Botón de envío - CORREGIDO */}
                      <DialogFooter className="pt-4 border-t border-slate-600">
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Solicitar Demo Gratuita
                        </Button>
                        
                        <p className="text-center text-slate-400 text-xs mt-3 w-full">
                          Sin compromiso • Respuesta en 24h • 100% personalizado
                        </p>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer section - CORREGIDO */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.p 
            className="text-gray-400 text-lg"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Soluciones premium de IA que transforman tu negocio ✨
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;