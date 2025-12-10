import type { Metadata } from 'next'
import './globals.css'
import Header from '../components/Header'

export const metadata: Metadata = {
  title: 'CERCASP - Centro de Restauración Contra las Adicciones San Pedro',
  description: 'Rehabilitación integral y apoyo para la recuperación en Coahuila, México',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Header />
        {children}
        <footer className="bg-blue-900 text-white py-8 px-4 text-center">
          <p>&copy; 2025 CERCASP. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  )
}