"use client"

import { useState } from "react"
import { Building2, Calendar, Download, Filter, Plus, Search, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoClienteForm } from "@/app/components/forms/nuevo-cliente-form"

interface Cliente {
  id: string
  nombre: string
  tipo: "Empresa" | "Individual"
  rut: string
  industria: string
  estado: "Activo" | "Inactivo"
  email: string
  telefono: string
  ciudad: string
}

export default function ClientesPage() {
  const [openForm, setOpenForm] = useState(false)

  const clientes: Cliente[] = [
    {
      id: "CLI001",
      nombre: "Empresa A S.A.",
      tipo: "Empresa",
      rut: "76.123.456-7",
      industria: "Tecnología",
      estado: "Activo",
      email: "contacto@empresaa.com",
      telefono: "+56 2 2345 6789",
      ciudad: "Santiago",
    },
    {
      id: "CLI002",
      nombre: "Juan Pérez",
      tipo: "Individual",
      rut: "12.345.678-9",
      industria: "Consultoría",
      estado: "Activo",
      email: "juan.perez@email.com",
      telefono: "+56 9 8765 4321",
      ciudad: "Valparaíso",
    },
    // Más clientes...
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Cliente
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clientes"
          value="150"
          description="Clientes registrados"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{
            value: "+12.5%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Clientes Activos"
          value="132"
          description="Clientes con actividad reciente"
          icon={<Building2 className="h-4 w-4 text-primary" />}
          trend={{
            value: "+5.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Nuevos Clientes"
          value="8"
          description="Últimos 30 días"
          icon={<Plus className="h-4 w-4 text-primary" />}
          trend={{
            value: "-2.3%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Retención"
          value="95.5%"
          description="Tasa de retención anual"
          icon={<Calendar className="h-4 w-4 text-primary" />}
          trend={{
            value: "+1.2%",
            label: "vs año anterior",
            positive: true,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directorio de Clientes</CardTitle>
          <CardDescription>Gestiona y visualiza todos tus clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar clientes..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todos</Button>
              <Button variant="outline">Empresas</Button>
              <Button variant="outline">Individuales</Button>
              <Button variant="outline">Activos</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>RUT</TableHead>
                  <TableHead>Industria</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">{cliente.id}</TableCell>
                    <TableCell>{cliente.nombre}</TableCell>
                    <TableCell>{cliente.tipo}</TableCell>
                    <TableCell>{cliente.rut}</TableCell>
                    <TableCell>{cliente.industria}</TableCell>
                    <TableCell>{cliente.email}</TableCell>
                    <TableCell>{cliente.telefono}</TableCell>
                    <TableCell>{cliente.ciudad}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          cliente.estado === "Activo"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {cliente.estado}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NuevoClienteForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}