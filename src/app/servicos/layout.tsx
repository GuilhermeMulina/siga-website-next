import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Serviços | Siga Imóveis Sob Medida",
  description:
    "Conheça nossos serviços de locação, compra e venda de imóveis. Preencha nossa ficha cadastral para locação de imóvel.",
}

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
