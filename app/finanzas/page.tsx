"use client"

import { useState } from "react"
import {
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  PieChart,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevaTransaccionForm } from "@/app/components/forms/nueva-transaccion-form"

interface Transaccion {
  id: string
  fecha: string
  descripcion: string
  tipo: "Ingreso" | "Egreso"
  monto: number
  cuenta: string
}

export default function FinanzasPage() {
  const [openForm, setOpenForm] = useState(false)

  const transacciones: Transaccion[] = [
    {
      id: "TRX001",
      fecha: "01/06/2023",
      descripcion: "Venta de productos",
      tipo: "Ingreso",
      monto: 1200.0,
      cuenta: "Cuenta Principal",
    },
    {
      id: "TRX002",
      fecha: "03/06/2023",
      descripcion: "Compra de insumos",
      tipo: "Egreso",
      monto: 850.0,
      cuenta: "Cuenta Principal",
    },
    {
      id: "TRX003",
      fecha: "07/06/2023",
      descripcion: "Servicios de internet",
      tipo: "Egreso",
      monto: 120.0,
      cuenta: "Cuenta Gastos",
    },
    {
      id: "TRX004",
      fecha: "10/06/2023",
      descripcion: "Venta de software",
      tipo: "Ingreso",
      monto: 4800.0,
      cuenta: "Cuenta Principal",
    },
    {
      id: "TRX005",
      fecha: "12/06/2023",
      descripcion: "Alquiler oficina",
      tipo: "Egreso",
      monto: 1500.0,
      cuenta: "Cuenta Gastos",
    },
    {
      id: "TRX006",
      fecha: "15/06/2023",
      descripcion: "Mantenimiento",
      tipo: "Ingreso",
      monto: 750.0,
      cuenta: "Cuenta Principal",
    },
    {
      id: "TRX007",
      fecha: "18/06/2023",
      descripcion: "Impuestos",
      tipo: "Egreso",
      monto: 1200.0,
      cuenta: "Cuenta Impuestos",
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Finanzas</h1>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nueva Transacción
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar Reportes
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Balance Total"
          value="$35,011.89"
          description="Saldo actual en cuentas"
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend={{
            value: "+8.3%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Ingresos"
          value="$19,850.00"
          description="Total ingresos del mes"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Egresos"
          value="$10,220.00"
          description="Total egresos del mes"
          icon={<TrendingDown className="h-4 w-4 text-primary" />}
          trend={{
            value: "+5.8%",
            label: "vs mes anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Flujo de Caja"
          value="$9,630.00"
          description="Diferencia ingresos - egresos"
          icon={<CreditCard className="h-4 w-4 text-primary" />}
          trend={{
            value: "+24.7%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Flujo de Caja</CardTitle>
            <CardDescription>Evolución de ingresos y egresos en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <LineChart className="h-8 w-8" />
                <span>Gráfico de flujo de caja</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Gastos</CardTitle>
            <CardDescription>Porcentaje por categoría</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <PieChart className="h-8 w-8" />
                <span>Gráfico de distribución</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
          <CardDescription>Registro de movimientos financieros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar transacciones..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Todas</Button>
              <Button variant="outline">Ingresos</Button>
              <Button variant="outline">Egresos</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Cuenta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transacciones.map((transaccion) => (
                <TableRow key={transaccion.id}>
                  <TableCell>{transaccion.fecha}</TableCell>
                  <TableCell>{transaccion.descripcion}</TableCell>
                  <TableCell>{transaccion.tipo}</TableCell>
                  <TableCell>{transaccion.monto}</TableCell>
                  <TableCell>{transaccion.cuenta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <NuevaTransaccionForm open={openForm} onOpenChange={setOpenForm} />
    </div>
  )
}

