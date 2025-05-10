"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingIcon,
  UsersIcon,
  AwardIcon,
  TargetIcon,
  CheckCircleIcon,
} from "lucide-react";

// Array com as 11 fotos da pasta public
const placeholderImages = [
  {
    id: 1,
    url: "/1.png",
    alt: "Imagem da empresa 1",
    title: "Nossa História",
    description:
      "Fundada em 2005, a Siga Imóveis nasceu com o propósito de transformar a experiência de compra e venda de imóveis.",
  },
  {
    id: 2,
    url: "/2.png",
    alt: "Imagem da empresa 2",
    title: "Nossa Primeira Sede",
    description:
      "Nossa primeira sede, onde começamos a construir nossa história no mercado imobiliário.",
  },
  {
    id: 3,
    url: "/3.png",
    alt: "Imagem da empresa 3",
    title: "Expansão",
    description:
      "Ao longo dos anos, expandimos nossa atuação para diversas regiões de São Paulo.",
  },
  {
    id: 4,
    url: "/4.png",
    alt: "Imagem da empresa 4",
    title: "Nossa Equipe",
    description:
      "Nossa equipe de profissionais altamente qualificados trabalha para oferecer o melhor atendimento.",
  },
  {
    id: 5,
    url: "/5.png",
    alt: "Imagem da empresa 5",
    title: "Inovação",
    description:
      "Investimos constantemente em tecnologia e inovação para melhorar a experiência do cliente.",
  },
  {
    id: 6,
    url: "/6.png",
    alt: "Imagem da empresa 6",
    title: "Ambiente de Trabalho",
    description:
      "Nossos escritórios modernos proporcionam um ambiente acolhedor para nossos clientes.",
  },
  {
    id: 7,
    url: "/7.png",
    alt: "Imagem da empresa 7",
    title: "Eventos",
    description:
      "Realizamos eventos e workshops para compartilhar conhecimento sobre o mercado imobiliário.",
  },
  {
    id: 8,
    url: "/8.png",
    alt: "Imagem da empresa 8",
    title: "Parcerias",
    description:
      "Parcerias estratégicas nos permitem oferecer as melhores oportunidades de negócio.",
  },
  {
    id: 9,
    url: "/9.png",
    alt: "Imagem da empresa 9",
    title: "Qualidade",
    description:
      "Nosso compromisso com a qualidade é reconhecido por clientes e parceiros.",
  },
  {
    id: 10,
    url: "/10.png",
    alt: "Imagem da empresa 10",
    title: "Celebrações",
    description:
      "Celebramos cada conquista e cada sonho realizado junto com nossos clientes.",
  },
  {
    id: 11,
    url: "/11.png",
    alt: "Imagem da empresa 11",
    title: "Referência",
    description:
      "Hoje, somos referência no mercado imobiliário, com milhares de clientes satisfeitos.",
  },
];

export default function Empresa() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      setCurrentSlide(index);

      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    const newIndex = (currentSlide + 1) % placeholderImages.length;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    const newIndex =
      (currentSlide - 1 + placeholderImages.length) % placeholderImages.length;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextSlide();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevSlide();
    }
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  console.log(
    "Imagens do carrossel:",
    placeholderImages.map((img) => img.url)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho da página */}
      <div className="bg-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre a Siga Imóveis
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conheça nossa história, valores e compromisso com a excelência no
            mercado imobiliário
          </p>
        </div>
      </div>

      {/* Carrossel de imagens */}
      <div
        className="relative overflow-hidden bg-gray-900 w-full aspect-[16/9] max-h-[1080px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {placeholderImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-contain md:object-cover"
              sizes="(max-width: 768px) 100vw, 1920px"
            />
          </div>
        ))}

        {/* Controles customizados do carrossel */}
        <div className="absolute inset-y-0 left-0 flex items-center px-4 z-20">
          <button
            onClick={prevSlide}
            className="bg-emerald-800 text-white p-2 rounded-full shadow-md hover:bg-emerald-700 transition"
            aria-label="Slide anterior"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 z-20">
          <button
            onClick={nextSlide}
            className="bg-emerald-800 text-white p-2 rounded-full shadow-md hover:bg-emerald-700 transition"
            aria-label="Próximo slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Indicadores atualizados */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white border-white w-5"
                  : "bg-white bg-opacity-50 border-gray-400 hover:bg-opacity-75"
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Nossa História
            </h2>
            <p className="text-lg text-gray-600">
              A Siga Imóveis Sob Medida tem uma trajetória de sucesso e
              crescimento no mercado imobiliário. Conheça um pouco mais sobre
              nossa jornada e como nos tornamos referência no setor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
