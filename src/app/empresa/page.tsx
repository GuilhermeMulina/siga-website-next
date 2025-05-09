"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingIcon,
  UsersIcon,
  AwardIcon,
  TargetIcon,
  CheckCircleIcon,
} from "lucide-react"

// Array com as 11 fotos da pasta public
const placeholderImages = [
  { id: 1, url: "/1.png", alt: "Imagem da empresa 1" },
  { id: 2, url: "/2.png", alt: "Imagem da empresa 2" },
  { id: 3, url: "/3.png", alt: "Imagem da empresa 3" },
  { id: 4, url: "/4.png", alt: "Imagem da empresa 4" },
  { id: 5, url: "/5.png", alt: "Imagem da empresa 5" },
  { id: 6, url: "/6.png", alt: "Imagem da empresa 6" },
  { id: 7, url: "/7.png", alt: "Imagem da empresa 7" },
  { id: 8, url: "/8.png", alt: "Imagem da empresa 8" },
  { id: 9, url: "/9.png", alt: "Imagem da empresa 9" },
  { id: 10, url: "/10.png", alt: "Imagem da empresa 10" },
  { id: 11, url: "/11.png", alt: "Imagem da empresa 11" },
]

export default function Empresa() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setCurrentSlide(index)

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    },
    [isTransitioning],
  )

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % placeholderImages.length
    goToSlide(newIndex)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    const newIndex = (currentSlide - 1 + placeholderImages.length) % placeholderImages.length
    goToSlide(newIndex)
  }, [currentSlide, goToSlide])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide()
    }
  }

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho da página */}
      <div className="bg-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a Siga Imóveis</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conheça nossa história, valores e compromisso com a excelência no mercado imobiliário
          </p>
        </div>
      </div>

      {/* Carrossel de imagens */}
      <div
        className="relative overflow-hidden bg-gray-900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-[500px] md:h-[600px] relative">
        {placeholderImages.map((image, index) => {
  console.log(`Imagem ${index + 1}:`, image.url); // Adicione este log
  return (
    <div
      key={image.id}
      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
            <div className="relative h-[500px] w-full">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 transform transition-transform duration-700 ease-out translate-y-0 opacity-100">
                    {`Nossa Trajetória - Parte ${index + 1}`}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 transform transition-transform duration-700 ease-out translate-y-0 opacity-100">
                    {index === 0 &&
                      "Fundada em 2005, a Siga Imóveis nasceu com o propósito de transformar a experiência de compra e venda de imóveis."}
                    {index === 1 &&
                      "Nossa primeira sede, onde começamos a construir nossa história no mercado imobiliário."}
                    {index === 2 && "Ao longo dos anos, expandimos nossa atuação para diversas regiões de São Paulo."}
                    {index === 3 &&
                      "Nossa equipe de profissionais altamente qualificados trabalha para oferecer o melhor atendimento."}
                    {index === 4 &&
                      "Investimos constantemente em tecnologia e inovação para melhorar a experiência do cliente."}
                    {index === 5 &&
                      "Nossos escritórios modernos proporcionam um ambiente acolhedor para nossos clientes."}
                    {index === 6 &&
                      "Realizamos eventos e workshops para compartilhar conhecimento sobre o mercado imobiliário."}
                    {index === 7 &&
                      "Parcerias estratégicas nos permitem oferecer as melhores oportunidades de negócio."}
                    {index === 8 && "Nosso compromisso com a qualidade é reconhecido por clientes e parceiros."}
                    {index === 9 && "Celebramos cada conquista e cada sonho realizado junto com nossos clientes."}
                    {index === 10 &&
                      "Hoje, somos referência no mercado imobiliário, com milhares de clientes satisfeitos."}
                  </p>
                </div>
              </div>
      C

        {/* Controles do carrossel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 p-2 rounded-full text-gray-800 hover:bg-emerald-600 hover:text-white transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 p-2 rounded-full text-gray-800 hover:bg-emerald-600 hover:text-white transition-colors"
          aria-label="Próximo slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Nossa História */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Nossa História</h2>
            <p className="text-lg text-gray-600">
              A Siga Imóveis Sob Medida tem uma trajetória de sucesso e crescimento no mercado imobiliário. Conheça um
              pouco mais sobre nossa jornada e como nos tornamos referência no setor.
            </p>
          </div>

          <div className="relative">
            {/* Linha do tempo vertical */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-100"></div>

            <div className="space-y-12">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">2005</h3>
                  <p className="text-gray-600 mb-4">
                    Fundação da Siga Imóveis com foco inicial no mercado de locação residencial na zona sul de São
                    Paulo.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-800 z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-600">
                      "Começamos com uma pequena sala e grandes sonhos. Nossa missão era clara: transformar a
                      experiência imobiliária."
                    </p>
                    <p className="mt-2 font-medium">— Fundador da Siga Imóveis</p>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-600">
                      "A expansão para o mercado de vendas foi um passo natural. Nossos clientes de locação começaram a
                      nos procurar para comprar seus imóveis."
                    </p>
                    <p className="mt-2 font-medium">— Diretor Comercial</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center order-2 md:order-2">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-800 z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0 order-3 md:order-3">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">2010</h3>
                  <p className="text-gray-600 mb-4">
                    Expansão para o mercado de vendas de imóveis e abertura da segunda unidade na zona oeste de São
                    Paulo.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">2015</h3>
                  <p className="text-gray-600 mb-4">
                    Lançamento da plataforma digital e aplicativo para facilitar a busca de imóveis e melhorar a
                    experiência do cliente.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-800 z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-600">
                      "A transformação digital foi um divisor de águas para nós. Conseguimos alcançar mais clientes e
                      oferecer um serviço ainda melhor."
                    </p>
                    <p className="mt-2 font-medium">— Diretor de Tecnologia</p>
                  </div>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-1">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-600">
                      "Ser reconhecido como uma das melhores imobiliárias de São Paulo foi a confirmação de que
                      estávamos no caminho certo."
                    </p>
                    <p className="mt-2 font-medium">— CEO</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center order-2 md:order-2">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-800 z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0 order-3 md:order-3">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">2020</h3>
                  <p className="text-gray-600 mb-4">
                    Reconhecimento como uma das melhores imobiliárias de São Paulo e expansão para o mercado de imóveis
                    de alto padrão.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-2xl font-bold text-emerald-800 mb-3">Hoje</h3>
                  <p className="text-gray-600 mb-4">
                    Continuamos crescendo e inovando, sempre com o compromisso de oferecer o melhor serviço e as
                    melhores oportunidades para nossos clientes.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-100 bg-emerald-800 z-10"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <p className="italic text-gray-600">
                      "Olhamos para o futuro com otimismo e determinação. Nosso objetivo é continuar sendo referência no
                      mercado imobiliário."
                    </p>
                    <p className="mt-2 font-medium">— Equipe Siga Imóveis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Missão, Visão e Valores</h2>
            <p className="text-lg text-gray-600">
              Nossos princípios fundamentais guiam todas as nossas ações e decisões, garantindo que possamos oferecer
              sempre o melhor para nossos clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <TargetIcon className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Missão</h3>
              <p className="text-gray-600 text-center">
                Facilitar a realização do sonho da casa própria, oferecendo soluções imobiliárias personalizadas e um
                atendimento de excelência.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BuildingIcon className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Visão</h3>
              <p className="text-gray-600 text-center">
                Ser reconhecida como a imobiliária mais confiável e inovadora de São Paulo, expandindo nossa atuação
                para todo o Brasil.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AwardIcon className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Valores</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-800 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ética e transparência em todas as negociações</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-800 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Compromisso com a satisfação do cliente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-800 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Inovação constante em processos e serviços</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-800 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Responsabilidade social e ambiental</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Nossa Equipe</h2>
            <p className="text-lg text-gray-600">
              Contamos com profissionais altamente qualificados e comprometidos com a excelência no atendimento e na
              prestação de serviços.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=192&width=192&text=Equipe ${item}`}
                    alt={`Membro da equipe ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">{`Nome do Profissional ${item}`}</h3>
                <p className="text-emerald-800 font-medium mb-3">{`Cargo ${item}`}</p>
                <p className="text-gray-600 text-sm">
                  {`Profissional com mais de ${5 + item} anos de experiência no mercado imobiliário, especializado em ${
                    item === 1
                      ? "vendas de alto padrão"
                      : item === 2
                        ? "locação residencial"
                        : item === 3
                          ? "imóveis comerciais"
                          : "avaliação de imóveis"
                  }.`}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-emerald-800 hover:bg-emerald-900">
              <UsersIcon className="h-5 w-5 mr-2" />
              Conheça toda nossa equipe
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">O que nossos clientes dizem</h2>
            <p className="text-lg text-gray-600">
              A satisfação de nossos clientes é o nosso maior orgulho. Confira alguns depoimentos de quem já realizou
              negócios conosco.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-bold">{`Cliente ${item}`}</h4>
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
                  {item === 1 &&
                    "A Siga Imóveis me ajudou a encontrar o apartamento perfeito para minha família. O atendimento foi excelente e todo o processo foi muito tranquilo."}
                  {item === 2 &&
                    "Vendi meu imóvel com a Siga Imóveis e fiquei impressionado com a agilidade e profissionalismo. Conseguiram um ótimo valor e em tempo recorde."}
                  {item === 3 &&
                    "Já é a terceira vez que fecho negócio com a Siga Imóveis. A equipe é muito atenciosa e sempre encontra as melhores oportunidades para investimento."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Venha fazer parte da nossa história</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos ou a vender seu imóvel pelo melhor
            valor.
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
    </div>
  )
}
