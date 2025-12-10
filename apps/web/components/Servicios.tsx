export default function Servicios() {
  return (
    <section id="servicios" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">Desintoxicación</h3>
            <p className="text-gray-700">Programa médico supervisado para eliminar sustancias del organismo de forma segura.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">Terapia Individual</h3>
            <p className="text-gray-700">Sesiones personalizadas con psicólogos especializados en adicciones.</p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-yellow-600">Grupos de Apoyo</h3>
            <p className="text-gray-700">Sesiones grupales para compartir experiencias y motivación mutua.</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Cumplimiento con Triángulo de Calidad NOM-028: Estructura, Proceso, Resultados
          </p>
        </div>
      </div>
    </section>
  )
}