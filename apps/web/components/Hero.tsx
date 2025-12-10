export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 px-4 overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop" 
        alt="Fondo rehabilitación" 
        className="absolute inset-0 w-full h-full object-cover -z-10" 
      />
      <div className="absolute inset-0 bg-black opacity-20 -z-10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <img 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=150&h=150&fit=crop&crop=center" 
          alt="Logo Paloma Dorada" 
          className="mx-auto mb-8 rounded-full border-4 border-yellow-400" 
        />
        <h1 className="text-5xl font-bold mb-4">Centro de Restauración Contra las Adicciones San Pedro</h1>
        <p className="text-xl mb-8">Rehabilitación integral y apoyo para la recuperación en Coahuila, México</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
          Ingresar al Centro
        </button>
      </div>
    </section>
  )
}