"use client"

import { useState } from "react"
import { BarChart, Calendar, Download, Filter, Plus, RefreshCw, Search, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoIngresoForm } from "@/app/components/forms/nuevo-ingreso-form"

interface Ingreso {
  id: string
  fecha: string
  cliente: string
  concepto: string
  monto: number
  estado: "Pagado" | "Pendiente"
}

export default function IngresosPage() {
  const [openForm, setOpenForm] = useState(false)

  const ingresos: Ingreso[] = [
    {
      id: "INV001",
      fecha: "01/06/2023",
      cliente: "Empresa A",
      concepto: "Venta de productos",
      monto: 1200.0,
      estado: "Pagado",
    },
    {
      id: "INV002",
      fecha: "05/06/2023",
      cliente: "Empresa B",
      concepto: "Servicios de consultoría",
      monto: 2500.0,
      estado: "Pagado",
    },
    {
      id: "INV003",
      fecha: "10/06/2023",
      cliente: "Empresa C",
      concepto: "Venta de software",
      monto: 4800.0,
      estado: "Pendiente",
    },
    {
      id: "INV004",
      fecha: "15/06/2023",
      cliente: "Empresa D",
      concepto: "Mantenimiento",
      monto: 750.0,
      estado: "Pagado",
    },
    {
      id: "INV005",
      fecha: "20/06/2023",
      cliente: "Empresa E",
      concepto: "Suscripción anual",
      monto: 3600.0,
      estado: "Pendiente",
    },
    {
      id: "INV006",
      fecha: "25/06/2023",
      cliente: "Empresa F",
      concepto: "Renovación licencia",
      monto: 1800.0,
      estado: "Pagado",
    },
    {
      id: "INV007",
      fecha: "28/06/2023",
      cliente: "Empresa G",
      concepto: "Desarrollo a medida",
      monto: 5200.0,
      estado: "Pendiente",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Ingresos</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Ingreso
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ingresos del mes"
          value="$19,850.00"
          description="Total facturado este mes"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Pendiente de cobro"
          value="$13,600.00"
          description="Facturas pendientes de pago"
          icon={<Calendar className="h-4 w-4 text-primary" />}
          trend={{
            value: "+7.4%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Promedio por venta"
          value="$2,835.71"
          description="Valor promedio por transacción"
          icon={<BarChart className="h-4 w-4 text-primary" />}
          trend={{
            value: "+3.1%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Cantidad de facturas"
          value="7"
          description="Total de facturas emitidas"
          icon={<RefreshCw className="h-4 w-4 text-primary" />}
          trend={{
            value: "-2.0%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Ingresos</CardTitle>
          <CardDescription>Lista de todas las facturas y ventas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar facturas..." className="pl-10" />
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
                  <TableHead>Nº Factura</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingresos.map((ingreso) => (
                  <TableRow key={ingreso.id}>
                    <TableCell className="font-medium">{ingreso.id}</TableCell>
                    <TableCell>{ingreso.fecha}</TableCell>
                    <TableCell>{ingreso.cliente}</TableCell>
                    <TableCell>{ingreso.concepto}</TableCell>
                    <TableCell className="text-right">${ingreso.monto.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ingreso.estado === "Pagado"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {ingreso.estado}
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
            <CardTitle>Ingresos por cliente</CardTitle>
            <CardDescription>Distribución de ingresos por cliente</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de ingresos por cliente</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Evolución mensual</CardTitle>
            <CardDescription>Tendencia de ingresos en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-8 w-8" />
                <span>Gráfico de evolución mensual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NuevoIngresoForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

