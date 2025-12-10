export default function Equipo() {
  const miembros = [
    { nombre: 'Ibrahim Babún Romero', rol: 'Director General', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'María González', rol: 'Psicóloga Jefe', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'Carlos Mendoza', rol: 'Coordinador Médico', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'Ana López', rol: 'Especialista en Adicciones', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  ]

  return (
    <section id="equipo" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Nuestro Equipo</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {miembros.map((miembro, index) => (
            <div key={index} className="text-center">
              <img src={miembro.img} alt={miembro.nombre} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold">{miembro.nombre}</h3>
              <p className="text-gray-600">{miembro.rol}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}