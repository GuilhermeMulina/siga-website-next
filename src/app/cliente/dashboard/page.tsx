"use client"

import { useEffect, useState } from "react" 
import Link from "next/link"
import { CalendarIcon, HomeIcon, CreditCardIcon, BellIcon, HeartIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados
const mockData = {
  name: "João Silva",
  properties: [
    {
      id: 1,
      address: "Av. Paulista, 1000, Apto 123",
      type: "Apartamento",
      status: "Alugado",
      nextPayment: "10/05/2025",
      value: "R$ 2.500,00",
    },
  ],
  visits: [
    {
      id: 1,
      address: "Rua Augusta, 789, Apto 45",
      date: "15/05/2025",
      time: "14:30",
      status: "Confirmada",
    },
  ],
  notifications: [
    {
      id: 1,
      title: "Pagamento recebido",
      message: "Seu pagamento de R$ 2.500,00 foi confirmado.",
      date: "01/05/2025",
      read: false,
    },
    {
      id: 2,
      title: "Visita agendada",
      message: "Sua visita ao imóvel na Rua Augusta foi confirmada.",
      date: "30/04/2025",
      read: true,
    },
  ],
  favorites: [
    {
      id: 1,
      address: "Rua Bela Cintra, 456",
      type: "Casa",
      price: "R$ 750.000,00",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      address: "Alameda Santos, 123",
      type: "Apartamento",
      price: "R$ 3.200,00/mês",
      image: "/placeholder.svg?height=120&width=200",
    },
  ],
}

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUserData(mockData)
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
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button variant="outline" className="gap-2">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Notificações</span>
          {userData.notifications.filter((n: any) => !n.read).length > 0 && (
            <Badge className="ml-1 bg-emerald-800">{userData.notifications.filter((n: any) => !n.read).length}</Badge>
          )}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Imóveis Ativos</CardTitle>
            <HomeIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.properties.length}</div>
            <p className="text-xs text-muted-foreground">Imóveis alugados ou adquiridos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.properties[0]?.nextPayment || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {userData.properties[0]?.value || "Nenhum pagamento pendente"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Agendadas</CardTitle>
            <CalendarIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.visits.length}</div>
            <p className="text-xs text-muted-foreground">
              Próxima: {userData.visits[0]?.date || "Nenhuma visita agendada"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
            <HeartIcon className="h-4 w-4 text-emerald-800" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.favorites.length}</div>
            <p className="text-xs text-muted-foreground">Imóveis salvos para consulta</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Meus Imóveis</CardTitle>
            <CardDescription>Gerencie seus imóveis alugados ou adquiridos</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.properties.length > 0 ? (
              <div className="space-y-4">
                {userData.properties.map((property: any) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{property.address}</h3>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {property.type}
                        </Badge>
                        <Badge className="bg-emerald-800">{property.status}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/cliente/imoveis/${property.id}`}>Detalhes</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Você não possui imóveis ativos no momento.</p>
                <Button className="mt-4 bg-emerald-800 hover:bg-emerald-900">Explorar Imóveis</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Atualizações recentes sobre seus imóveis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.notifications.length > 0 ? (
                userData.notifications.map((notification: any) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-lg ${!notification.read ? "bg-emerald-50 border-emerald-200" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">{notification.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-6">Nenhuma notificação no momento.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Visitas</CardTitle>
            <CardDescription>Visitas agendadas aos imóveis</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.visits.length > 0 ? (
              <div className="space-y-4">
                {userData.visits.map((visit: any) => (
                  <div key={visit.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium">{visit.address}</h4>
                    <div className="flex items-center mt-2 text-sm">
                      <CalendarIcon className="h-4 w-4 mr-1 text-emerald-800" />
                      <span>
                        {visit.date} às {visit.time}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <Badge className="bg-emerald-800">{visit.status}</Badge>
                      <Button variant="outline" size="sm">
                        Reagendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Nenhuma visita agendada.</p>
                <Button className="mt-4 bg-emerald-800 hover:bg-emerald-900">Agendar Visita</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Imóveis Favoritos</CardTitle>
          <CardDescription>Imóveis que você salvou para consultar depois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userData.favorites.map((favorite: any) => (
              <div key={favorite.id} className="border rounded-lg overflow-hidden">
                <img
                  src={favorite.image || "/placeholder.svg"}
                  alt={favorite.address}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium truncate">{favorite.address}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline">{favorite.type}</Badge>
                    <span className="text-sm font-medium">{favorite.price}</span>
                  </div>
                  <div className="mt-3 flex justify-between">
                    <Button variant="outline" size="sm" className="w-full mr-2">
                      Ver Detalhes
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <HeartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
