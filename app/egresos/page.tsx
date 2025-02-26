"use client"

import { useState } from "react"
import { BarChart, Calendar, Download, Filter, Plus, RefreshCw, Search, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoEgresoForm } from "@/app/components/forms/nuevo-egreso-form"

interface Egreso {
  id: string
  fecha: string
  proveedor: string
  concepto: string
  monto: number
  estado: "Pagado" | "Pendiente"
}

export default function EgresosPage() {
  const [openForm, setOpenForm] = useState(false)

  const egresos: Egreso[] = [
    {
      id: "EGR001",
      fecha: "03/06/2023",
      proveedor: "Proveedor A",
      concepto: "Compra de insumos",
      monto: 850.0,
      estado: "Pagado",
    },
    {
      id: "EGR002",
      fecha: "07/06/2023",
      proveedor: "Proveedor B",
      concepto: "Servicios de internet",
      monto: 120.0,
      estado: "Pagado",
    },
    {
      id: "EGR003",
      fecha: "12/06/2023",
      proveedor: "Proveedor C",
      concepto: "Alquiler oficina",
      monto: 1500.0,
      estado: "Pagado",
    },
    {
      id: "EGR004",
      fecha: "15/06/2023",
      proveedor: "Proveedor D",
      concepto: "Publicidad",
      monto: 450.0,
      estado: "Pendiente",
    },
    {
      id: "EGR005",
      fecha: "18/06/2023",
      proveedor: "Proveedor E",
      concepto: "Impuestos",
      monto: 1200.0,
      estado: "Pendiente",
    },
    {
      id: "EGR006",
      fecha: "22/06/2023",
      proveedor: "Proveedor F",
      concepto: "Mantenimiento",
      monto: 300.0,
      estado: "Pagado",
    },
    {
      id: "EGR007",
      fecha: "27/06/2023",
      proveedor: "Proveedor G",
      concepto: "Salarios",
      monto: 5800.0,
      estado: "Pendiente",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Egresos</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Egreso
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Egresos del mes"
          value="$10,220.00"
          description="Total gastado este mes"
          icon={<TrendingDown className="h-4 w-4 text-primary" />}
          trend={{
            value: "+5.8%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Pendiente de pago"
          value="$7,450.00"
          description="Facturas pendientes de pago"
          icon={<Calendar className="h-4 w-4 text-primary" />}
          trend={{
            value: "+12.3%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Promedio por gasto"
          value="$1,460.00"
          description="Valor promedio por transacción"
          icon={<BarChart className="h-4 w-4 text-primary" />}
          trend={{
            value: "-2.5%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Cantidad de facturas"
          value="7"
          description="Total de facturas recibidas"
          icon={<RefreshCw className="h-4 w-4 text-primary" />}
          trend={{
            value: "+1.0%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Egresos</CardTitle>
          <CardDescription>Lista de todas las facturas y gastos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar gastos..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todos</Button>
              <Button variant="outline">Pagados</Button>
              <Button variant="outline">Pendientes</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nº</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {egresos.map((egreso) => (
                  <TableRow key={egreso.id}>
                    <TableCell className="font-medium">{egreso.id}</TableCell>
                    <TableCell>{egreso.fecha}</TableCell>
                    <TableCell>{egreso.proveedor}</TableCell>
                    <TableCell>{egreso.concepto}</TableCell>
                    <TableCell className="text-right">${egreso.monto.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          egreso.estado === "Pagado"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {egreso.estado}
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
            <CardTitle>Egresos por categoría</CardTitle>
            <CardDescription>Distribución de gastos por categoría</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de egresos por categoría</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Evolución mensual</CardTitle>
            <CardDescription>Tendencia de egresos en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <TrendingDown className="h-8 w-8" />
                <span>Gráfico de evolución mensual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NuevoEgresoForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

