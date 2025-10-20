import { Button } from "@/components/ui/button";
import { MessageCircle, Target, Users, TrendingUp } from "lucide-react";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function NosotrosPage() {
  const whatsappNumber = "15551234567";
  const whatsappMessage = encodeURIComponent("Hola, me gustaría conocer más sobre Liquidation Warehouse");

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Tu socio confiable en el negocio de liquidación mayorista
            </p>
          </div>

          <div className="space-y-12">
            <section className="bg-gradient-to-br from-brand/5 to-white p-8 rounded-2xl border-2 border-brand/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Liquidation Warehouse nació con la visión de conectar a mayoristas con 
                oportunidades excepcionales en el mercado de liquidación. Con años de 
                experiencia en la industria, hemos construido relaciones sólidas con las 
                principales marcas y retailers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nos especializamos en ofrecer pallets de alta calidad con productos de 
                marcas reconocidas a precios competitivos, ayudando a nuestros clientes 
                a maximizar sus márgenes de ganancia y hacer crecer sus negocios.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Nuestros Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mb-4">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Calidad</h3>
                  <p className="text-gray-600">
                    Verificamos cada pallet para garantizar productos de la más alta calidad
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Confianza</h3>
                  <p className="text-gray-600">
                    Construimos relaciones duraderas basadas en transparencia y honestidad
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-brand/20 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-dark rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Crecimiento</h3>
                  <p className="text-gray-600">
                    Ayudamos a nuestros clientes a crecer con oportunidades rentables
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-brand to-brand-dark text-white p-10 rounded-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">
                Únete a cientos de mayoristas que confían en nosotros para hacer crecer sus negocios
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand px-8 py-6 text-lg"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Contáctanos por WhatsApp
                </a>
              </Button>
            </section>
          </div>
        </div>
      </div>
      
      <FeaturedProducts />
    </div>
  );
}