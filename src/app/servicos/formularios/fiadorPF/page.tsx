"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FileText, Download } from "lucide-react"

export default function FiadorPessoaFisicaPage() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isRegimeCasamentoVisible, setIsRegimeCasamentoVisible] = useState(false)
  const [formData, setFormData] = useState({
    // Dados do imóvel
    enderecoImovel: "",
    bairroImovel: "",
    cidadeImovel: "",

    // Dados do locatário
    nomeLocatario: "",

    // Dados pessoais do fiador
    nome: "",
    email: "",
    dataNascimento: "",
    nacionalidade: "",
    profissao: "",
    estadoCivil: "",
    regimeCasamento: "",
    rg: "",
    cpf: "",
    enderecoResidencial: "",
    bairroResidencial: "",
    cidadeResidencial: "",
    cepResidencial: "",
    telefoneResidencial: "",
    celular: "",
    tempoResidencia: "",
    tipoImovel: "",

    // Dados profissionais
    empresa: "",
    cnpjEmpresa: "",
    cargoFuncao: "",
    tempoEmpresa: "",
    enderecoEmpresa: "",
    bairroEmpresa: "",
    cidadeEmpresa: "",
    telefoneEmpresa: "",
    salario: "",
    outrasRendas: "",

    // Cônjuge
    nomeConjuge: "",
    dataNascimentoConjuge: "",
    nacionalidadeConjuge: "",
    profissaoConjuge: "",
    rgConjuge: "",
    cpfConjuge: "",
    empresaConjuge: "",
    cargoConjuge: "",
    telefoneEmpresaConjuge: "",
    salarioConjuge: "",

    // Referências bancárias
    banco: "",
    agencia: "",
    contaCorrente: "",
    clienteDesde: "",

    // Bens imóveis
    imovel1Endereco: "",
    imovel1Valor: "",
    imovel2Endereco: "",
    imovel2Valor: "",

    // Veículos
    veiculo1Modelo: "",
    veiculo1Ano: "",
    veiculo1Valor: "",
    veiculo2Modelo: "",
    veiculo2Ano: "",
    veiculo2Valor: "",

    // Termos
    termsAccept: false,
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    docIdentidade: null as File | null,
    docCpf: null as File | null,
    docComprovante: null as File | null,
    docRenda: null as File | null,
    docIrpf: null as File | null,
  })

  const [fileInfo, setFileInfo] = useState({
    docIdentidade: "",
    docCpf: "",
    docComprovante: "",
    docRenda: "",
    docIrpf: "",
  })

  const [fileStatus, setFileStatus] = useState({
    docIdentidade: "",
    docCpf: "",
    docComprovante: "",
    docRenda: "",
    docIrpf: "",
  })

  // Seções do formulário para exibição/ocultação
  const [expandedSections, setExpandedSections] = useState({
    imovel: true,
    pessoal: true,
    profissional: true,
    conjuge: true,
    bancarias: true,
    bens: true,
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
    if (
      !uploadedFiles.docIdentidade ||
      !uploadedFiles.docCpf ||
      !uploadedFiles.docComprovante ||
      !uploadedFiles.docRenda ||
      !uploadedFiles.docIrpf
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
    <div className="container mx-auto px-4 py-8">
      <Link href="/servicos" className="flex items-center text-amber-600 hover:text-amber-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Serviços
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ficha Cadastral - Fiador Pessoa Física</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-start mb-6">
          <FileText className="h-8 w-8 text-amber-600 mr-4 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Instruções</h2>
            <p className="text-gray-700">
              Preencha todos os campos obrigatórios marcados com *. Após o preenchimento, você poderá enviar o
              formulário eletronicamente ou baixá-lo para impressão.
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
            <h3 className="text-lg font-medium text-gray-800 mb-4">Dados Pessoais</h3>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Endereço</h3>
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
            <h3 className="text-lg font-medium text-gray-800 mb-4">Dados Profissionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profissão *</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Renda Mensal *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Fixo</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Celular *</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded">
              Limpar
            </button>
            <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
