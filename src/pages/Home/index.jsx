import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logopng_azul.png';
import ContactForm from '../../components/ContactForm';
import { FaIndustry, FaStore, FaTractor } from 'react-icons/fa';
import fondo from '../../../src/assets/fondo.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) setStatsAnimated(true);
        });
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const handleSubmit = () => {
    alert(t('alerts.thanks'));
  };

  // counter con animación (activa cuando la sección entra al viewport)
  const StatCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!statsAnimated) return;
      const increment = target / 100;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      }, 20);
      return () => clearInterval(timer);
    }, [statsAnimated, target]);
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="font-sans leading-relaxed text-gray-800 overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed w-full top-0 z-[1000] backdrop-blur-xl py-4 shadow-lg transition-all duration-300 ${
          isScrolled ? 'bg-white/98' : 'bg-white/95'
        }`}
        style={{ boxShadow: '0 2px 20px rgba(0, 65, 140, 0.1)' }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex justify-center items-center gap-2 text-3xl font-bold bg-gradient-to-br from-[#00418c] to-[#003165] bg-clip-text text-transparent">
              <img src={logo} className="w-15 h-15" alt={t('common.logoAlt')} />
              <h1>{t('common.brand')}</h1>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex list-none gap-8">
              {[
                { id: 'inicio', label: t('nav.home') },
                { id: 'servicios', label: t('nav.services') },
                { id: 'nosotros', label: t('nav.about') },
                { id: 'contacto', label: t('nav.contact') },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-gray-800 font-medium cursor-pointer transition-all duration-300 hover:text-[#00418c] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-[#0066cc] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center gap-3">
            {/* Botón idioma */}
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
              className="bg-white border border-[#00418c] text-[#00418c] px-4 py-2 rounded-full font-medium hover:bg-[#00418c] hover:text-white transition-all duration-300"
              aria-label={t('a11y.toggleLanguage')}
            >
              {i18n.language === 'es' ? t('common.english') : t('common.spanish')}
            </button>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('contacto')}
              className="uppercase cursor-pointer bg-gradient-to-br from-[#0066cc] to-[#00418c] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{ boxShadow: '0 4px 15px rgba(0, 65, 140, 0.3)' }}
            >
              {t('home.cta')}
            </button>
          </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('a11y.toggleMenu')}
            >
              ☰
            </button>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white flex flex-col p-4 shadow-xl z-[1000]">
              {/* Elementos de navegación */}
              {[
                { id: 'inicio', label: t('nav.home') },
                { id: 'servicios', label: t('nav.services') },
                { id: 'nosotros', label: t('nav.about') },
                { id: 'contacto', label: t('nav.contact') },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="py-2 text-gray-800 hover:text-[#00418c] text-left"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Separador */}
              <div className="border-t border-gray-200 my-3"></div>
              
              {/* Botón de idioma para móvil */}
              <button
                onClick={() => {
                  i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
                  setIsMenuOpen(false); // Cerrar el menú después del cambio
                }}
                className="bg-white border border-[#00418c] text-[#00418c] px-4 py-2 rounded-full font-medium hover:bg-[#00418c] hover:text-white transition-all duration-300 mx-auto"
                aria-label={t('a11y.toggleLanguage')}
              >
                {i18n.language === 'es' ? t('common.english') : t('common.spanish')}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="text-white pt-32 pb-20 text-center relative overflow-hidden min-h-[90svh] flex items-center"
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #00418c 45%, #0066cc 100%)' }}
      >
        {/* Background particles effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 65, 140, 0.3) 0%, transparent 50%)
            `,
          }}
        />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-5xl md:text-7xl mb-6 font-extrabold bg-gradient-to-br from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-white cursor-pointer text-[#00418c] px-9 py-5 uppercase rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                style={{ boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)' }}
              >
                {t('home.cta')}
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="bg-transparent cursor-pointer text-white border-2 border-white/30 px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                {t('home.viewServices')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="py-12 sm:py-16 md:py-20 lg:py-25 relative"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e6f2ff 100%)' }}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-40 mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="text-[#0066cc] uppercase text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-widest">
              {t('services.kicker')}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#00418c] mb-3 sm:mb-4 font-bold leading-tight">
              {t('services.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12 md:mt-16">
            {[
              {
                icon: '📊',
                title: t('services.items.tax.title'),
                description: t('services.items.tax.desc'),
              },
              {
                icon: '💼',
                title: t('services.items.accounting.title'),
                description: t('services.items.accounting.desc'),
              },
              {
                icon: '📑',
                title: t('services.items.compliance.title'),
                description: t('services.items.compliance.desc'),
              },
              {
                icon: '👥',
                title: t('services.items.payroll.title'),
                description: t('services.items.payroll.desc'),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}
              >
                {/* Top border effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066cc] to-[#00418c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 text-white text-2xl sm:text-3xl shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #0066cc 0%, #00418c 100%)',
                    boxShadow: '0 8px 25px rgba(0, 65, 140, 0.3)',
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="text-[#00418c] mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  {service.description}
                </p>

                <button
                  onClick={() => scrollToSection('contacto')}
                  className="text-[#0066cc] cursor-pointer font-semibold hover:text-[#00418c] transition-colors duration-300 text-sm sm:text-base"
                >
                  {t('services.cta')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Banner */}
      <section
        className="relative py-32 text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(0, 65, 140, 0.7) 45%, rgba(0, 102, 204, 0.8) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(0, 102, 204, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 65, 140, 0.3) 0%, transparent 50%)
            `,
          }}
        />

        <div className="max-w-5xl mx-auto px-5 relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-[#b3d9ff]/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold tracking-widest border border-[#0066cc]/30">
              {t('highlight.kicker')}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl mb-8 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent leading-tight">
            {t('highlight.title')}
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed text-white">
            {t('highlight.subtitle')}
          </p>

          <button
            onClick={() => scrollToSection('contacto')}
            className="group relative bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-white hover:text-[#00418c] hover:border-white cursor-pointer"
          >
            <span className="relative z-10">{t('highlight.cta')}</span>
            <div className="absolute inset-0 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* Sectors */}
      <section
        className="py-20 relative"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e6f2ff 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <div className="text-[#0066cc] uppercase text-sm font-semibold mb-4 tracking-widest">
              {t('sectors.kicker')}
            </div>
            <h2 className="text-4xl md:text-5xl text-[#00418c] mb-4 font-bold">
              {t('sectors.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('sectors.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {/* Primary */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div
                className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                style={{ boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)' }}
              >
                <FaTractor />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">{t('sectors.primary.title')}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{t('sectors.primary.desc')}</p>
            </div>

            {/* Secondary */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div
                className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                style={{ boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)' }}
              >
                <FaIndustry />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">{t('sectors.secondary.title')}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{t('sectors.secondary.desc')}</p>
            </div>

            {/* Tertiary */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div
                className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                style={{ boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3)' }}
              >
                <FaStore />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">{t('sectors.tertiary.title')}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{t('sectors.tertiary.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef}
        className="text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #00418c 0%, #0066cc 45%, #003165 100%)' }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-[#b3d9ff]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-[#b3d9ff]/8 rounded-full blur-lg animate-bounce delay-500"></div>
        </div>

        <div
          className="absolute inset-0 opacity-5 sm:opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/></svg>')`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
              {t('stats.title')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#b3d9ff] max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
              {t('stats.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20">
            {[
              { target: 5, suffix: '', label: t('stats.items.years.title'), description: t('stats.items.years.desc') },
              { target: 97, suffix: '%', label: t('stats.items.satisfaction.title'), description: t('stats.items.satisfaction.desc') },
            ].map((stat, index) => (
              <div key={index} className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl blur-sm" />
                <div className="relative bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 text-center w-full sm:min-w-[260px] md:min-w-[280px] lg:min-w-[320px] max-w-sm mx-auto sm:mx-0 transition-all duration-300 hover:bg-white/15 hover:scale-105">
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 backdrop-blur-sm border border-white/30">
                    {index === 0 ? (
                      <svg className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-white via-[#b3d9ff] to-[#e6f2ff] bg-clip-text text-transparent filter drop-shadow-lg">
                      <StatCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white leading-tight px-2">
                    {stat.label}
                  </h3>

                  <p className="text-sm sm:text-base text-[#b3d9ff] font-medium opacity-90 leading-relaxed px-2">
                    {stat.description}
                  </p>

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="nosotros" className="py-25 bg-white text-center">
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-[#00418c] mb-8 font-bold">{t('why.title')}</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">{t('why.subtitle')}</p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={() => scrollToSection('contacto')}
                className="cursor-pointer text-white px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00418c 100%)', boxShadow: '0 8px 30px rgba(0, 65, 140, 0.3)' }}
              >
                {t('why.ctaPrimary')}
              </button>
              <a
                href="tel:+523347622946"
                className="bg-transparent text-[#00418c] border-2 border-[#00418c] px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-[#00418c] hover:text-white"
              >
                {t('why.ctaSecondary')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contacto"
        className="text-white py-16 sm:py-20 lg:py-25 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e293b 0%, #00418c 45%, #0066cc 100%)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 65, 140, 0.2) 0%, transparent 50%)
            `,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center relative z-10">
            {/* Info */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 font-bold bg-gradient-to-br from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
                {t('contact.title')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 leading-relaxed">
                {t('contact.subtitle')}
              </p>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold my-6 sm:my-8 text-[#b3d9ff]">
                +52 33 4762 2946
              </div>
              <p className="text-base sm:text-lg opacity-90">{t('contact.hours')}</p>
            </div>

            {/* Form */}
            <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl border border-white/20">
              <ContactForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">{t('footer.brandTitle')}</h3>
              <p className="text-slate-300 leading-relaxed">{t('footer.brandDesc')}</p>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">{t('footer.servicesTitle')}</h3>
              <ul className="list-none space-y-3">
                {[
                  t('services.items.tax.title'),
                  t('services.items.accounting.title'),
                  t('services.items.compliance.title'),
                  t('services.items.payroll.title'),
                ].map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection('servicios')}
                      className="text-slate-400 hover:text-[#66b3ff] transition-colors duration-300"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">{t('footer.contactTitle')}</h3>
              <ul className="list-none space-y-3">
                <li>
                  <a href="tel: 33 4762 2946" className="text-slate-400 hover:text-[#66b3ff] transition-colors duration-300">
                    +52 33 4762 2946
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Contacto@assoluciones.com"
                    className="text-slate-400 hover:text-[#66b3ff] transition-colors duration-300"
                  >
                    Contacto@assoluciones.com
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="text-slate-400 hover:text-[#66b3ff] transition-colors duration-300"
                  >
                    {t('footer.book')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-slate-500">
            <p>&copy; 2024 {t('common.brand')}. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
