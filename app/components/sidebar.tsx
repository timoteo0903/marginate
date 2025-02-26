"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  TrendingUp,
  TrendingDown,
  BarChart,
  Package,
  Menu,
} from "lucide-react"

import { ModeToggle } from "@/app/components/mode-toggle"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Ingresos",
      href: "/ingresos",
      icon: TrendingUp,
    },
    {
      label: "Egresos",
      href: "/egresos",
      icon: TrendingDown,
    },
    {
      label: "Finanzas",
      href: "/finanzas",
      icon: BarChart,
    },
    {
      label: "Stock",
      href: "/stock",
      icon: Package,
    },
  ]

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BarChart className="h-6 w-6 text-primary" />
          <span>SISTEMA DE GESTIÓN</span>
        </Link>
      </div>
      <div className="flex items-center justify-between border-b px-6 py-2">
        <span className="text-sm font-medium">Cambiar tema</span>
        <ModeToggle />
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t">
        <div className="flex items-center gap-2 p-4">
          <div className="flex flex-1 items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border">
              <User className="h-4 w-4" />
              <span className="sr-only">Perfil</span>
            </Button>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Usuario Demo</span>
              <span className="text-xs text-muted-foreground">usuario@empresa.com</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Sidebar para desktop */}
      <aside className="hidden w-[280px] flex-col border-r bg-muted/40 md:flex">
        <SidebarContent />
      </aside>

      {/* Botón de menú móvil y Sheet para sidebar móvil */}
      <div className="fixed top-0 left-0 z-50 flex h-16 w-full items-center border-b bg-background px-4 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <BarChart className="h-6 w-6 text-primary" />
          <span className="font-semibold">SISTEMA DE GESTIÓN</span>
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>

      {/* Espacio para compensar la barra superior en móvil */}
      <div className="h-16 w-full md:hidden"></div>
    </>
  )
}

