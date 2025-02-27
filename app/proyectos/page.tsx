"use client"

import { useState } from "react"
import { BarChart, Clock, Download, FileText, Filter, Plus, Search, Target, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoProyectoForm } from "@/app/components/forms/nuevo-proyecto-form"

interface Proyecto {
  id: string
  titulo: string
  cliente: string
  responsable: string
  fecha_inicio: string
  fecha_fin: string
  estado: "Planificación" | "En Progreso" | "En Pausa" | "Completado" | "Cancelado"
  presupuesto: number
  prioridad: "Baja" | "Media" | "Alta"
}

export default function ProyectosPage() {
  const [openForm, setOpenForm] = useState(false)

  const proyectos: Proyecto[] = [
    {
      id: "PRY001",
      titulo: "Implementación Sistema ERP",
      cliente: "Empresa A S.A.",
      responsable: "Ana Martínez",
      fecha_inicio: "2024-01-15",
      fecha_fin: "2024-06-30",
      estado: "En Progreso",
      presupuesto: 75000000,
      prioridad: "Alta",
    },
    {
      id: "PRY002",
      titulo: "Desarrollo E-commerce",
      cliente: "Empresa B Ltda.",
      responsable: "Carlos López",
      fecha_inicio: "2024-02-01",
      fecha_fin: "2024-04-30",
      estado: "Planificación",
      presupuesto: 25000000,
      prioridad: "Media",
    },
    // Más proyectos...
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Proyectos</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Proyecto
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Proyectos Activos"
          value="12"
          description="En ejecución actual"
          icon={<Target className="h-4 w-4 text-primary" />}
          trend={{
            value: "+2",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Presupuesto Total"
          value="$235.5M"
          description="Proyectos en curso"
          icon={<BarChart className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Equipo Asignado"
          value="45"
          description="Personas trabajando"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{
            value: "+5",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Tiempo Promedio"
          value="4.5"
          description="Meses por proyecto"
          icon={<Clock className="h-4 w-4 text-primary" />}
          trend={{
            value: "-0.5",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Proyectos</CardTitle>
          <CardDescription>Seguimiento y control de proyectos activos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar proyectos..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todos</Button>
              <Button variant="outline">En Progreso</Button>
              <Button variant="outline">Planificación</Button>
              <Button variant="outline">Completados</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Inicio</TableHead>
                  <TableHead>Fin</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Presupuesto</TableHead>
                  <TableHead>Prioridad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proyectos.map((proyecto) => (
                  <TableRow key={proyecto.id}>
                    <TableCell className="font-medium">{proyecto.id}</TableCell>
                    <TableCell>{proyecto.titulo}</TableCell>
                    <TableCell>{proyecto.cliente}</TableCell>
                    <TableCell>{proyecto.responsable}</TableCell>
                    <TableCell>{proyecto.fecha_inicio}</TableCell>
                    <TableCell>{proyecto.fecha_fin}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          proyecto.estado === "En Progreso"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : proyecto.estado === "Completado"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : proyecto.estado === "En Pausa"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : proyecto.estado === "Cancelado"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        }`}
                      >
                        {proyecto.estado}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${proyecto.presupuesto.toLocaleString("es-CL")}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          proyecto.prioridad === "Alta"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            : proyecto.prioridad === "Media"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        }`}
                      >
                        {proyecto.prioridad}
                      </span>
                    </TableCell>
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
            <CardTitle>Estado de Proyectos</CardTitle>
            <CardDescription>Distribución por estado actual</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de distribución por estado</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Presupuesto por Cliente</CardTitle>
            <CardDescription>Distribución de presupuesto asignado</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Target className="h-8 w-8" />
                <span>Gráfico de presupuesto por cliente</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NuevoProyectoForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

