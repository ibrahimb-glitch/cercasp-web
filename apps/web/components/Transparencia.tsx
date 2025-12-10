export default function Transparencia() {
  return (
    <section id="transparencia" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Transparencia</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Información Fiscal</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>RFC:</strong> CRC2302227N7</li>
              <li><strong>Dirección:</strong> CP 27800, San Pedro, Coahuila</li>
              <li><strong>Régimen:</strong> Asociación Civil</li>
              <li><strong>Constancia SAT:</strong> ACTIVO (04/07/2025)</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Financiamiento</h3>
            <p className="text-gray-700 mb-4">
              Todos los servicios son gratuitos. Operamos con donaciones voluntarias y apoyos comunitarios.
            </p>
            <p className="text-sm text-gray-600">
              Reportes financieros disponibles bajo solicitud conforme a la Ley General de Transparencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}