import Link from "next/link"
import Image from "next/image"

export default function FormulariosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Imagem grande no topo */}
      <div className="relative w-full h-[300px] mb-8">
        <Image src="/images/formularios-header.png" alt="Formulários" fill className="object-cover" priority />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">FORMULÁRIOS</h1>

      <p className="text-gray-700 mb-8 italic">
        Área reservada para corretores e clientes interessados na locação de imóveis sob gestão da Siga Imóveis.
        Disponibilizamos formulários, relação de documentos para análise cadastral e modalidades de garantia para a
        locação dos nossos imóveis.
      </p>

      <div className="grid gap-8">
        {/* Ficha Cadastral Locatário */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">FICHA CADASTRAL LOCATÁRIO</h2>
          <div className="flex flex-col space-y-2">
            <Link
              href="/servicos/formularios/locatarioPJ"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              LOCATÁRIO PESSOA FÍSICA
            </Link>
            <Link
              href="/servicos/formularios/locatarioPF"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              LOCATÁRIO PESSOA JURÍDICA
            </Link>
          </div>
        </div>

        {/* Ficha Cadastral Fiador */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">FICHA CADASTRAL FIADOR</h2>
          <div className="flex flex-col space-y-2">
            <Link
              href="/servicos/formularios/fiadorPF"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              FIADOR PESSOA FÍSICA
            </Link>
            <Link
              href="/servicos/formularios/fiadorPJ"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              FIADOR PESSOA JURÍDICA
            </Link>
          </div>
        </div>

        {/* Garantia através de Seguro Fiança Locatício */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">GARANTIA ATRAVÉS DE SEGURO FIANÇA LOCATÍCIO</h2>
          <div className="flex flex-col space-y-2">
            <Link
              href="/servicos/formularios/seguroPF"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              LOCATÁRIO PESSOA FÍSICA
            </Link>
            <Link
              href="/servicos/formularios/seguroPJ"
              className="text-amber-600 hover:text-amber-800 font-medium"
            >
              LOCATÁRIO PESSOA JURÍDICA
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
