"use client"

import { AlertCircle, BarChart, Download, Filter, Package, Plus, RefreshCw, Search, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { StatCard } from "@/app/components/dashboard-stats"
import { NuevoStockForm } from "@/app/components/forms/nuevo-stock-form"
import { useState } from "react"


interface Producto {
  id: string
  nombre: string
  categoria: string
  stock: number
  stockMinimo: number
  precioUnitario: number
  valorTotal: number
}

export default function StockPage() {
  const [openForm, setOpenForm] = useState(false)

  const productos: Producto[] = [
    {
      id: "PRD001",
      nombre: "Producto A",
      categoria: "Electrónica",
      stock: 45,
      stockMinimo: 10,
      precioUnitario: 120.0,
      valorTotal: 5400.0,
    },
    {
      id: "PRD002",
      nombre: "Producto B",
      categoria: "Informática",
      stock: 32,
      stockMinimo: 15,
      precioUnitario: 85.5,
      valorTotal: 2736.0,
    },
    {
      id: "PRD003",
      nombre: "Producto C",
      categoria: "Oficina",
      stock: 78,
      stockMinimo: 20,
      precioUnitario: 25.0,
      valorTotal: 1950.0,
    },
    {
      id: "PRD004",
      nombre: "Producto D",
      categoria: "Electrónica",
      stock: 8,
      stockMinimo: 10,
      precioUnitario: 150.0,
      valorTotal: 1200.0,
    },
    {
      id: "PRD005",
      nombre: "Producto E",
      categoria: "Informática",
      stock: 12,
      stockMinimo: 15,
      precioUnitario: 210.0,
      valorTotal: 2520.0,
    },
    {
      id: "PRD006",
      nombre: "Producto F",
      categoria: "Oficina",
      stock: 65,
      stockMinimo: 20,
      precioUnitario: 18.5,
      valorTotal: 1202.5,
    },
    {
      id: "PRD007",
      nombre: "Producto G",
      categoria: "Electrónica",
      stock: 24,
      stockMinimo: 10,
      precioUnitario: 95.0,
      valorTotal: 2280.0,
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Inventario</h1>
        </div>
        <div className="flex gap-2">
        <Button className="flex items-center gap-1" onClick={() => setOpenForm(true)}>
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            Registrar Movimiento
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Productos"
          value="7"
          description="Productos en inventario"
          icon={<Package className="h-4 w-4 text-primary" />}
          trend={{
            value: "+2",
            label: "nuevos este mes",
            positive: true,
          }}
        />
        <StatCard
          title="Valor de Inventario"
          value="$17,288.50"
          description="Valor total del stock"
          icon={<ShoppingCart className="h-4 w-4 text-primary" />}
          trend={{
            value: "+8.3%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Productos Bajos"
          value="2"
          description="Productos con stock bajo"
          icon={<AlertCircle className="h-4 w-4 text-primary" />}
          trend={{
            value: "-1",
            label: "vs mes anterior",
            positive: true,
          }}
        />
        <StatCard
          title="Rotación"
          value="24.5%"
          description="Tasa de rotación mensual"
          icon={<RefreshCw className="h-4 w-4 text-primary" />}
          trend={{
            value: "+2.1%",
            label: "vs mes anterior",
            positive: true,
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario de Productos</CardTitle>
          <CardDescription>Lista completa de productos en stock</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar productos..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Todos</Button>
              <Button variant="outline">Stock Bajo</Button>
              <Button variant="outline">Electrónica</Button>
              <Button variant="outline">Informática</Button>
              <Button variant="outline">Oficina</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Precio Unit.</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos.map((producto) => (
                  <TableRow key={producto.id}>
                    <TableCell className="font-medium">{producto.id}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.categoria}</TableCell>
                    <TableCell className="text-right">{producto.stock}</TableCell>
                    <TableCell className="text-right">${producto.precioUnitario.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${producto.valorTotal.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          producto.stock > producto.stockMinimo
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {producto.stock > producto.stockMinimo ? "Normal" : "Stock Bajo"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Ver todos los productos
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
            <CardDescription>Productos por categoría</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-md border border-dashed">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart className="h-8 w-8" />
                <span>Gráfico de distribución por categoría</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos con Stock Bajo</CardTitle>
            <CardDescription>Productos que requieren reposición</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Stock Actual</TableHead>
                  <TableHead className="text-right">Stock Mínimo</TableHead>
                  <TableHead className="text-right">Diferencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productos
                  .filter((producto) => producto.stock < producto.stockMinimo)
                  .map((producto) => (
                    <TableRow key={`low-${producto.id}`}>
                      <TableCell className="font-medium">{producto.nombre}</TableCell>
                      <TableCell className="text-right">{producto.stock}</TableCell>
                      <TableCell className="text-right">{producto.stockMinimo}</TableCell>
                      <TableCell className="text-right text-red-500">{producto.stock - producto.stockMinimo}</TableCell>
                    </TableRow>
                  ))}
                {productos.filter((producto) => producto.stock < producto.stockMinimo).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No hay productos con stock bajo
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <NuevoStockForm open={openForm} onOpenChange={setOpenForm} />

    </div>
  )
}

