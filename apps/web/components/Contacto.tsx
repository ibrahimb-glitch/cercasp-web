'use client'

import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí integrar EmailJS
    alert('Mensaje enviado (placeholder)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contacto" className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Contacto</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Envíanos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg h-32"
                required
              ></textarea>
              <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg">
                Enviar
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Información</h3>
            <p className="text-gray-700 mb-4">
              <strong>Dirección:</strong> Calle Principal 123, San Pedro, Coahuila, CP 27800
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Teléfono:</strong> (844) 123-4567
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> info@cercasp.org
            </p>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.5!2d-100.5!3d25.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDMwJzAwLjAiTiAxMDDCsDMwJzAwLjAiVw!5e0!3m2!1ses!2smx!4v1638472800000!5m2!1ses!2smx"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}