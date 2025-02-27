"use client"

import { useState } from "react"
import { Contact2, Download, Filter, Mail, Phone, Plus, Search, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoContactoForm } from "@/app/components/forms/nuevo-contacto-form"

interface Contacto {
  id: string
  nombre: string
  empresa: string
  cargo: string
  email: string
  telefono: string
  telefono_movil: string
  es_principal: boolean
}

export default function ContactosPage() {
  const [openForm, setOpenForm] = useState(false)

  const contactos: Contacto[] = [
    {
      id: "CON001",
      nombre: "Ana Martínez",
      empresa: "Empresa A S.A.",
      cargo: "Gerente Comercial",
      email: "ana.martinez@empresaa.com",
      telefono: "+56 2 2345 6789",
      telefono_movil: "+56 9 8765 4321",
      es_principal: true,
    },
    {
      id: "CON002",
      nombre: "Carlos López",
      empresa: "Empresa B Ltda.",
      cargo: "Director de Operaciones",
      email: "carlos.lopez@empresab.com",
      telefono: "+56 2 3456 7890",
      telefono_movil: "+56 9 7654 3210",
      es_principal: false,
    },
    // Más contactos...
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Contact2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Contactos</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Contacto
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Contactos"
          value="245"
          description="Contactos registrados"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{
            value: "+8.3%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Contactos Principales"
          value="150"
          description="Contactos principales por empresa"
          icon={<Contact2 className="h-4 w-4 text-primary" />}
          trend={{
            value: "+3.1%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Emails Enviados"
          value="1,234"
          description="Últimos 30 días"
          icon={<Mail className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Llamadas Realizadas"
          value="568"
          description="Últimos 30 días"
          icon={<Phone className="h-4 w-4 text-primary" />}
          trend={{
            value: "+4.8%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directorio de Contactos</CardTitle>
          <CardDescription>Gestiona y visualiza todos tus contactos comerciales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar contactos..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todos</Button>
              <Button variant="outline">Principales</Button>
              <Button variant="outline">Por Empresa</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Móvil</TableHead>
                  <TableHead>Principal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactos.map((contacto) => (
                  <TableRow key={contacto.id}>
                    <TableCell className="font-medium">{contacto.id}</TableCell>
                    <TableCell>{contacto.nombre}</TableCell>
                    <TableCell>{contacto.empresa}</TableCell>
                    <TableCell>{contacto.cargo}</TableCell>
                    <TableCell>{contacto.email}</TableCell>
                    <TableCell>{contacto.telefono}</TableCell>
                    <TableCell>{contacto.telefono_movil}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          contacto.es_principal
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {contacto.es_principal ? "Principal" : "Secundario"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NuevoContactoForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

