"use client"

import { useState } from "react"
import { BarChart, Download, Filter, Plus, Search, Target, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevaOportunidadForm } from "@/app/components/forms/nueva-oportunidad-form"

interface Oportunidad {
  id: string
  titulo: string
  cliente: string
  valor: number
  etapa: "Prospecto" | "Contactado" | "Propuesta" | "Negociación" | "Ganada" | "Perdida"
  probabilidad: number
  fecha_cierre: string
  responsable: string
}

export default function OportunidadesPage() {
  const [openForm, setOpenForm] = useState(false)

  const oportunidades: Oportunidad[] = [
    {
      id: "OPP001",
      titulo: "Proyecto Implementación ERP",
      cliente: "Empresa A S.A.",
      valor: 50000000,
      etapa: "Propuesta",
      probabilidad: 60,
      fecha_cierre: "2024-03-30",
      responsable: "Ana Martínez",
    },
    {
      id: "OPP002",
      titulo: "Servicio de Consultoría",
      cliente: "Empresa B Ltda.",
      valor: 15000000,
      etapa: "Negociación",
      probabilidad: 80,
      fecha_cierre: "2024-03-15",
      responsable: "Carlos López",
    },
    // Más oportunidades...
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Oportunidades</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nueva Oportunidad
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pipeline Total"
          value="$125.5M"
          description="Valor total de oportunidades"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trend={{
            value: "+12.3%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Oportunidades Activas"
          value="24"
          description="En proceso de venta"
          icon={<Target className="h-4 w-4 text-primary" />}
          trend={{
            value: "+4.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Tasa de Conversión"
          value="35.8%"
          description="Oportunidades ganadas"
          icon={<BarChart className="h-4 w-4 text-primary" />}
          trend={{
            value: "+2.4%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Clientes Potenciales"
          value="45"
          description="Nuevos prospectos"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{
            value: "+8.7%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline de Ventas</CardTitle>
          <CardDescription>Seguimiento de oportunidades comerciales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar oportunidades..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todas</Button>
              <Button variant="outline">En Proceso</Button>
              <Button variant="outline">Ganadas</Button>
              <Button variant="outline">Perdidas</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead className="text-right">Probabilidad</TableHead>
                  <TableHead>Fecha Cierre</TableHead>
                  <TableHead>Responsable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oportunidades.map((oportunidad) => (
                  <TableRow key={oportunidad.id}>
                    <TableCell className="font-medium">{oportunidad.id}</TableCell>
                    <TableCell>{oportunidad.titulo}</TableCell>
                    <TableCell>{oportunidad.cliente}</TableCell>
                    <TableCell className="text-right">${oportunidad.valor.toLocaleString("es-CL")}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          oportunidad.etapa === "Ganada"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : oportunidad.etapa === "Perdida"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        }`}
                      >
                        {oportunidad.etapa}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{oportunidad.probabilidad}%</TableCell>
                    <TableCell>{oportunidad.fecha_cierre}</TableCell>
                    <TableCell>{oportunidad.responsable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Oportunidades por Etapa</CardTitle>
            <CardDescription>Distribución del pipeline actual</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de distribución por etapa</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
            <CardDescription>Evolución mensual del pipeline</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-8 w-8" />
                <span>Gráfico de tendencia mensual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NuevaOportunidadForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

