import Link from "next/link"
import { ArrowLeft, FileText, Download } from "lucide-react"

export default function SeguroFiancaPJPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/servicos" className="flex items-center text-amber-600 hover:text-amber-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Serviços
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seguro Fiança Locatício - Pessoa Jurídica</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-start mb-6">
          <FileText className="h-8 w-8 text-amber-600 mr-4 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Instruções</h2>
            <p className="text-gray-700">
              O Seguro Fiança Locatício é uma alternativa ao fiador tradicional para empresas. Preencha todos os campos
              obrigatórios marcados com * para iniciar o processo de análise para contratação do seguro.
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded">
            <Download className="mr-2 h-4 w-4" />
            Baixar Formulário em PDF
          </button>
        </div>

        <form className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Dados da Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Razão Social *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Fantasia</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inscrição Estadual</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fundação *</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ramo de Atividade *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Endereço da Empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Dados do Imóvel Pretendido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço do Imóvel *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Aluguel (R$) *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prazo do Contrato (meses) *</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Finalidade *</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="misto">Misto</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Dados do Representante Legal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RG *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Comercial *</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail Comercial *</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
                <input
                  type="url"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-gray-700">
                  Autorizo a consulta aos órgãos de proteção ao crédito *
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded">
                Limpar
              </button>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded">
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
