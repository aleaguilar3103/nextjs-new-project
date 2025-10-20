import { Eye, Target, Lightbulb, Award } from "lucide-react";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function MisionVisionPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              Misión y Visión
            </h1>
            <p className="text-xl text-gray-600">
              Nuestro propósito y hacia dónde nos dirigimos
            </p>
          </div>

          <div className="space-y-12">
            <section className="bg-gradient-to-br from-brand to-brand-dark text-white p-10 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold">Nuestra Misión</h2>
              </div>
              <p className="text-xl text-white/80 leading-relaxed">
                Proporcionar a mayoristas y revendedores acceso a pallets de liquidación 
                de alta calidad a precios competitivos, facilitando el crecimiento de sus 
                negocios a través de productos de marcas reconocidas, servicio excepcional 
                y relaciones comerciales transparentes y duraderas.
              </p>
            </section>

            <section className="bg-gradient-to-br from-brand/5 to-white p-10 rounded-2xl border-2 border-brand/20 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Nuestra Visión</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Ser el líder reconocido en la industria de liquidación mayorista, 
                expandiendo nuestra red de distribución a nivel nacional e internacional, 
                y siendo la primera opción para mayoristas que buscan oportunidades 
                rentables y productos de calidad excepcional.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Nuestros Principios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-3">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Innovación</h3>
                  </div>
                  <p className="text-gray-600">
                    Constantemente buscamos nuevas formas de mejorar nuestros servicios 
                    y ofrecer valor agregado a nuestros clientes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-3">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Excelencia</h3>
                  </div>
                  <p className="text-gray-600">
                    Nos comprometemos a mantener los más altos estándares de calidad 
                    en cada pallet que ofrecemos.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-3">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Integridad</h3>
                  </div>
                  <p className="text-gray-600">
                    Operamos con transparencia total, construyendo confianza a través 
                    de prácticas comerciales éticas.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mr-3">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Compromiso</h3>
                  </div>
                  <p className="text-gray-600">
                    Estamos dedicados al éxito de nuestros clientes, brindando soporte 
                    y asesoría personalizada.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <FeaturedProducts />
    </div>
  );
}