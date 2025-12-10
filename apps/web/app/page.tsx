import Hero from '../components/Hero'
import Nosotros from '../components/Nosotros'
import Servicios from '../components/Servicios'
import Transparencia from '../components/Transparencia'
import Equipo from '../components/Equipo'
import Contacto from '../components/Contacto'

export default function Home() {
  return (
    <main>
      <Hero />
      <Nosotros />
      <Servicios />
      <Transparencia />
      <Equipo />
      <Contacto />
    </main>
  )
}