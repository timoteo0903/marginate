"use client"

import { useState, useEffect } from "react"
import { BarChart, Users, Package, DollarSign, CreditCard, Activity, Building2, Target, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { StatCard } from "@/app/components/dashboard-stats"
import { Button } from "@/app/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState("Este mes")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [stats, setStats] = useState({
    finanzas: {
      ingresos: 0,
      egresos: 0,
      balance: 0,
    },
    inventario: {
      totalProductos: 0,
      valorInventario: 0,
      productosStockBajo: 0,
    },
    crm: {
      totalClientes: 0,
      clientesActivos: 0,
      oportunidadesAbiertas: 0,
      valorOportunidades: 0,
    },
  })

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido de nuevo, Usuario Demo</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === "Este mes" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("Este mes")}
          >
            Este mes
          </Button>
          <Button
            variant={selectedPeriod === "Este trimestre" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("Este trimestre")}
          >
            Este trimestre
          </Button>
          <Button
            variant={selectedPeriod === "Este año" ? "default" : "outline"}
            onClick={() => setSelectedPeriod("Este año")}
          >
            Este año
          </Button>
        </div>
      </div>

      {/* Estadísticas Financieras */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ingresos Totales"
          value={`$${stats.finanzas.ingresos.toLocaleString("es-CL")}`}
          description="Ingresos acumulados en el período"
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend={{
            value: "+20.1%",
            label: "vs período anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Egresos Totales"
          value={`$${stats.finanzas.egresos.toLocaleString("es-CL")}`}
          description="Gastos acumulados en el período"
          icon={<CreditCard className="h-4 w-4 text-primary" />}
          trend={{
            value: "+4.5%",
            label: "vs período anterior",
            positive: false,
          }}
        />
        <StatCard
          title="Balance"
          value={`$${stats.finanzas.balance.toLocaleString("es-CL")}`}
          description="Balance del período"
          icon={<BarChart className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.6%",
            label: "vs período anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Productos en Stock"
          value={stats.inventario.totalProductos.toString()}
          description="Unidades disponibles actualmente"
          icon={<Package className="h-4 w-4 text-primary" />}
          trend={{
            value: "-2.3%",
            label: "vs período anterior",
            positive: false,
          }}
        />
      </div>

      {/* Estadísticas CRM */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clientes"
          value={stats.crm.totalClientes.toString()}
          description="Clientes registrados"
          icon={<Building2 className="h-4 w-4 text-primary" />}
          trend={{
            value: "+12.5%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Clientes Activos"
          value={stats.crm.clientesActivos.toString()}
          description="Clientes con actividad reciente"
          icon={<Users className="h-4 w-4 text-primary" />}
          trend={{
            value: "+5.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Oportunidades"
          value={stats.crm.oportunidadesAbiertas.toString()}
          description="Oportunidades abiertas"
          icon={<Target className="h-4 w-4 text-primary" />}
          trend={{
            value: "+8.3%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Pipeline"
          value={`$${stats.crm.valorOportunidades.toLocaleString("es-CL")}`}
          description="Valor total de oportunidades"
          icon={<FileText className="h-4 w-4 text-primary" />}
          trend={{
            value: "+15.2%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Rendimiento Financiero</CardTitle>
            <CardDescription>Análisis comparativo de ingresos y egresos</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de rendimiento financiero</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
            <CardDescription>Las últimas 5 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Cliente A</TableCell>
                  <TableCell className="text-right">$1,200.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cliente B</TableCell>
                  <TableCell className="text-right">$845.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cliente C</TableCell>
                  <TableCell className="text-right">$1,670.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cliente D</TableCell>
                  <TableCell className="text-right">$320.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cliente E</TableCell>
                  <TableCell className="text-right">$2,150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Ver todas las ventas
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Productos más vendidos</CardTitle>
            <CardDescription>Top 5 productos por volumen de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Ventas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Producto A</TableCell>
                  <TableCell className="text-right">234</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Producto B</TableCell>
                  <TableCell className="text-right">187</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Producto C</TableCell>
                  <TableCell className="text-right">156</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Producto D</TableCell>
                  <TableCell className="text-right">132</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Producto E</TableCell>
                  <TableCell className="text-right">98</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clientes principales</CardTitle>
            <CardDescription>Top 5 clientes por volumen de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Compras</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Empresa A</TableCell>
                  <TableCell className="text-right">$12,400</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Empresa B</TableCell>
                  <TableCell className="text-right">$9,870</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Empresa C</TableCell>
                  <TableCell className="text-right">$8,340</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Empresa D</TableCell>
                  <TableCell className="text-right">$6,290</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Empresa E</TableCell>
                  <TableCell className="text-right">$4,580</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>Últimas acciones del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 text-sm">
              <Activity className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Nueva venta registrada</p>
                <p className="text-muted-foreground">Cliente: Empresa A - $1,200.00</p>
                <p className="text-xs text-muted-foreground">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Actualización de inventario</p>
                <p className="text-muted-foreground">Producto B: +50 unidades</p>
                <p className="text-xs text-muted-foreground">Hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Nuevo cliente registrado</p>
                <p className="text-muted-foreground">Empresa F añadida al sistema</p>
                <p className="text-xs text-muted-foreground">Hace 1 día</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Pago de factura</p>
                <p className="text-muted-foreground">Empresa C - $2,340.00</p>
                <p className="text-xs text-muted-foreground">Hace 1 día</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
