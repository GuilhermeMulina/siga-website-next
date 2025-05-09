"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

export default function ServicosPage() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isRegimeCasamentoVisible, setIsRegimeCasamentoVisible] = useState(false)
  const [formData, setFormData] = useState({
    // Imóvel de interesse
    imovelEndereco: "",
    imovelBairro: "",
    imovelCidade: "",

    // Informações pessoais
    nome: "",
    email: "",
    dataNascimento: "",
    profissao: "",
    estadoCivil: "",
    regimeCasamento: "",
    rg: "",
    cpf: "",
    enderecoResidencial: "",
    bairroResidencial: "",
    telefone: "",
    pessoasImovel: "",

    // Informações profissionais
    empresa: "",
    tempoEmpresa: "",
    telefoneEmpresa: "",
    enderecoEmpresa: "",
    cargo: "",
    salario: "",

    // Cônjuge
    nomeConjuge: "",
    dataNascimentoConjuge: "",
    profissaoConjuge: "",
    rgConjuge: "",
    cpfConjuge: "",
    empresaConjuge: "",
    cargoConjuge: "",

    // Locação atual
    nomeLocador: "",
    valorAluguel: "",
    telefoneLocador: "",
    motivoMudanca: "",

    // Referências bancárias
    banco: "",
    agencia: "",
    contaCorrente: "",
    telefoneBanco: "",
    clienteDesde: "",

    // Termos
    termsAccept: false,
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    docIdentidade: null as File | null,
    docComprovante: null as File | null,
    docRenda: null as File | null,
  })

  const [fileInfo, setFileInfo] = useState({
    docIdentidade: "",
    docComprovante: "",
    docRenda: "",
  })

  const [fileStatus, setFileStatus] = useState({
    docIdentidade: "",
    docComprovante: "",
    docRenda: "",
  })

  // Seções do formulário para exibição/ocultação
  const [expandedSections, setExpandedSections] = useState({
    imovel: true,
    pessoal: true,
    profissional: true,
    conjuge: true,
    locacao: true,
    bancarias: true,
    documentos: true,
  })

  // Função para alternar a visibilidade de uma seção
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Função para mostrar/ocultar o campo de regime de casamento
  const toggleRegimeCasamento = (estadoCivil: string) => {
    setIsRegimeCasamentoVisible(estadoCivil === "casado" || estadoCivil === "uniao_estavel")
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

    // Verificar se é o campo de estado civil para mostrar/ocultar regime de casamento
    if (name === "estadoCivil") {
      toggleRegimeCasamento(value)
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
    if (!uploadedFiles.docIdentidade || !uploadedFiles.docComprovante || !uploadedFiles.docRenda) {
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
        router.push("/")
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
        <h1 className="text-center text-2xl md:text-3xl font-bold text-emerald-800 mb-10">
          FICHA CADASTRAL PARA LOCAÇÃO DE IMÓVEL / LOCATÁRIO PESSOA FÍSICA
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coluna do formulário */}
          <div className="flex-grow lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Imóvel de Interesse */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("imovel")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    IMÓVEL DE INTERESSE
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
                      <label htmlFor="imovelEndereco" className="block text-sm font-medium text-gray-700 mb-1">
                        ENDEREÇO:
                      </label>
                      <input
                        type="text"
                        id="imovelEndereco"
                        name="imovelEndereco"
                        value={formData.imovelEndereco}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="imovelBairro" className="block text-sm font-medium text-gray-700 mb-1">
                          BAIRRO:
                        </label>
                        <input
                          type="text"
                          id="imovelBairro"
                          name="imovelBairro"
                          value={formData.imovelBairro}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="imovelCidade" className="block text-sm font-medium text-gray-700 mb-1">
                          CIDADE/UF:
                        </label>
                        <input
                          type="text"
                          id="imovelCidade"
                          name="imovelCidade"
                          value={formData.imovelCidade}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações Pessoais */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("pessoal")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    INFORMAÇÕES PESSOAIS
                  </h2>
                  {expandedSections.pessoal ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.pessoal && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                        NOME:
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700 mb-1">
                          DATA NASCIMENTO:
                        </label>
                        <input
                          type="date"
                          id="dataNascimento"
                          name="dataNascimento"
                          value={formData.dataNascimento}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="profissao" className="block text-sm font-medium text-gray-700 mb-1">
                          PROFISSÃO:
                        </label>
                        <input
                          type="text"
                          id="profissao"
                          name="profissao"
                          value={formData.profissao}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="estadoCivil" className="block text-sm font-medium text-gray-700 mb-1">
                          ESTADO CIVIL:
                        </label>
                        <select
                          id="estadoCivil"
                          name="estadoCivil"
                          value={formData.estadoCivil}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Selecione</option>
                          <option value="solteiro">Solteiro(a)</option>
                          <option value="casado">Casado(a)</option>
                          <option value="divorciado">Divorciado(a)</option>
                          <option value="viuvo">Viúvo(a)</option>
                          <option value="uniao_estavel">União Estável</option>
                        </select>
                      </div>

                      {isRegimeCasamentoVisible && (
                        <div>
                          <label htmlFor="regimeCasamento" className="block text-sm font-medium text-gray-700 mb-1">
                            REGIME DE CASAMENTO:
                          </label>
                          <select
                            id="regimeCasamento"
                            name="regimeCasamento"
                            value={formData.regimeCasamento}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="">Selecione</option>
                            <option value="comunhao_parcial">Comunhão Parcial de Bens</option>
                            <option value="comunhao_universal">Comunhão Universal de Bens</option>
                            <option value="separacao_total">Separação Total de Bens</option>
                            <option value="participacao_final">Participação Final nos Aquestos</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="rg" className="block text-sm font-medium text-gray-700 mb-1">
                          Nº RG:
                        </label>
                        <input
                          type="text"
                          id="rg"
                          name="rg"
                          value={formData.rg}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                          Nº CPF/MF:
                        </label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="enderecoResidencial" className="block text-sm font-medium text-gray-700 mb-1">
                        ENDEREÇO RESIDENCIAL:
                      </label>
                      <input
                        type="text"
                        id="enderecoResidencial"
                        name="enderecoResidencial"
                        value={formData.enderecoResidencial}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="bairroResidencial" className="block text-sm font-medium text-gray-700 mb-1">
                        BAIRRO:
                      </label>
                      <input
                        type="text"
                        id="bairroResidencial"
                        name="bairroResidencial"
                        value={formData.bairroResidencial}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                        TELEFONE:
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="pessoasImovel" className="block text-sm font-medium text-gray-700 mb-1">
                        PESSOAS QUE IRÃO MORAR NO IMÓVEL:
                      </label>
                      <input
                        type="number"
                        id="pessoasImovel"
                        name="pessoasImovel"
                        min="1"
                        value={formData.pessoasImovel}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Informações Profissionais */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("profissional")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    INFORMAÇÕES PROFISSIONAIS
                  </h2>
                  {expandedSections.profissional ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.profissional && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                        EMPRESA ONDE TRABALHA:
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="tempoEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                          QUANTO TEMPO:
                        </label>
                        <input
                          type="text"
                          id="tempoEmpresa"
                          name="tempoEmpresa"
                          placeholder="Ex: 2 anos e 3 meses"
                          value={formData.tempoEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="telefoneEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE:
                        </label>
                        <input
                          type="tel"
                          id="telefoneEmpresa"
                          name="telefoneEmpresa"
                          placeholder="(00) 0000-0000"
                          value={formData.telefoneEmpresa}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="enderecoEmpresa" className="block text-sm font-medium text-gray-700 mb-1">
                        ENDEREÇO:
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                          CARGO/FUNÇÃO:
                        </label>
                        <input
                          type="text"
                          id="cargo"
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="salario" className="block text-sm font-medium text-gray-700 mb-1">
                          SALÁRIO/RETIRADA:
                        </label>
                        <input
                          type="text"
                          id="salario"
                          name="salario"
                          placeholder="R$ 0.000,00"
                          value={formData.salario}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cônjuge */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("conjuge")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    CÔNJUGE
                  </h2>
                  {expandedSections.conjuge ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.conjuge && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="nomeConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                        NOME DO CÔNJUGE:
                      </label>
                      <input
                        type="text"
                        id="nomeConjuge"
                        name="nomeConjuge"
                        value={formData.nomeConjuge}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="dataNascimentoConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                          DATA DE NASCIMENTO:
                        </label>
                        <input
                          type="date"
                          id="dataNascimentoConjuge"
                          name="dataNascimentoConjuge"
                          value={formData.dataNascimentoConjuge}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="profissaoConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                          PROFISSÃO:
                        </label>
                        <input
                          type="text"
                          id="profissaoConjuge"
                          name="profissaoConjuge"
                          value={formData.profissaoConjuge}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="rgConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                          Nº RG:
                        </label>
                        <input
                          type="text"
                          id="rgConjuge"
                          name="rgConjuge"
                          value={formData.rgConjuge}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="cpfConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                          Nº CPF/MF:
                        </label>
                        <input
                          type="text"
                          id="cpfConjuge"
                          name="cpfConjuge"
                          placeholder="000.000.000-00"
                          value={formData.cpfConjuge}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="empresaConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                        EMPRESA ONDE TRABALHA:
                      </label>
                      <input
                        type="text"
                        id="empresaConjuge"
                        name="empresaConjuge"
                        value={formData.empresaConjuge}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="cargoConjuge" className="block text-sm font-medium text-gray-700 mb-1">
                        CARGO:
                      </label>
                      <input
                        type="text"
                        id="cargoConjuge"
                        name="cargoConjuge"
                        value={formData.cargoConjuge}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Locação Atual */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div
                  className="flex justify-between items-center mb-4 cursor-pointer"
                  onClick={() => toggleSection("locacao")}
                >
                  <h2 className="text-xl font-semibold text-emerald-800 border-b border-gray-200 pb-2 w-full">
                    LOCAÇÃO ATUAL
                  </h2>
                  {expandedSections.locacao ? (
                    <ChevronUp className="h-5 w-5 text-emerald-800" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-800" />
                  )}
                </div>

                {expandedSections.locacao && (
                  <div className="space-y-4">
                    <div className="mb-4">
                      <label htmlFor="nomeLocador" className="block text-sm font-medium text-gray-700 mb-1">
                        NOME DO LOCADOR ATUAL:
                      </label>
                      <input
                        type="text"
                        id="nomeLocador"
                        name="nomeLocador"
                        value={formData.nomeLocador}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
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
                        <label htmlFor="telefoneLocador" className="block text-sm font-medium text-gray-700 mb-1">
                          TELEFONE LOCADOR/IMOBILIÁRIA:
                        </label>
                        <input
                          type="tel"
                          id="telefoneLocador"
                          name="telefoneLocador"
                          placeholder="(00) 0000-0000"
                          value={formData.telefoneLocador}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="motivoMudanca" className="block text-sm font-medium text-gray-700 mb-1">
                        MOTIVO DA MUDANÇA:
                      </label>
                      <textarea
                        id="motivoMudanca"
                        name="motivoMudanca"
                        rows={3}
                        value={formData.motivoMudanca}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      ></textarea>
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
                        <label htmlFor="contaCorrente" className="block text-sm font-medium text-gray-700 mb-1">
                          CONTA CORRENTE:
                        </label>
                        <input
                          type="text"
                          id="contaCorrente"
                          name="contaCorrente"
                          value={formData.contaCorrente}
                          onChange={handleInputChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>

                      <div>
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

                    <div className="mb-4">
                      <label htmlFor="clienteDesde" className="block text-sm font-medium text-gray-700 mb-1">
                        CLIENTE DESDE:
                      </label>
                      <input
                        type="text"
                        id="clienteDesde"
                        name="clienteDesde"
                        placeholder="Ex: Janeiro de 2018"
                        value={formData.clienteDesde}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="docIdentidade" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.docIdentidade === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.docIdentidade === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">RG/CNH (frente e verso)</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.docIdentidade && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.docIdentidade === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.docIdentidade}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="docIdentidade"
                          name="docIdentidade"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="docComprovante" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.docComprovante === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.docComprovante === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Comprovante de Residência</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.docComprovante && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.docComprovante === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.docComprovante}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="docComprovante"
                          name="docComprovante"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          required
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label htmlFor="docRenda" className="cursor-pointer">
                        <div
                          className={`border-2 ${fileStatus.docRenda === "success" ? "border-emerald-500 bg-emerald-50" : fileStatus.docRenda === "error" ? "border-red-500 bg-red-50" : "border-dashed border-gray-300"} rounded-lg p-4 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors`}
                        >
                          <Upload className="h-8 w-8 mx-auto mb-2 text-emerald-800" />
                          <div className="font-semibold text-gray-800 mb-1">Comprovante de Renda</div>
                          <div className="text-xs text-gray-500">Clique para selecionar</div>
                          {fileInfo.docRenda && (
                            <div
                              className={`mt-2 text-sm ${fileStatus.docRenda === "success" ? "text-emerald-600" : "text-red-600"}`}
                            >
                              {fileInfo.docRenda}
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="docRenda"
                          name="docRenda"
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

              <ul className="list-disc pl-5 text-sm text-gray-700 mb-6 space-y-2">
                <li>Documento de identidade (CNH ou RG e CPF);</li>
                <li>Certidão de casamento;</li>
                <li>Comprovante de endereço;</li>
              </ul>

              <h3 className="font-semibold text-gray-800 mt-6 mb-3">
                DECLARAÇÃO DE RENDIMENTOS (OBSERVAR AS OPÇÕES ABAIXO)
              </h3>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">EMPREGADO ASSALARIADO</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-2">
                <li>Carteira profissional (identificação e contrato de admissão);</li>
                <li>3 últimos comprovantes de salário;</li>
                <li>Declaração de imposto de renda atualizada com recibo de entrega à receita federal;</li>
              </ul>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">EMPREGADOR</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-2">
                <li>Contrato social consolidado e última alteração;</li>
                <li>Cartão do CNPJ;</li>
                <li>
                  Últimos três recibos de pró-labore com firma reconhecida do contador responsável pelas informações;
                </li>
                <li>Declaração de imposto de renda atualizada com recibo de entrega à receita federal.</li>
              </ul>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">AUTÔNOMO/PROFISSIONAL LIBERAL</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-2">
                <li>Inscrição na prefeitura;</li>
                <li>Comprovante de pagamento do ISS dos 3 últimos meses;</li>
                <li>Declaração de imposto de renda atualizada com recibo de entrega à receita federal;</li>
                <li>Extratos bancários dos últimos 3 meses.</li>
              </ul>

              <h4 className="font-semibold text-emerald-800 mt-4 mb-2">APOSENTADO/PENSIONISTA</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-2">
                <li>Comprovante de recebimento da aposentadoria ou pensão;</li>
                <li>Declaração de imposto de renda atualizada com recibo de entrega à receita federal;</li>
                <li>Extratos bancários dos últimos 3 meses.</li>
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
