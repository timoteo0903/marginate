import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/app/components/sidebar"
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sistema de Gestión",
  description: "Sistema integral para gestión empresarial",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <main className="flex-1 overflow-y-auto w-full">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

