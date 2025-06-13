import React, { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import PricingSection from '@/components/landing/PricingSection';
import CtaSection from '@/components/landing/CtaSection';
import FaqSection from '@/components/landing/FaqSection';
import Footer from '@/components/landing/Footer';
import { supabase } from '@/lib/supabaseClient'; // Asegúrate que esta importación esté descomentada
import Navbar from "./components/Navbar";

function App() {
  // Ejemplo de cómo usar Supabase client (puedes eliminarlo si no lo usas aquí directamente)
  useEffect(() => {
    const testSupabaseConnection = async () => {
      // Este es solo un ejemplo para verificar la conexión.
      // Puedes adaptarlo para obtener datos de una tabla que ya exista o crear una de prueba.
      // Por ejemplo, podrías intentar leer de la tabla 'demo_requests' que crearemos.
      try {
        // Asegúrate que 'demo_requests' exista y tenga políticas RLS que permitan la lectura si es necesario.
        const { data, error } = await supabase
          .from('demo_requests') // Usamos la tabla que definimos
          .select('*')
          .limit(1); // Solo necesitamos 1 para probar

        if (error) {
          // No mostramos toast de error aquí para no molestar al usuario si es solo una prueba de conexión
          // console.error('Error conectando/leyendo de Supabase:', error.message);
          // Puedes agregar un toast si es una operación crítica que falla.
          // Por ejemplo:
          // toast({
          //   title: "Error de Conexión",
          //   description: "No se pudo conectar a la base de datos.",
          //   variant: "destructive",
          // });
        } else {
          // console.log('Conexión a Supabase exitosa y datos de prueba:', data);
        }
      } catch (e) {
        // console.error('Excepción durante la prueba de conexión a Supabase:', e);
      }
    };

    // Descomenta la siguiente línea para probar la conexión al montar el componente
    testSupabaseConnection(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HeroSection />
      <FeaturesSection />
      <UseCasesSection />
      <PricingSection />
      <CtaSection />
      <FaqSection />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;