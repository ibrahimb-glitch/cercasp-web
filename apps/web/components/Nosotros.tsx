export default function Nosotros() {
  return (
    <section id="nosotros" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Nosotros</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Proporcionar rehabilitación integral y apoyo continuo a personas con problemas de adicciones en San Pedro, Coahuila,
              promoviendo la recuperación física, mental y espiritual a través de programas basados en evidencia científica
              y principios éticos, cumpliendo con la NOM-028-SSA2-2019.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Visión</h3>
            <p className="text-gray-700 leading-relaxed">
              Ser el centro de referencia en rehabilitación contra adicciones en la región, reconocido por su excelencia
              en tratamientos personalizados, transparencia financiera y compromiso con la comunidad, contribuyendo a
              una sociedad libre de adicciones.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-600">
            Fundado el 22 de febrero de 2023 | RFC: CRC2302227N7 | Asociación Civil sin fines de lucro
          </p>
        </div>
      </div>
    </section>
  )
}