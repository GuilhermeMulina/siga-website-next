"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados
const mockVisits = {
  upcoming: [
    {
      id: 1,
      property: {
        id: 101,
        address: "Rua Augusta, 789, Apto 45",
        type: "Apartamento",
        price: "R$ 3.200,00/mês",
        image: "/placeholder.svg?height=120&width=200",
      },
      date: "15/05/2025",
      time: "14:30",
      status: "Confirmada",
      broker: "Ana Silva",
    },
  ],
  past: [
    {
      id: 2,
      property: {
        id: 102,
        address: "Alameda Santos, 123, Apto 67",
        type: "Apartamento",
        price: "R$ 2.800,00/mês",
        image: "/placeholder.svg?height=120&width=200",
      },
      date: "10/04/2025",
      time: "10:00",
      status: "Realizada",
      broker: "Carlos Oliveira",
    },
    {
      id: 3,
      property: {
        id: 103,
        address: "Rua Bela Cintra, 456",
        type: "Casa",
        price: "R$ 750.000,00",
        image: "/placeholder.svg?height=120&width=200",
      },
      date: "05/04/2025",
      time: "16:00",
      status: "Realizada",
      broker: "Ana Silva",
    },
  ],
  cancelled: [
    {
      id: 4,
      property: {
        id: 104,
        address: "Av. Rebouças, 1500, Apto 12",
        type: "Apartamento",
        price: "R$ 3.500,00/mês",
        image: "/placeholder.svg?height=120&width=200",
      },
      date: "01/04/2025",
      time: "09:30",
      status: "Cancelada",
      broker: "Carlos Oliveira",
      cancellationReason: "Solicitação do cliente",
    },
  ],
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setVisits(mockVisits)
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
        <h1 className="text-2xl font-bold tracking-tight">Visitas</h1>
        <Button className="bg-emerald-800 hover:bg-emerald-900">Agendar Nova Visita</Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Agendadas</TabsTrigger>
          <TabsTrigger value="past">Realizadas</TabsTrigger>
          <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Agendadas</CardTitle>
              <CardDescription>Visitas que estão programadas para acontecer</CardDescription>
            </CardHeader>
            <CardContent>
              {visits.upcoming.length > 0 ? (
                <div className="space-y-4">
                  {visits.upcoming.map((visit: any) => (
                    <div key={visit.id} className="border rounded-lg overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img
                            src={visit.property.image || "/placeholder.svg"}
                            alt={visit.property.address}
                            className="w-full h-40 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-wrap items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold">{visit.property.address}</h3>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">
                                  {visit.property.type}
                                </Badge>
                                <span className="text-sm font-medium">{visit.property.price}</span>
                              </div>
                            </div>
                            <Badge className="bg-emerald-800 mt-2 md:mt-0">{visit.status}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <CalendarIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Data</p>
                                <p className="font-medium">{visit.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Horário</p>
                                <p className="font-medium">{visit.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Corretor</p>
                                <p className="font-medium">{visit.broker}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              Ver Imóvel
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              Reagendar
                            </Button>
                            <Button variant="destructive" className="flex-1 sm:flex-none">
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma visita agendada</h3>
                  <p className="text-gray-500 mb-6">Você não possui visitas agendadas no momento.</p>
                  <Button className="bg-emerald-800 hover:bg-emerald-900">Agendar Visita</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Realizadas</CardTitle>
              <CardDescription>Histórico de visitas que já aconteceram</CardDescription>
            </CardHeader>
            <CardContent>
              {visits.past.length > 0 ? (
                <div className="space-y-4">
                  {visits.past.map((visit: any) => (
                    <div key={visit.id} className="border rounded-lg overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img
                            src={visit.property.image || "/placeholder.svg"}
                            alt={visit.property.address}
                            className="w-full h-40 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-wrap items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold">{visit.property.address}</h3>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">
                                  {visit.property.type}
                                </Badge>
                                <span className="text-sm font-medium">{visit.property.price}</span>
                              </div>
                            </div>
                            <Badge className="bg-green-600 mt-2 md:mt-0">{visit.status}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <CalendarIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Data</p>
                                <p className="font-medium">{visit.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Horário</p>
                                <p className="font-medium">{visit.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Corretor</p>
                                <p className="font-medium">{visit.broker}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              Ver Imóvel
                            </Button>
                            <Button className="flex-1 sm:flex-none bg-emerald-800 hover:bg-emerald-900">
                              Agendar Nova Visita
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CheckCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma visita realizada</h3>
                  <p className="text-gray-500 mb-6">Você ainda não realizou nenhuma visita.</p>
                  <Button className="bg-emerald-800 hover:bg-emerald-900">Agendar Visita</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Canceladas</CardTitle>
              <CardDescription>Visitas que foram canceladas</CardDescription>
            </CardHeader>
            <CardContent>
              {visits.cancelled.length > 0 ? (
                <div className="space-y-4">
                  {visits.cancelled.map((visit: any) => (
                    <div key={visit.id} className="border rounded-lg overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img
                            src={visit.property.image || "/placeholder.svg"}
                            alt={visit.property.address}
                            className="w-full h-40 md:h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-wrap items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold">{visit.property.address}</h3>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2">
                                  {visit.property.type}
                                </Badge>
                                <span className="text-sm font-medium">{visit.property.price}</span>
                              </div>
                            </div>
                            <Badge variant="destructive" className="mt-2 md:mt-0">
                              {visit.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center">
                              <CalendarIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Data</p>
                                <p className="font-medium">{visit.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 text-emerald-800 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Horário</p>
                                <p className="font-medium">{visit.time}</p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                              <div>
                                <p className="text-sm text-gray-500">Motivo</p>
                                <p className="font-medium">{visit.cancellationReason}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              Ver Imóvel
                            </Button>
                            <Button className="flex-1 sm:flex-none bg-emerald-800 hover:bg-emerald-900">
                              Reagendar Visita
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <XCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma visita cancelada</h3>
                  <p className="text-gray-500 mb-6">Você não possui visitas canceladas.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
