"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Upload, CheckCircle, AlertCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"

export default function LocatarioPessoaJuridicaPage() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const [formData, setFormData] = useState({
    // Dados da empresa
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: "",
    inscricaoEstadual: "",
    dataFundacao: "",
    email: "",
    telefone: "",

    // Endereço da empresa
    enderecoEmpresa: "",
    bairroEmpresa: "",
    cidadeEmpresa: "",
    cepEmpresa: "",

    // Dados do representante legal
    nomeRepresentante: "",
    cpfRepresentante: "",
    rgRepresentante: "",
    cargoRepresentante: "",
    telefoneRepresentante: "",
    emailRepresentante: "",

    // Dados do imóvel pretendido
    enderecoImovel: "",
    bairroImovel: "",
    cidadeImovel: "",
    valorAluguel: "",
    finalidadeUso: "",

    // Referências bancárias
    banco: "",
    agencia: "",
    conta: "",
    gerente: "",
    telefoneBanco: "",

    // Referências comerciais
    fornecedor1: "",
    telefoneFornecedor1: "",
    fornecedor2: "",
    telefoneFornecedor2: "",

    // Termos
    termsAccept: false,
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    contratoSocial: null as File | null,
    cartaoCnpj: null as File | null,
    balanco: null as File | null,
    documentosRepresentante: null as File | null,
  })

  const [fileInfo, setFileInfo] = useState({
    contratoSocial: "",
    cartaoCnpj: "",
    balanco: "",
    documentosRepresentante: "",
  })

  const [fileStatus, setFileStatus] = useState({
    contratoSocial: "",
    cartaoCnpj: "",
    balanco: "",
    documentosRepresentante: "",
  })

  // Seções do formulário para exibição/ocultação
  const [expandedSections, setExpandedSections] = useState({
    empresa: true,
    endereco: true,
    representante: true,
    imovel: true,
    bancarias: true,
    comerciais: true,
    documentos: true,
  })

  // Função para alternar a visibilidade de uma seção
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Função para lidar com upload de arquivos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target

    if (files && files.length > 0) {
      const file = files[0]
      const fileName = file.name
      const fileSize = (file.size / 1024 / 1024).toFixed(2) // Tamanho em MB

      // Verificar se o arquivo é válido (PDF, JPG, JPEG, PNG)
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
      if (!validTypes.includes(file.type)) {
        setFileInfo({
          ...fileInfo,
          [name]: `Arquivo inválido. Use PDF, JPG ou PNG.`,
        })
        setFileStatus({
          ...fileStatus,
          [name]: "error",
        })
        return
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileInfo({
          ...fileInfo,
          [name]: `Arquivo muito grande (${fileSize}MB). Máximo 5MB.`,
        })
        setFileStatus({
          ...fileStatus,
          [name]: "error",
        })
        return
      }

      // Arquivo válido
      setUploadedFiles({
        ...uploadedFiles,
        [name]: file,
      })
      setFileInfo({
        ...fileInfo,
        [name]: `${fileName} (${fileSize}MB)`,
      })
      setFileStatus({
        ...fileStatus,
        [name]: "success",
      })
    }
  }

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Verificar se todos os arquivos foram enviados
    if (
      !uploadedFiles.contratoSocial ||
      !uploadedFiles.cartaoCnpj ||
      !uploadedFiles.balanco ||
      !uploadedFiles.documentosRepresentante
    ) {
      setNotificationMessage("Por favor, envie todos os documentos necessários.")
      setShowNotification(true)
      return
    }

    // Verificar se os termos foram aceitos
    if (!formData.termsAccept) {
      setNotificationMessage("Por favor, aceite os termos para continuar.")
      setShowNotification(true)
      return
    }

    try {
      // Aqui você implementaria a lógica para enviar os dados para o servidor
      // Por exemplo, usando fetch ou axios

      // Simulação de envio bem-sucedido
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setNotificationMessage("Formulário enviado com sucesso! Entraremos em contato em breve.")
      setShowNotification(true)

      // Redirecionar após alguns segundos
      setTimeout(() => {
        router.push("/servicos")
      }, 3000)
    } catch (error) {
      setNotificationMessage("Erro ao enviar o formulário. Por favor, tente novamente.")
      setShowNotification(true)
    }
  }

  // Função para fechar a notificação
  const closeNotification = () => {
    setShowNotification(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/servicos"
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Voltar para Serviços</span>
          </Link>
        </div>

        <h1 className="text-center text-2xl md:text-3xl font-bold text-emerald-800 mb-10">
          FICHA CADASTRAL PARA LOCAÇÃO DE IMÓVEL / LOCATÁRIO PESSOA JURÍDICA
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna do formulário */}
          <div className="flex-grow lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados da Empresa */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("empresa")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    DADOS DA EMPRESA
                  </h2>
                  {expandedSections.empresa ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.empresa && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-700 mb-1">
                        RAZÃO SOCIAL:
                      </label>
                      <input
                        type="text"
                        id="razaoSocial"
                        name="razaoSocial"
                        value={formData.razaoSocial}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="nomeFantasia" className="block text-sm font-medium text-gray-700 mb-1">
                        NOME FANTASIA:
                      </label>
                      <input
                        type="text"
                        id="nomeFantasia"
                        name="nomeFantasia"
                        value={formData.nomeFantasia}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">
                          CNPJ:
                        </label>
                        <input
                          type="text"
                          id="cnpj"
                          name="cnpj"
                          placeholder="00.000.000/0000-00"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="inscricaoEstadual" className="block text-sm font-medium text-gray-700 mb-1">
                          INSCRIÇÃO ESTADUAL:
                        </label>
                        <input
                          type="text"
                          id="inscricaoEstadual"
                          name="inscricaoEstadual"
                          value={formData.inscricaoEstadual}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dataFundacao" className="block text-sm font-medium text-gray-700 mb-1">
                          DATA DE FUNDAÇÃO:
                        </label>
                        <input
                          type="date"
                          id="dataFundacao"
                          name="dataFundacao"
                          value={formData.dataFundacao}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE:
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          placeholder="(00) 0000-0000"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        EMAIL:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Endereço da Empresa */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("endereco")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    ENDEREÇO DA EMPRESA
                  </h2>
                  {expandedSections.endereco ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.endereco && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="enderecoEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                        ENDEREÇO COMPLETO:
                      </label>
                      <input
                        type="text"
                        id="enderecoEmpresa"
                        name="enderecoEmpresa"
                        value={formData.enderecoEmpresa}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="bairroEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                          BAIRRO:
                        </label>
                        <input
                          type="text"
                          id="bairroEmpresa"
                          name="bairroEmpresa"
                          value={formData.bairroEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cidadeEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                          CIDADE/UF:
                        </label>
                        <input
                          type="text"
                          id="cidadeEmpresa"
                          name="cidadeEmpresa"
                          value={formData.cidadeEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cepEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                          CEP:
                        </label>
                        <input
                          type="text"
                          id="cepEmpresa"
                          name="cepEmpresa"
                          placeholder="00000-000"
                          value={formData.cepEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Representante Legal */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("representante")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    REPRESENTANTE LEGAL
                  </h2>
                  {expandedSections.representante ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.representante && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="nomeRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                        NOME COMPLETO:
                      </label>
                      <input
                        type="text"
                        id="nomeRepresentante"
                        name="nomeRepresentante"
                        value={formData.nomeRepresentante}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cpfRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                          CPF:
                        </label>
                        <input
                          type="text"
                          id="cpfRepresentante"
                          name="cpfRepresentante"
                          placeholder="000.000.000-00"
                          value={formData.cpfRepresentante}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="rgRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                          RG:
                        </label>
                        <input
                          type="text"
                          id="rgRepresentante"
                          name="rgRepresentante"
                          value={formData.rgRepresentante}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="cargoRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                        CARGO:
                      </label>
                      <input
                        type="text"
                        id="cargoRepresentante"
                        name="cargoRepresentante"
                        value={formData.cargoRepresentante}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="telefoneRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE:
                        </label>
                        <input
                          type="tel"
                          id="telefoneRepresentante"
                          name="telefoneRepresentante"
                          placeholder="(00) 00000-0000"
                          value={formData.telefoneRepresentante}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="emailRepresentante" className="block text-sm font-medium text-gray-700 mb-1">
                          EMAIL:
                        </label>
                        <input
                          type="email"
                          id="emailRepresentante"
                          name="emailRepresentante"
                          value={formData.emailRepresentante}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Imóvel Pretendido */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("imovel")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    IMÓVEL PRETENDIDO
                  </h2>
                  {expandedSections.imovel ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.imovel && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="enderecoImovel" className="block text-sm font-medium text-gray-700 mb-1">
                        ENDEREÇO:
                      </label>
                      <input
                        type="text"
                        id="enderecoImovel"
                        name="enderecoImovel"
                        value={formData.enderecoImovel}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="bairroImovel" className="block text-sm font-medium text-gray-700 mb-1">
                          BAIRRO:
                        </label>
                        <input
                          type="text"
                          id="bairroImovel"
                          name="bairroImovel"
                          value={formData.bairroImovel}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cidadeImovel" className="block text-sm font-medium text-gray-700 mb-1">
                          CIDADE/UF:
                        </label>
                        <input
                          type="text"
                          id="cidadeImovel"
                          name="cidadeImovel"
                          value={formData.cidadeImovel}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="valorAluguel" className="block text-sm font-medium text-gray-700 mb-1">
                          VALOR DO ALUGUEL:
                        </label>
                        <input
                          type="text"
                          id="valorAluguel"
                          name="valorAluguel"
                          placeholder="R$ 0.000,00"
                          value={formData.valorAluguel}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="finalidadeUso" className="block text-sm font-medium text-gray-700 mb-1">
                          FINALIDADE DE USO:
                        </label>
                        <input
                          type="text"
                          id="finalidadeUso"
                          name="finalidadeUso"
                          value={formData.finalidadeUso}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Referências Bancárias */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("bancarias")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    REFERÊNCIAS BANCÁRIAS
                  </h2>
                  {expandedSections.bancarias ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.bancarias && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-1">
                          BANCO:
                        </label>
                        <input
                          type="text"
                          id="banco"
                          name="banco"
                          value={formData.banco}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="agencia" className="block text-sm font-medium text-gray-700 mb-1">
                          AGÊNCIA:
                        </label>
                        <input
                          type="text"
                          id="agencia"
                          name="agencia"
                          value={formData.agencia}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="conta" className="block text-sm font-medium text-gray-700 mb-1">
                          CONTA:
                        </label>
                        <input
                          type="text"
                          id="conta"
                          name="conta"
                          value={formData.conta}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="gerente" className="block text-sm font-medium text-gray-700 mb-1">
                          GERENTE:
                        </label>
                        <input
                          type="text"
                          id="gerente"
                          name="gerente"
                          value={formData.gerente}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="telefoneBanco" className="block text-sm font-medium text-gray-700 mb-1">
                        TELEFONE:
                      </label>
                      <input
                        type="tel"
                        id="telefoneBanco"
                        name="telefoneBanco"
                        placeholder="(00) 0000-0000"
                        value={formData.telefoneBanco}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Referências Comerciais */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("comerciais")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    REFERÊNCIAS COMERCIAIS
                  </h2>
                  {expandedSections.comerciais ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.comerciais && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fornecedor1" className="block text-sm font-medium text-gray-700 mb-1">
                          FORNECEDOR 1:
                        </label>
                        <input
                          type="text"
                          id="fornecedor1"
                          name="fornecedor1"
                          value={formData.fornecedor1}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefoneFornecedor1" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE:
                        </label>
                        <input
                          type="tel"
                          id="telefoneFornecedor1"
                          name="telefoneFornecedor1"
                          placeholder="(00) 0000-0000"
                          value={formData.telefoneFornecedor1}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fornecedor2" className="block text-sm font-medium text-gray-700 mb-1">
                          FORNECEDOR 2:
                        </label>
                        <input
                          type="text"
                          id="fornecedor2"
                          name="fornecedor2"
                          value={formData.fornecedor2}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefoneFornecedor2" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE:
                        </label>
                        <input
                          type="tel"
                          id="telefoneFornecedor2"
                          name="telefoneFornecedor2"
                          placeholder="(00) 0000-0000"
                          value={formData.telefoneFornecedor2}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload de Documentos */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("documentos")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    UPLOAD DE DOCUMENTOS
                  </h2>
                  {expandedSections.documentos ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.documentos && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contratoSocial" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.contratoSocial === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.contratoSocial === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Contrato Social</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.contratoSocial && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.contratoSocial === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.contratoSocial}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="contratoSocial"
                          name="contratoSocial"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="cartaoCnpj" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.cartaoCnpj === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.cartaoCnpj === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Cartão CNPJ</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.cartaoCnpj && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.cartaoCnpj === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.cartaoCnpj}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="cartaoCnpj"
                          name="cartaoCnpj"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="balanco" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.balanco === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.balanco === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Balanço Patrimonial</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.balanco && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.balanco === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.balanco}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="balanco"
                          name="balanco"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="documentosRepresentante" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.documentosRepresentante === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.documentosRepresentante === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Documentos do Representante</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.documentosRepresentante && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.documentosRepresentante === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.documentosRepresentante}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="documentosRepresentante"
                          name="documentosRepresentante"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Termos e Envio */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="termsAccept"
                    name="termsAccept"
                    checked={formData.termsAccept as boolean}
                    onChange={(e) => setFormData({ ...formData, termsAccept: e.target.checked })}
                    required
                    className="mt-1 mr-3 h-4 w-4 text-emerald-800 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="termsAccept" className="text-sm text-gray-600">
                    Declaro que as informações fornecidas são verdadeiras e autorizo a consulta aos órgãos de proteção
                    ao crédito.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-6 rounded-md uppercase tracking-wider transition-colors transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Enviar Formulário
                </button>
              </div>
            </form>
          </div>

          {/* Coluna de documentos */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 mb-4">
                RELAÇÃO DE DOCUMENTOS
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Obs: Os documentos abaixo relacionados deverão ser apresentados em cópias autenticadas ou digitalizados
                nos originais e encaminhados por e-mail.
              </p>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">DOCUMENTOS DA EMPRESA</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-6 space-y-2">
                <li>Contrato social e última alteração contratual;</li>
                <li>Cartão CNPJ atualizado;</li>
                <li>Balanço patrimonial e DRE do último exercício;</li>
                <li>Faturamento dos últimos 12 meses;</li>
                <li>Declaração de imposto de renda da empresa;</li>
                <li>Comprovante de endereço da empresa.</li>
              </ul>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">DOCUMENTOS DO REPRESENTANTE LEGAL</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-6 space-y-2">
                <li>Documento de identidade (RG e CPF);</li>
                <li>Comprovante de residência;</li>
                <li>Declaração de imposto de renda pessoa física;</li>
                <li>Comprovante de estado civil (certidão de casamento ou similar).</li>
              </ul>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">DOCUMENTOS FINANCEIROS</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-2">
                <li>Extratos bancários dos últimos 3 meses;</li>
                <li>Certidões negativas (INSS, FGTS, Receita Federal);</li>
                <li>Referências comerciais (fornecedores).</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Notificação */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-emerald-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-md animate-slide-in-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {notificationMessage.includes("sucesso") ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <span>{notificationMessage}</span>
            </div>
            <button onClick={closeNotification} className="ml-4 text-white hover:text-gray-200 transition-colors">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
