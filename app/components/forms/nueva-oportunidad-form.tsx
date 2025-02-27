"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"

interface NuevaOportunidadFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NuevaOportunidadForm({ open, onOpenChange }: NuevaOportunidadFormProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    cliente_id: "",
    valor: "",
    etapa: "Prospecto",
    probabilidad: "",
    fecha_cierre_estimada: "",
    descripcion: "",
    asignado_a: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de la nueva oportunidad:", formData)
    // Aquí iría la lógica para guardar la nueva oportunidad
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Oportunidad</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="titulo" className="text-right">
                Título
              </Label>
              <Input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cliente_id" className="text-right">
                Cliente
              </Label>
              <Select value={formData.cliente_id} onValueChange={(value) => handleSelectChange("cliente_id", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Empresa A S.A.</SelectItem>
                  <SelectItem value="2">Empresa B Ltda.</SelectItem>
                  {/* Aquí se cargarían dinámicamente los clientes */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input
                id="valor"
                name="valor"
                type="number"
                value={formData.valor}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="etapa" className="text-right">
                Etapa
              </Label>
              <Select value={formData.etapa} onValueChange={(value) => handleSelectChange("etapa", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar etapa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Prospecto">Prospecto</SelectItem>
                  <SelectItem value="Contactado">Contactado</SelectItem>
                  <SelectItem value="Propuesta">Propuesta</SelectItem>
                  <SelectItem value="Negociación">Negociación</SelectItem>
                  <SelectItem value="Ganada">Ganada</SelectItem>
                  <SelectItem value="Perdida">Perdida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="probabilidad" className="text-right">
                Probabilidad (%)
              </Label>
              <Input
                id="probabilidad"
                name="probabilidad"
                type="number"
                min="0"
                max="100"
                value={formData.probabilidad}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha_cierre_estimada" className="text-right">
                Fecha Cierre
              </Label>
              <Input
                id="fecha_cierre_estimada"
                name="fecha_cierre_estimada"
                type="date"
                value={formData.fecha_cierre_estimada}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="asignado_a" className="text-right">
                Asignado a
              </Label>
              <Select value={formData.asignado_a} onValueChange={(value) => handleSelectChange("asignado_a", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar responsable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ana Martínez</SelectItem>
                  <SelectItem value="2">Carlos López</SelectItem>
                  {/* Aquí se cargarían dinámicamente los empleados */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

