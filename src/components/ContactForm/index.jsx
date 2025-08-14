import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = 'service_iox8zpt';
const TEMPLATE_MAIN = 'template_b87l7kg';      // correo que te llega a ti (To fijo en EmailJS)
const TEMPLATE_AUTOREPLY = 'template_sascql7'; // auto-reply al cliente (To: {{to_email}})
const PUBLIC_KEY = '_bd3hPo4BImhy6qbL';

const ContactForm = () => {
  const { t, i18n } = useTranslation();

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
      setStatus({ type: 'error', message: t('contact.form.errors.required') });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ type: 'error', message: t('contact.form.errors.email') });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    const fecha = new Date().toLocaleString(i18n.language === 'es' ? 'es-MX' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    // === Params para el correo principal (a ti) ===
    const mainParams = {
      from_name: `${nombre} ${apellido}`,
      from_email: email,
      reply_to: email,
      phone: formData.telefono,
      company: formData.empresa,
      message: mensaje,
      fecha
    };

    // === Params para el auto-reply (al cliente) ===
    const autoReplyParams = {
      to_name: nombre,
      to_email: email,  // IMPORTANT: debe existir en el template como {{to_email}}
      message: mensaje,
      reply_to: email,
      fecha
    };

    try {
      // 1) Enviar a ti
      await emailjs.send(SERVICE_ID, TEMPLATE_MAIN, mainParams, PUBLIC_KEY);

      // 2) Auto-reply
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, autoReplyParams, PUBLIC_KEY);

      setStatus({ type: 'success', message: t('contact.form.success') });
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

      let msg = t('contact.form.errors.generic');
      if (error?.status === 422 && /recipients address is empty/i.test(error?.text || '')) {
        msg = t('contact.form.errors.recipientEmpty');
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
          placeholder={t('contact.form.placeholders.name')}
          className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
          required
          aria-label={t('contact.form.labels.name')}
        />
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder={t('contact.form.placeholders.lastname')}
          className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
          required
          aria-label={t('contact.form.labels.lastname')}
        />
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t('contact.form.placeholders.email')}
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
        required
        aria-label={t('contact.form.labels.email')}
      />

      <input
        type="tel"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        placeholder={t('contact.form.placeholders.phone')}
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
        aria-label={t('contact.form.labels.phone')}
      />

      <input
        type="text"
        name="empresa"
        value={formData.empresa}
        onChange={handleChange}
        placeholder={t('contact.form.placeholders.company')}
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 text-sm sm:text-base"
        aria-label={t('contact.form.labels.company')}
      />

      <textarea
        name="mensaje"
        value={formData.mensaje}
        onChange={handleChange}
        placeholder={t('contact.form.placeholders.message')}
        rows="4"
        className="p-3 sm:p-4 border border-white/30 rounded-xl bg-white/10 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 resize-y text-sm sm:text-base"
        required
        aria-label={t('contact.form.labels.message')}
      />

      {status.message && (
        <div
          className={`p-3 rounded-lg text-center font-medium ${
            status.type === 'success'
              ? 'bg-green-500/20 text-green-200 border border-green-500/30'
              : 'bg-red-500/20 text-red-200 border border-red-500/30'
          }`}
          role={status.type === 'success' ? 'status' : 'alert'}
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
        aria-busy={isLoading}
      >
        {isLoading ? t('contact.form.sending') : t('contact.form.send')}
      </button>
    </form>
  );
};

export default ContactForm;
