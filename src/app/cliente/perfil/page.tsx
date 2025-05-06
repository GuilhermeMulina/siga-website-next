"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { UserIcon, KeyIcon, BellIcon, ShieldIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dados simulados
const mockUserData = {
  name: "Guilherme Mulina",
  email: "guilhermemulina@gmail.com",
  phone: "(11) 98765-4321",
  cpf: "123.456.789-00",
  birthDate: "1985-05-15",
  address: {
    street: "Av. Paulista",
    number: "1000",
    complement: "Apto 123",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
  },
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<any>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUserData(mockUserData)
      setFormData(mockUserData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [key]: checked,
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulação de envio de dados
    setTimeout(() => {
      setUserData(formData)
      setIsEditing(false)
      setLoading(false)
    }, 1000)
  }

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Meu Perfil</h1>
        {!isEditing ? (
          <Button className="bg-emerald-800 hover:bg-emerald-900" onClick={() => setIsEditing(true)}>
            Editar Perfil
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              setFormData(userData)
              setIsEditing(false)
            }}
          >
            Cancelar Edição
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
              <img
                src="/perfil.jpg"
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Button variant="ghost" className="text-white hover:bg-black hover:bg-opacity-30">
                    Alterar
                  </Button>
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-gray-500 mt-1">{userData.email}</p>
            <p className="text-gray-500">{userData.phone}</p>

            <div className="mt-6 space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <UserIcon className="h-4 w-4 mr-2" />
                Meus Dados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <KeyIcon className="h-4 w-4 mr-2" />
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BellIcon className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ShieldIcon className="h-4 w-4 mr-2" />
                Privacidade
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 lg:col-span-4">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>Gerencie suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          name="cpf"
                          value={formData.cpf || ""}
                          onChange={handleInputChange}
                          disabled={true} // CPF não pode ser alterado
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          value={formData.birthDate || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end mt-6">
                        <Button type="submit" className="bg-emerald-800 hover:bg-emerald-900">
                          {loading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Gerencie seu endereço de correspondência</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          name="address.zipCode"
                          value={formData.address?.zipCode || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="street">Rua/Avenida</Label>
                        <Input
                          id="street"
                          name="address.street"
                          value={formData.address?.street || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Número</Label>
                        <Input
                          id="number"
                          name="address.number"
                          value={formData.address?.number || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complement">Complemento</Label>
                        <Input
                          id="complement"
                          name="address.complement"
                          value={formData.address?.complement || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input
                          id="neighborhood"
                          name="address.neighborhood"
                          value={formData.address?.neighborhood || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          name="address.city"
                          value={formData.address?.city || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado</Label>
                        <Input
                          id="state"
                          name="address.state"
                          value={formData.address?.state || ""}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end mt-6">
                        <Button type="submit" className="bg-emerald-800 hover:bg-emerald-900">
                          {loading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Configure como deseja receber notificações</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Notificações por Email</Label>
                          <p className="text-sm text-gray-500">
                            Receba atualizações sobre seus imóveis, pagamentos e visitas
                          </p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={formData.notifications?.email || false}
                          onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                          <p className="text-sm text-gray-500">Receba lembretes de visitas e pagamentos por SMS</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={formData.notifications?.sms || false}
                          onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Notificações Push</Label>
                          <p className="text-sm text-gray-500">Receba notificações em tempo real no seu navegador</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={formData.notifications?.push || false}
                          onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end mt-6">
                        <Button type="submit" className="bg-emerald-800 hover:bg-emerald-900">
                          {loading ? "Salvando..." : "Salvar Preferências"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
