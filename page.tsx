import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PhoneIcon, MessageCircleIcon, SearchIcon, HomeIcon, UserIcon, BriefcaseIcon, MapPinIcon } from "lucide-react"

export const metadata = {
  title: "Siga Imóveis - Encontre o Imóvel dos Seus Sonhos",
  description: "A Siga Imóveis Sob Medida oferece as melhores opções de imóveis em São Paulo para você e sua família.",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra superior com contatos e redes sociais */}
      <div className="bg-white py-2 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:(11)2738-2378" className="text-sm flex items-center hover:text-emerald-800">
              <PhoneIcon className="h-4 w-4 mr-1" /> (11) 2738-2378
            </a>
            <a href="https://wa.me/5511973300750" className="text-sm flex items-center hover:text-emerald-800">
              <MessageCircleIcon className="h-4 w-4 mr-1" /> (11) 97330-0750
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" aria-label="Facebook" className="text-gray-700 hover:text-emerald-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-700 hover:text-emerald-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-700 hover:text-emerald-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-700 hover:text-emerald-800">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Cabeçalho com logo e navegação */}
      <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-16 w-48">
                <Image src="/logo.png" alt="Siga Imóveis Sob Medida" fill style={{ objectFit: "contain" }} priority />
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-800 hover:text-emerald-800 font-medium">
                Home
              </Link>
              <Link href="/empresa" className="text-gray-800 hover:text-emerald-800 font-medium">
                A Empresa
              </Link>
              <Link href="/imoveis" className="text-gray-800 hover:text-emerald-800 font-medium">
                Buscar Imóvel
              </Link>
              <Link href="/cadastre" className="text-gray-800 hover:text-emerald-800 font-medium">
                Cadastre seu Imóvel
              </Link>
              <Link href="/trabalhe" className="text-gray-800 hover:text-emerald-800 font-medium">
                Trabalhe Conosco
              </Link>
              <Link href="/contato" className="text-gray-800 hover:text-emerald-800 font-medium">
                Contato
              </Link>
              <Link href="/cliente/login" className="text-emerald-800 hover:text-emerald-900 font-semibold">
                Área do cliente
              </Link>
            </nav>

            <button className="md:hidden text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Carrossel de imóveis */}
      <div className="relative">
        <div className="w-full h-[500px] relative">
          <Image
            src="/placeholder"
            alt="Imóvel em destaque"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Encontre o imóvel dos seus sonhos</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                A Siga Imóveis Sob Medida oferece as melhores opções de imóveis para você e sua família.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Ver Imóveis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-emerald-800"
                >
                  Fale Conosco
                </Button>
              </div>
            </div>
          </div>

          {/* Controles do carrossel */}
          <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full text-gray-800 hover:bg-emerald-600 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full text-gray-800 hover:bg-emerald-600 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Busca de imóveis */}
      <div className="bg-white py-8 shadow-md relative z-10 -mt-16 mx-4 md:mx-auto max-w-5xl rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Encontre seu imóvel</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                <option>Todos os tipos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Comercial</option>
                <option>Terreno</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finalidade</label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                <option>Comprar ou Alugar</option>
                <option>Comprar</option>
                <option>Alugar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
              <input
                type="text"
                placeholder="Bairro ou cidade"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-emerald-800 hover:bg-emerald-900 text-white p-2 rounded-md">
                <SearchIcon className="h-5 w-5 mr-2" /> Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Imóveis em destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Imóveis em Destaque</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={`/placeholder.svg?height=224&width=400&text=Imóvel ${item}`}
                    alt={`Imóvel ${item}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item % 2 === 0 ? "Venda" : "Aluguel"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Apartamento {item} - Vila Mariana</h3>
                  <p className="text-gray-600 mb-4">3 dormitórios • 2 banheiros • 98m²</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-emerald-800">
                      {item % 2 === 0 ? "R$ 750.000" : "R$ 3.500/mês"}
                    </span>
                    <Button
                      variant="outline"
                      className="border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white"
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button className="bg-emerald-800 hover:bg-emerald-900">Ver todos os imóveis</Button>
          </div>
        </div>
      </section>

      {/* Por que escolher a Siga Imóveis */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Por que escolher a Siga Imóveis?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <HomeIcon className="h-6 w-6 text-emerald-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Amplo Portfólio</h3>
              <p className="text-gray-600">
                Oferecemos uma grande variedade de imóveis para atender todas as suas necessidades.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <UserIcon className="h-6 w-6 text-emerald-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Nossa equipe está pronta para entender suas necessidades e encontrar o imóvel ideal.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-emerald-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Segurança Garantida</h3>
              <p className="text-gray-600">
                Todos os nossos contratos são verificados por especialistas para sua tranquilidade.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <MapPinIcon className="h-6 w-6 text-emerald-800" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Localização Estratégica</h3>
              <p className="text-gray-600">Imóveis em regiões valorizadas e com excelente infraestrutura urbana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">O que nossos clientes dizem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h4 className="font-bold">Cliente {item}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "A Siga Imóveis me ajudou a encontrar o apartamento perfeito para minha família. O atendimento foi
                  excelente e todo o processo foi muito tranquilo."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para encontrar seu imóvel ideal?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar você a encontrar o imóvel dos seus sonhos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-gray-100">
              Buscar Imóveis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-800"
            >
              Fale Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Botão de WhatsApp flutuante */}
      <a
        href="https://wa.me/5511973300750"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Contato via WhatsApp"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Siga Imóveis Sob Medida</h3>
              <p className="text-gray-400 mb-4">
                Encontre o imóvel dos seus sonhos com a nossa assessoria especializada.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-800 hover:border-emerald-800 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-800 hover:border-emerald-800 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-800 hover:border-emerald-800 transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <span>(11) 2738-2378</span>
                </li>
                <li className="flex items-center">
                  <MessageCircleIcon className="h-4 w-4 mr-2" />
                  <span>(11) 97330-0750</span>
                </li>
                <li className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>Av. Paulista, 1000 - São Paulo/SP</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/imoveis" className="text-gray-400 hover:text-white transition-colors">
                    Imóveis para Alugar
                  </Link>
                </li>
                <li>
                  <Link href="/imoveis" className="text-gray-400 hover:text-white transition-colors">
                    Imóveis para Comprar
                  </Link>
                </li>
                <li>
                  <Link href="/empresa" className="text-gray-400 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/cliente/login" className="text-gray-400 hover:text-white transition-colors">
                    Área do Cliente
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Receba novidades e ofertas exclusivas.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-800 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; 2025 Siga Imóveis Sob Medida - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
