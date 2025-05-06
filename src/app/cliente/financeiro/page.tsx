"use client"

import { useState, useEffect } from "react"
import { CreditCardIcon, ReceiptIcon, ArrowDownIcon, ArrowUpIcon, FileTextIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados
const mockFinancialData = {
  summary: {
    totalPending: "R$ 2.500,00",
    nextPayment: "10/05/2025",
    lastPayment: {
      date: "10/04/2025",
      value: "R$ 2.500,00",
    },
  },
  payments: [
    {
      id: 1,
      reference: "Janeiro/2025",
      property: "Av. Paulista, 1000, Apto 123",
      dueDate: "10/01/2025",
      value: "R$ 2.500,00",
      status: "Pago",
      paymentDate: "08/01/2025",
    },
    {
      id: 2,
      reference: "Fevereiro/2025",
      property: "Av. Paulista, 1000, Apto 123",
      dueDate: "10/02/2025",
      value: "R$ 2.500,00",
      status: "Pago",
      paymentDate: "09/02/2025",
    },
    {
      id: 3,
      reference: "Março/2025",
      property: "Av. Paulista, 1000, Apto 123",
      dueDate: "10/03/2025",
      value: "R$ 2.500,00",
      status: "Pago",
      paymentDate: "10/03/2025",
    },
    {
      id: 4,
      reference: "Abril/2025",
      property: "Av. Paulista, 1000, Apto 123",
      dueDate: "10/04/2025",
      value: "R$ 2.500,00",
      status: "Pago",
      paymentDate: "10/04/2025",
    },
    {
      id: 5,
      reference: "Maio/2025",
      property: "Av. Paulista, 1000, Apto 123",
      dueDate: "10/05/2025",
      value: "R$ 2.500,00",
      status: "Pendente",
      paymentDate: null,
    },
  ],
  invoices: [
    {
      id: 1,
      reference: "Janeiro/2025",
      property: "Av. Paulista, 1000, Apto 123",
      issueDate: "01/01/2025",
      dueDate: "10/01/2025",
      value: "R$ 2.500,00",
      status: "Pago",
    },
    {
      id: 2,
      reference: "Fevereiro/2025",
      property: "Av. Paulista, 1000, Apto 123",
      issueDate: "01/02/2025",
      dueDate: "10/02/2025",
      value: "R$ 2.500,00",
      status: "Pago",
    },
    {
      id: 3,
      reference: "Março/2025",
      property: "Av. Paulista, 1000, Apto 123",
      issueDate: "01/03/2025",
      dueDate: "10/03/2025",
      value: "R$ 2.500,00",
      status: "Pago",
    },
    {
      id: 4,
      reference: "Abril/2025",
      property: "Av. Paulista, 1000, Apto 123",
      issueDate: "01/04/2025",
      dueDate: "10/04/2025",
      value: "R$ 2.500,00",
      status: "Pago",
    },
    {
      id: 5,
      reference: "Maio/2025",
      property: "Av. Paulista, 1000, Apto 123",
      issueDate: "01/05/2025",
      dueDate: "10/05/2025",
      value: "R$ 2.500,00",
      status: "Pendente",
    },
  ],
}

export default function FinancialPage() {
  const [financialData, setFinancialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFinancialData(mockFinancialData)
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
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <Button className="bg-emerald-800 hover:bg-emerald-900">Métodos de Pagamento</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialData.summary.nextPayment}</div>
            <p className="text-xs text-muted-foreground">Valor: {financialData.summary.totalPending}</p>
            <Button className="w-full mt-4 bg-emerald-800 hover:bg-emerald-900">Pagar Agora</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Pagamento</CardTitle>
            <ReceiptIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{financialData.summary.lastPayment.date}</div>
            <p className="text-xs text-muted-foreground">Valor: {financialData.summary.lastPayment.value}</p>
            <Button variant="outline" className="w-full mt-4">
              Ver Recibo
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Histórico Financeiro</CardTitle>
            <FileTextIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <ArrowUpIcon className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm">Saídas</span>
                </div>
                <p className="text-lg font-medium">R$ 10.000,00</p>
              </div>
              <div>
                <div className="flex items-center">
                  <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm">Entradas</span>
                </div>
                <p className="text-lg font-medium">R$ 0,00</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Exportar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>Visualize todos os seus pagamentos realizados e pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referência
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imóvel
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
                    {financialData.payments.map((payment: any) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.reference}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{payment.property}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{payment.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{payment.value}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={payment.status === "Pago" ? "bg-green-600" : "bg-amber-500"}>
                            {payment.status}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturas</CardTitle>
              <CardDescription>Visualize todas as suas faturas emitidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referência
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Imóvel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Emissão
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
                    {financialData.invoices.map((invoice: any) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{invoice.reference}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{invoice.property}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{invoice.issueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{invoice.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">{invoice.value}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={invoice.status === "Pago" ? "bg-green-600" : "bg-amber-500"}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm">
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
