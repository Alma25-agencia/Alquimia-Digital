import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import {
  Brain,
  Calendar,
  ChevronDown,
  Zap,
  Sparkles,
  Bot,
  ArrowRight,
  Play,
  Shield,
  Rocket
} from 'lucide-react';
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
import logoAlquimiaDigital from '../../assets/images/Untitled.png';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const { scrollY } = useScroll();
  const { toast } = useToast();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-5%" });
  const controls = useAnimation();
  
  // Enhanced parallax with more layers
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y5 = useTransform(scrollY, [0, 1000], [0, 350]);
  const y6 = useTransform(scrollY, [0, 1000], [0, -400]);
  
  const opacity = useTransform(scrollY, [0, 500], [1, 0.1]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);
  const blur = useTransform(scrollY, [0, 500], [0, 8]);
  
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -180]);
  const rotate3 = useTransform(scrollY, [0, 1000], [0, 270]);

  // Premium mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Form state
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

  // Orchestrated animation sequence
  useEffect(() => {
    if (isInView) {
      const sequence = async () => {
        // Stage 1: Background fade in (0-0.5s)
        setAnimationStage(1);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Stage 2: Logo appears (0.5-1.2s)
        setAnimationStage(2);
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Stage 3: Title appears with stagger (1.2-2.5s)
        setAnimationStage(3);
        await new Promise(resolve => setTimeout(resolve, 1300));
        
        // Stage 4: Description and UI elements (2.5-3.5s)
        setAnimationStage(4);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Stage 5: Chat interface (3.5-4.2s)
        setAnimationStage(5);
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Stage 6: Final details and indicators (4.2-5s)
        setAnimationStage(6);
        setIsVisible(true);
      };
      
      sequence();
    }
  }, [isInView]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x: xPct, y: yPct });
      mouseX.set(xPct * 50);
      mouseY.set(yPct * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();

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
            presupuesto_estimado: formData.presupuesto_estimado,
          }
        ]);

      if (error) throw error;

      toast({
        title: "¡Demo solicitada! 🚀",
        description: "Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas.",
      });
      setIsDemoFormOpen(false);
      setFormData({
        nombre: '', apellidos: '', email: '', telefono: '', empresa: '',
        descripcion_solicitud: '', tipo_negocio: '', presupuesto_estimado: '',
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

  const handleScheduleMeeting = () => {
    const calendlyUrl = 'https://calendly.com/albertam2886/new-meeting';
    window.open(calendlyUrl, '_blank');

    toast({
      title: "Agendar Reunión 📅",
      description: "Serás redirigido a Calendly para elegir tu horario.",
    });
  };

  // Animation variants for orchestrated entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.3, 
      y: 100,
      rotateY: -90,
      filter: "blur(20px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1
      }
    }
  };

  const titleLineVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      rotateX: -90,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.8,
      filter: "blur(15px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5
      }
    }
  };

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      x: 200, 
      scale: 0.8,
      rotateY: 45
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        opacity, 
        scale,
        filter: `blur(${blur}px)`
      }}
      variants={containerVariants}
      initial="hidden"
      animate={animationStage >= 1 ? "visible" : "hidden"}
    >
      {/* Premium multi-layer background */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Base layer with enhanced gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-950" />
        
        {/* Atmospheric layers */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(37,99,235,0.4),rgba(15,23,42,0.9))]"
          style={{ y: y5, rotate: rotate1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-blue-950/50"
          style={{ y: y4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
          transition={{ duration: 2, delay: 0.6 }}
        />
      </motion.div>

      {/* Clean Premium Background - NO PARTICLES */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 1 ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        {/* Subtle animated gradients only */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/60 to-slate-950"
          animate={{
            background: [
              "linear-gradient(135deg, rgb(2, 6, 23) 0%, rgb(30, 58, 138) 50%, rgb(2, 6, 23) 100%)",
              "linear-gradient(135deg, rgb(2, 6, 23) 0%, rgb(37, 99, 235) 50%, rgb(2, 6, 23) 100%)",
              "linear-gradient(135deg, rgb(2, 6, 23) 0%, rgb(30, 58, 138) 50%, rgb(2, 6, 23) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Ambient light effects */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </motion.div>

      {/* Premium animated orbs */}
      <motion.div 
        className="absolute inset-0 opacity-60" 
        style={{ y: y1, rotate: rotate1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: animationStage >= 1 ? 0.6 : 0,
          scale: animationStage >= 1 ? 1 : 0.5
        }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Hero orb - primary blue */}
        <motion.div 
          className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/50 to-blue-500/50 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.4, 0.9, 1],
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${smoothMouseX * 0.1}px, ${smoothMouseY * 0.1}px)`
          }}
        />
        
        {/* Secondary orb - blue variation */}
        <motion.div 
          className="absolute top-40 right-10 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/50 to-blue-400/50 rounded-full filter blur-3xl"
          animate={{
            scale: [1.3, 1, 1.5, 1.3],
            x: [-20, 40, -50, -20],
            y: [0, 40, -25, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${smoothMouseX * -0.15}px, ${smoothMouseY * -0.15}px)`,
            rotate: rotate2
          }}
        />
        
        {/* Accent orbs - emerald (your accent color) */}
        <motion.div 
          className="absolute bottom-20 left-1/2 w-[350px] h-[350px] bg-gradient-to-r from-emerald-500/40 to-emerald-400/40 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.6, 1],
            x: [-80, 80, -80],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${smoothMouseX * 0.2}px, ${smoothMouseY * 0.2}px)`,
            rotate: rotate3
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 right-1/4 w-[250px] h-[250px] bg-gradient-to-r from-blue-500/40 to-blue-400/40 rounded-full filter blur-2xl"
          animate={{
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 270, 360],
            x: [0, 60, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-center min-h-screen py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left column - Premium orchestrated entrance */}
          <motion.div
            className="text-center lg:text-left perspective-1000 flex flex-col items-center lg:items-start mx-auto lg:mx-0"
            style={{
              transform: `translate3d(${smoothMouseX * 0.02}px, ${smoothMouseY * 0.02}px, 0)`
            }}
          >
            {/* Logo with premium entrance */}
            <motion.div
              className="relative mb-8 transform-gpu flex justify-center lg:justify-start max-w-xs sm:max-w-sm md:max-w-md md:mx-auto lg:max-w-none lg:mx-0"
              variants={logoVariants}
              initial="hidden"
              animate={animationStage >= 2 ? "visible" : "hidden"}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-blue-600/50 to-emerald-600/50 rounded-full blur-3xl"
                animate={{
                  scale: isHovering ? 1.4 : 1,
                  opacity: isHovering ? 0.9 : 0.6,
                  rotate: [0, 360],
                }}
                transition={{ 
                  scale: { duration: 0.5, ease: "easeOut" },
                  opacity: { duration: 0.5 },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
              />
              <motion.img
                src={logoAlquimiaDigital}
                alt="Alquimia Digital Logo"
                className="relative mx-auto lg:mx-0 h-48 md:h-64 lg:h-80 w-auto transform-gpu"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
                  transform: `translate3d(${smoothMouseX * 0.08}px, ${smoothMouseY * 0.08}px, 0)`
                }}
              />
            </motion.div>

            {/* Title with orchestrated stagger - BIGGER ON MOBILE */}
            <motion.h1 
              className="text-5xl xs:text-6xl sm:text-6xl md:text-5xl xl:text-7xl font-bold mb-6 leading-tight text-center lg:text-left max-w-sm sm:max-w-md md:max-w-lg md:mx-auto lg:max-w-none lg:mx-0"
              variants={titleVariants}
              initial="hidden"
              animate={animationStage >= 3 ? "visible" : "hidden"}
            >
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent"
                variants={titleLineVariants}
                style={{
                  backgroundSize: '300% 300%',
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  backgroundPosition: { duration: 8, repeat: Infinity }
                }}
              >
                Tu conocimiento,
              </motion.span>
              
              <motion.span 
                className="block text-white"
                variants={titleLineVariants}
              >
                disponible
              </motion.span>
              
              <motion.span 
                className="block bg-gradient-to-r from-emerald-400 via-blue-400 to-blue-500 bg-clip-text text-transparent"
                variants={titleLineVariants}
              >
                24/7 con IA
              </motion.span>
            </motion.h1>

            {/* Description with premium entrance - SMALLER COMPACT CARD */}
            <motion.div
              className="relative flex justify-center lg:justify-start w-auto lg:w-full"
              variants={descriptionVariants}
              initial="hidden"
              animate={animationStage >= 4 ? "visible" : "hidden"}
            >
              <p className="relative text-sm xs:text-base md:text-xl xl:text-2xl text-gray-300 mb-6 leading-relaxed p-3 sm:p-4 md:p-6 xl:p-8 bg-slate-900/50 backdrop-blur-2xl rounded-xl border border-white/20 max-w-xs sm:max-w-sm md:max-w-lg md:mx-auto lg:max-w-none lg:mx-0">
                Creamos asistentes personalizados con IA que entienden tu negocio,
                responden dudas y automatizan tareas,{' '}
                <motion.span 
                  className="text-emerald-400 font-semibold"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(16, 185, 129, 0.6)",
                      "0 0 30px rgba(16, 185, 129, 1)",
                      "0 0 10px rgba(16, 185, 129, 0.6)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  sin alucinar
                </motion.span>
                .
              </p>
            </motion.div>

            {/* Buttons with premium entrance - SAME SIZE BUTTONS */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center lg:items-start max-w-xs sm:max-w-sm md:max-w-lg md:mx-auto lg:max-w-none mx-auto lg:mx-0"
              variants={buttonVariants}
              initial="hidden"
              animate={animationStage >= 4 ? "visible" : "hidden"}
            >
              {/* Demo button - SAME SIZE AS SCHEDULE BUTTON */}
              <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                <DialogTrigger asChild>
                  <motion.div
                    whileHover={{ 
                      scale: 1.08, 
                      y: -6, 
                      rotateX: 8,
                      z: 30 
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      size="lg"
                      className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden group px-6 py-4 text-sm sm:text-base transform-gpu"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                        initial={{ x: "-300%" }}
                        whileHover={{ x: "300%" }}
                        transition={{ duration: 1.2 }}
                      />
                      
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-blue-500/70"
                        animate={{
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      
                      <span className="relative z-10 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Solicitar Demo
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </span>
                    </Button>
                  </motion.div>
                </DialogTrigger>

                {/* Modal with correct styling */}
                <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto bg-slate-900/95 backdrop-blur-xl text-white border border-slate-600/50 rounded-2xl shadow-2xl">
                  <DialogHeader className="pb-4 border-b border-slate-600/50">
                    <DialogTitle className="text-xl font-bold text-white">
                      Solicita tu Demo Personalizada
                    </DialogTitle>
                    <DialogDescription className="text-slate-300 text-sm">
                      Completa el formulario y te contactaremos en menos de 24 horas
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleDemoSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="nombre" className="text-sm font-medium text-slate-200 mb-1 block">
                          Nombre *
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
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
                          className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tus apellidos"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-slate-200 mb-1 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                        placeholder="nombre@empresa.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="telefono" className="text-sm font-medium text-slate-200 mb-1 block">
                          Teléfono
                        </Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                          placeholder="+34 600 000 000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="empresa" className="text-sm font-medium text-slate-200 mb-1 block">
                          Empresa
                        </Label>
                        <Input
                          id="empresa"
                          value={formData.empresa}
                          onChange={handleInputChange}
                          className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tu empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tipo_negocio" className="text-sm font-medium text-slate-200 mb-1 block">
                        Tipo de Negocio
                      </Label>
                      <Input
                        id="tipo_negocio"
                        value={formData.tipo_negocio}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500"
                        placeholder="E-commerce, Educación, Consultoría..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="descripcion_solicitud" className="text-sm font-medium text-slate-200 mb-1 block">
                        Descripción *
                      </Label>
                      <Textarea
                        id="descripcion_solicitud"
                        value={formData.descripcion_solicitud}
                        onChange={handleInputChange}
                        className="bg-slate-800 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 min-h-[80px] resize-none"
                        placeholder="Describe brevemente qué necesitas y para qué tipo de negocio..."
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="presupuesto_estimado" className="text-sm font-medium text-slate-200 mb-1 block">
                        Presupuesto *
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange(value, 'presupuesto_estimado')}
                        value={formData.presupuesto_estimado}
                        required
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-600 text-white focus:border-blue-500">
                          <SelectValue placeholder="Selecciona un rango" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="250-1000" className="text-white hover:bg-slate-700">250 € a 1.000 € (+IVA)</SelectItem>
                          <SelectItem value="1000-2500" className="text-white hover:bg-slate-700">1.000 € a 2.500 € (+IVA)</SelectItem>
                          <SelectItem value="2500-5000" className="text-white hover:bg-slate-700">2.500 € a 5.000 € (+IVA)</SelectItem>
                          <SelectItem value="5000+" className="text-white hover:bg-slate-700">Más de 5.000 € (+IVA)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-600/50">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                      >
                        <Rocket className="w-4 h-4 mr-2" />
                        Enviar Solicitud
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* Schedule button - SAME SIZE */}
              <motion.div
                whileHover={{ 
                  scale: 1.08, 
                  y: -6, 
                  rotateX: 8,
                  z: 30 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  onClick={handleScheduleMeeting}
                  size="lg"
                  className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden group px-6 py-4 text-sm sm:text-base transform-gpu"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                    initial={{ x: "-300%" }}
                    whileHover={{ x: "300%" }}
                    transition={{ duration: 1.2 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agenda Reunión
                    <Play className="w-5 h-5 ml-2" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4 mt-8 max-w-xs sm:max-w-sm md:max-w-lg md:mx-auto lg:max-w-none mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: animationStage >= 6 ? 1 : 0, 
                y: animationStage >= 6 ? 0 : 40 
              }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {[
                { icon: Shield, text: "100% Seguro", color: "text-emerald-400", bgColor: "from-emerald-500/20 to-emerald-600/20" },
                { icon: Zap, text: "Setup en 48h", color: "text-blue-400", bgColor: "from-blue-500/20 to-blue-600/20" },
                { icon: Sparkles, text: "IA Personalizada", color: "text-blue-300", bgColor: "from-blue-400/20 to-blue-500/20" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-3 text-sm text-gray-300 px-4 py-2 rounded-full bg-gradient-to-r ${item.bgColor} backdrop-blur-sm border border-white/10`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: animationStage >= 6 ? 1 : 0, 
                    scale: animationStage >= 6 ? 1 : 0.8,
                    y: animationStage >= 6 ? 0 : 20
                  }}
                  transition={{ 
                    delay: 0.5 + index * 0.15, 
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: `0 10px 30px ${item.color.replace('text-', 'rgba(')}`,
                  }}
                >
                  <span>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </span>
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Premium chat interface */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center perspective-1000"
            style={{ y: y2 }}
            variants={chatVariants}
            initial="hidden"
            animate={animationStage >= 5 ? "visible" : "hidden"}
          >
            <div className="relative max-w-md mx-auto">
              {/* Enhanced glass effect chat container */}
              <motion.div 
                className="relative rounded-3xl p-6 bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-3xl overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  z: 30
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  transform: `translate3d(${smoothMouseX * -0.03}px, ${smoothMouseY * -0.03}px, 0)`
                }}
                animate={{
                  boxShadow: [
                    "0 25px 50px rgba(0,0,0,0.4)",
                    "0 35px 70px rgba(37,99,235,0.3)",
                    "0 25px 50px rgba(0,0,0,0.4)"
                  ],
                  y: [0, -8, 0],
                }}
                transition={{
                  boxShadow: { duration: 6, repeat: Infinity },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-blue-500/15 to-emerald-600/15 rounded-3xl"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                {/* Chat header */}
                <motion.div 
                  className="relative flex items-center gap-3 mb-5 pb-3 border-b border-slate-600/40"
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center relative"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(37,99,235,0.5)",
                        "0 0 25px rgba(37,99,235,0.7)",
                        "0 0 15px rgba(37,99,235,0.5)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Bot className="w-4 h-4 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <div>
                    <span className="text-white font-medium text-sm">Asistente IA</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <motion.div 
                        className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-emerald-400 text-xs">En línea</span>
                    </div>
                  </div>
                </motion.div>

                {/* Chat messages */}
                <div className="space-y-4 relative">
                  <motion.div 
                    className="chat-bubble user-message bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-xl ml-auto max-w-[85%] shadow-md"
                    initial={{ opacity: 0, x: 30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 400 }}
                  >
                    <p className="text-xs font-medium">¿Cuál es nuestra política de devoluciones?</p>
                  </motion.div>

                  <motion.div 
                    className="chat-bubble assistant-message bg-gradient-to-r from-blue-700 to-blue-600 text-white p-3 rounded-xl mr-auto max-w-[90%] shadow-md"
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 1.4, type: "spring", stiffness: 400 }}
                  >
                    <p className="text-xs font-medium leading-relaxed">
                      Según nuestras políticas, tienes 30 días para solicitar una devolución. 
                      Te ayudo con el proceso...
                    </p>
                  </motion.div>

                  {/* Typing dots */}
                  <motion.div 
                    className="flex items-center gap-1 pl-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{
                            y: [0, -8, 0],
                            opacity: [0.5, 1, 0.5],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced floating brain icon */}
              <motion.div 
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl border-3 border-white/20"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, -8, 0],
                  boxShadow: [
                    "0 15px 30px rgba(37,99,235,0.4)",
                    "0 25px 50px rgba(16,185,129,0.6)",
                    "0 15px 30px rgba(37,99,235,0.4)"
                  ]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 180,
                  transition: { duration: 0.6 }
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: animationStage >= 5 ? 1 : 0, 
                  scale: animationStage >= 5 ? 1 : 0.5 
                }}
                transition={{ delay: 1 }}
              >
                <Brain className="w-8 h-8 text-white" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-12 right-12 w-4 h-4 bg-blue-400 rounded-full"
        animate={{ 
          scale: [1, 1.8, 1],
          opacity: [0.4, 1, 0.4],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 6 ? [0.4, 1, 0.4] : 0 }}
      />
      <motion.div 
        className="absolute bottom-24 left-12 w-3 h-3 bg-emerald-400 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
          x: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 6 ? [0.6, 1, 0.6] : 0 }}
      />
      <motion.div 
        className="absolute top-1/3 left-12 w-2 h-2 bg-blue-300 rounded-full"
        animate={{ 
          y: [0, -30, 0],
          opacity: [0.3, 0.9, 0.3],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 6 ? [0.3, 0.9, 0.3] : 0 }}
      />
      
      <motion.div 
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-300 rounded-full"
        animate={{ 
          x: [0, 25, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.8, 0.2],
          scale: [0.8, 1.4, 0.8]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2.5 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 6 ? [0.2, 0.8, 0.2] : 0 }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [0.9, 1.4, 0.9],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStage >= 6 ? [0.5, 1, 0.5] : 0 }}
      />
    </motion.section>
  );
};

export default HeroSection;