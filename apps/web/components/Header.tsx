export default function Header() {
  return (
    <header className="bg-blue-900 text-white py-4 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=50&h=50&fit=crop&crop=center" alt="Logo" className="mr-4 rounded-full" />
          <h1 className="text-2xl font-bold">CERCASP</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#nosotros" className="hover:text-yellow-400">Nosotros</a></li>
            <li><a href="#servicios" className="hover:text-yellow-400">Servicios</a></li>
            <li><a href="#transparencia" className="hover:text-yellow-400">Transparencia</a></li>
            <li><a href="#equipo" className="hover:text-yellow-400">Equipo</a></li>
            <li><a href="#contacto" className="hover:text-yellow-400">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}