"use client"

import { useState, useEffect } from "react"
import { FileTextIcon, HomeIcon, KeyIcon, ClipboardCheckIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados
const mockProperties = [
  {
    id: 1,
    address: "Av. Paulista, 1000, Apto 123",
    type: "Apartamento",
    status: "Alugado",
    contract: {
      number: "CT-2025-0123",
      startDate: "01/01/2025",
      endDate: "31/12/2025",
      value: "R$ 2.500,00",
    },
    documents: [
      { id: 1, name: "Contrato de Locação", type: "PDF", date: "01/01/2025" },
      { id: 2, name: "Vistoria Inicial", type: "PDF", date: "01/01/2025" },
    ],
    payments: [
      { id: 1, reference: "Janeiro/2025", dueDate: "10/01/2025", value: "R$ 2.500,00", status: "Pago" },
      { id: 2, reference: "Fevereiro/2025", dueDate: "10/02/2025", value: "R$ 2.500,00", status: "Pago" },
      { id: 3, reference: "Março/2025", dueDate: "10/03/2025", value: "R$ 2.500,00", status: "Pago" },
      { id: 4, reference: "Abril/2025", dueDate: "10/04/2025", value: "R$ 2.500,00", status: "Pago" },
      { id: 5, reference: "Maio/2025", dueDate: "10/05/2025", value: "R$ 2.500,00", status: "Pendente" },
    ],
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProperties(mockProperties)
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meus Imóveis</h1>
        <Button className="bg-emerald-800 hover:bg-emerald-900">Solicitar Assistência</Button>
      </div>

      {properties.length > 0 ? (
        <div className="space-y-6">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 lg:w-1/4">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.address}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3 lg:w-3/4">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">{property.address}</h2>
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="mr-2">
                          {property.type}
                        </Badge>
                        <Badge className="bg-emerald-800">{property.status}</Badge>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <p className="text-sm text-gray-500">Contrato: {property.contract.number}</p>
                      <p className="text-sm text-gray-500">
                        Vigência: {property.contract.startDate} a {property.contract.endDate}
                      </p>
                      <p className="font-medium mt-1">Valor: {property.contract.value}</p>
                    </div>
                  </div>

                  <Tabs defaultValue="details" className="mt-6">
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="details" className="flex items-center">
                        <HomeIcon className="h-4 w-4 mr-2" />
                        <span>Detalhes</span>
                      </TabsTrigger>
                      <TabsTrigger value="documents" className="flex items-center">
                        <FileTextIcon className="h-4 w-4 mr-2" />
                        <span>Documentos</span>
                      </TabsTrigger>
                      <TabsTrigger value="payments" className="flex items-center">
                        <KeyIcon className="h-4 w-4 mr-2" />
                        <span>Pagamentos</span>
                      </TabsTrigger>
                      <TabsTrigger value="requests" className="flex items-center">
                        <ClipboardCheckIcon className="h-4 w-4 mr-2" />
                        <span>Solicitações</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Informações do Imóvel</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Tipo:</span>
                              <span>{property.type}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Endereço:</span>
                              <span>{property.address}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Status:</span>
                              <span>{property.status}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Informações do Contrato</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Número:</span>
                              <span>{property.contract.number}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Início:</span>
                              <span>{property.contract.startDate}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Término:</span>
                              <span>{property.contract.endDate}</span>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <span className="text-gray-600">Valor:</span>
                              <span className="font-medium">{property.contract.value}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button variant="outline" className="mr-2">
                          Ver Contrato Completo
                        </Button>
                        <Button className="bg-emerald-800 hover:bg-emerald-900">Solicitar Manutenção</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents">
                      <div className="space-y-4">
                        <h3 className="font-medium">Documentos do Imóvel</h3>
                        <div className="border rounded-lg divide-y">
                          {property.documents.map((doc: any) => (
                            <div key={doc.id} className="flex items-center justify-between p-4">
                              <div className="flex items-center">
                                <FileTextIcon className="h-5 w-5 text-emerald-800 mr-3" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-gray-500">Adicionado em: {doc.date}</p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                Visualizar
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end mt-4">
                          <Button className="bg-emerald-800 hover:bg-emerald-900">Solicitar Novo Documento</Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="payments">
                      <div className="space-y-4">
                        <h3 className="font-medium">Histórico de Pagamentos</h3>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Referência
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Vencimento
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Valor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {property.payments.map((payment: any) => (
                                <tr key={payment.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{payment.reference}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{payment.dueDate}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium">{payment.value}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge className={payment.status === "Pago" ? "bg-green-600" : "bg-amber-500"}>
                                      {payment.status === "Pago" ? "Pago" : "Pendente"}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {payment.status === "Pendente" ? (
                                      <Button size="sm" className="bg-emerald-800 hover:bg-emerald-900">
                                        Pagar
                                      </Button>
                                    ) : (
                                      <Button variant="outline" size="sm">
                                        Recibo
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="requests">
                      <div className="text-center py-8">
                        <h3 className="font-medium mb-2">Solicitações</h3>
                        <p className="text-gray-500 mb-4">Você não possui solicitações para este imóvel.</p>
                        <div className="flex justify-center space-x-4">
                          <Button className="bg-emerald-800 hover:bg-emerald-900">Solicitar Manutenção</Button>
                          <Button variant="outline">Reportar Problema</Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <HomeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Nenhum imóvel encontrado</h2>
          <p className="text-gray-500 mb-6">
            Você ainda não possui imóveis alugados ou adquiridos através da Siga Imóveis.
          </p>
          <Button className="bg-emerald-800 hover:bg-emerald-900">Explorar Imóveis Disponíveis</Button>
        </div>
      )}
    </div>
  )
}
