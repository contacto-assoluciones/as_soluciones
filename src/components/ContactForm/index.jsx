import { useState } from 'react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_iox8zpt';
const TEMPLATE_MAIN = 'template_b87l7kg';      // correo que te llega a ti (To fijo en EmailJS)
const TEMPLATE_AUTOREPLY = 'template_sascql7'; // auto-reply al cliente (To: {{to_email}})
const PUBLIC_KEY = '_bd3hPo4BImhy6qbL';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    mensaje: '',
    honeypot: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // anti-spam

    const nombre = formData.nombre.trim();
    const apellido = formData.apellido.trim();
    const email = formData.email.trim();
    const mensaje = formData.mensaje.trim();

    if (!nombre || !apellido || !email || !mensaje) {
      setStatus({ type: 'error', message: 'Por favor completa todos los campos obligatorios' });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: 'Ingresa un correo electrónico válido' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    const fecha = new Date().toLocaleString('es-MX', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    // === Params para el correo principal (a ti) ===
    // En EmailJS: el campo "To" del template_b87l7kg debe ser TU correo fijo (no variable).
    const mainParams = {
      from_name: `${nombre} ${apellido}`,
      from_email: email,
      reply_to: email, // útil para responder directo
      phone: formData.telefono,
      company: formData.empresa,
      message: mensaje,
      fecha
      // Si tu template marca otras variables como obligatorias, agrégalas aquí con el MISMO nombre.
    };

    // === Params para el auto-reply (al cliente) ===
    // En EmailJS: en template_sascql7 pon To: {{to_email}}
    const autoReplyParams = {
      to_name: nombre,
      to_email: email,  // <-- clave para que no marque "The recipients address is empty"
      message: mensaje, // por si tu template lo usa
      reply_to: email,  // por si tu template lo pide
      fecha
    };

    try {
      // 1) Enviar a ti
      await emailjs.send(SERVICE_ID, TEMPLATE_MAIN, mainParams, PUBLIC_KEY);

      // 2) Auto-reply
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, autoReplyParams, PUBLIC_KEY);

      setStatus({ type: 'success', message: '¡Mensaje enviado correctamente! Te responderemos pronto.' });
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        empresa: '',
        mensaje: '',
        honeypot: ''
      });
    } catch (error) {
      console.error('EmailJS error:', {
        status: error?.status,
        text: error?.text,
        details: error
      });

      let msg = 'No se pudo enviar. Intenta nuevamente.';
      if (error?.status === 422 && /recipients address is empty/i.test(error?.text || '')) {
        msg = 'Falta el destinatario en el template. En EmailJS, pon en el auto-reply: To → {{to_email}}.';
      }

      setStatus({ type: 'error', message: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-6">
      {/* Honeypot - Campo oculto anti-spam */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex="-1"
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre *"
          className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
          required
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido *"
          className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo Electrónico *"
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
        required
      />

      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder="Teléfono"
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
      />

      <input
        type="text"
        name="empresa"
        value={formData.empresa}
        onChange={handleChange}
        placeholder="Empresa"
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
      />

      <textarea
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        placeholder="¿Cómo podemos ayudarte? *"
        rows="4"
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 resize-y text-sm sm:text-base"
        required
      />

      {status.message && (
        <div
          className={`p-3 rounded-lg text-center font-medium ${
            status.type === 'success'
              ? 'bg-green-500/20 text-green-200 border border-green-500/30'
              : 'bg-red-500/20 text-red-200 border border-red-500/30'
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`bg-white text-blue-800 p-3 sm:p-4 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 justify-self-start min-w-[200px] ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-xl cursor-pointer'
        }`}
        style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)' }}
      >
        {isLoading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
      </button>
    </form>
  );
};

export default ContactForm;
