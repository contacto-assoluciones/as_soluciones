import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/logopng_azul.png';
import ContactForm from '../../components/ContactForm';
import { FaIndustry, FaCogs, FaStore, FaTractor, FaHammer, FaShoppingCart } from 'react-icons/fa';
import fondo from '../../../src/assets/fondo.jpg';


const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsAnimated]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = () => {
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo dentro de las próximas 24 horas.');
  };

  const StatCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (statsAnimated) {
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
      }
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
        style={{
          boxShadow: '0 2px 20px rgba(0, 65, 140, 0.1)'
        }}
      >
        <div className="max-w-6xl mx-auto px-5">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex justify-center items-center gap-2 text-3xl font-bold bg-gradient-to-br from-[#00418c] to-[#003165] bg-clip-text text-transparent">
                <img src={logo} className='w-15 h-15' alt='logo'/>
                <h1>Soluciones</h1>
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex list-none gap-8">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'servicios', label: 'Servicios' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'contacto', label: 'Contacto' }
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
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection('contacto')}
              className="hidden uppercase cursor-pointer md:inline-block bg-gradient-to-br from-[#0066cc] to-[#00418c] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              style={{
                boxShadow: '0 4px 15px rgba(0, 65, 140, 0.3)'
              }}
            >
              Agenda tu consulta
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white flex flex-col p-4 shadow-xl z-[1000]">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'servicios', label: 'Servicios' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'contacto', label: 'Contacto' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="py-2 text-gray-800 hover:text-[#00418c] text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="text-white pt-32 pb-20 text-center relative overflow-hidden min-h-[90svh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #00418c 45%, #0066cc 100%)'
        }}
      >
        {/* Background particles effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 65, 140, 0.3) 0%, transparent 50%)
            `
          }}
        />
        
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="animate-[fadeInUp_1s_ease-out]">
            <h1 className="text-5xl md:text-7xl mb-6 font-extrabold bg-gradient-to-br from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
              Consultoría Integral para tu Empresa
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
              Impulsamos tu crecimiento con soluciones en asesoría fiscal, contabilidad, cumplimiento, seguridad social. Profesionalismo y resultados a tu alcance.
            </p>
            <div className="flex gap-4 justify-center flex-wrap mt-8">
              <button
                onClick={() => scrollToSection('contacto')}
                className="bg-white cursor-pointer text-[#00418c] px-9 py-5 uppercase rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                style={{
                  boxShadow: '0 8px 30px rgba(255, 255, 255, 0.2)'
                }}
              >
                Agenda tu consulta
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="bg-transparent cursor-pointer text-white border-2 border-white/30 px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-white/10 hover:border-white"
              >
                VER SERVICIOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-12 sm:py-16 md:py-20 lg:py-25 relative" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e6f2ff 100%)' }}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-40 mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="text-[#0066cc] uppercase text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-widest">
              NUESTROS SERVICIOS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#00418c] mb-3 sm:mb-4 font-bold leading-tight">
              Soluciones Profesionales que Impulsan tu Negocio
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Brindamos servicios diseñados para optimizar tus recursos, garantizar el cumplimiento y fortalecer tu competitividad en el mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-12 md:mt-16">
            {[
              {
                icon: '📊',
                title: 'Asesoría Fiscal',
                description: 'Diseñamos estrategias tributarias personalizadas para optimizar tu carga fiscal de forma legal y segura, evitando riesgos y mejorando la rentabilidad.'
              },
              {
                icon: '💼',
                title: 'Contabilidad',
                description: 'Llevamos el control contable de tu negocio con precisión y transparencia, entregando información financiera clara para decisiones estratégicas.'
              },
              {
                icon: '📑',
                title: 'Cumplimiento Fiscal',
                description: 'Aseguramos que tu empresa cumpla con todas las disposiciones fiscales a tiempo, manteniendo un historial impecable ante las autoridades.'
              },
              {
                icon: '👥',
                title: 'Seguridad social',
                description: 'Administramos tu nómina de forma integral, garantizando pagos puntuales, cálculos exactos y cumplimiento de obligaciones laborales.'
              }
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
                    boxShadow: '0 8px 25px rgba(0, 65, 140, 0.3)'
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
                  Solicitar información →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        className="relative py-32 text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(0, 65, 140, 0.7) 45%, rgba(0, 102, 204, 0.8) 100%)'
          }}
        ></div>
        
        {/* Particles effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(0, 102, 204, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 65, 140, 0.3) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Content */}
        <div className="max-w-5xl mx-auto px-5 relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-[#b3d9ff]/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold tracking-widest border border-[#0066cc]/30">
              AS SOLUCIONES HIGHLIGHTS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl mb-8 font-bold bg-gradient-to-br from-white to-white bg-clip-text text-transparent leading-tight">
            Comprometidos con el crecimiento de tu empresa
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed text-white">
            Nuestro equipo combina experiencia y dedicación para ofrecer soluciones fiscales, contables y administrativas que impulsan a nuestros clientes a alcanzar sus metas.
          </p>
          
          <button 
            onClick={() => scrollToSection('contacto')}
            className="group relative bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-white hover:text-[#00418c] hover:border-white cursor-pointer"
          >
            <span className="relative z-10">Descúbrelo</span>
            <div className="absolute inset-0 bg-white rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
          </button>
        </div>
        
        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      <section className="py-20 relative" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e6f2ff 100%)'
      }}>
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-[#0066cc] uppercase text-sm font-semibold mb-4 tracking-widest">
              SECTORES QUE ATENDEMOS
            </div>
            <h2 className="text-4xl md:text-5xl text-[#00418c] mb-4 font-bold">
              Atendiendo Múltiples Sectores
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Trabajamos con empresas de todos los sectores económicos, ofreciendo soluciones especializadas para cada industria.
            </p>
          </div>
          
          {/* Industries Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {/* Sector Primario */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}>
              {/* Top border effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                  style={{ boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)' }}>
                <FaTractor />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">
                Sector Primario
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Agricultura, ganadería, pesca, silvicultura y minería.
              </p>
            </div>

            {/* Sector Secundario */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}>
              {/* Top border effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                  style={{ boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)' }}>
                <FaIndustry />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">
                Sector Secundario
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Industria manufacturera, automotriz, aeroespacial, electrónica, construcción, minería y petróleo, generación de energía.
              </p>
            </div>

            {/* Sector Terciario */}
            <div className="group bg-white p-8 rounded-2xl shadow-xl text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                style={{ boxShadow: '0 10px 40px rgba(0, 65, 140, 0.1)' }}>
              {/* Top border effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl shadow-lg"
                  style={{ boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3)' }}>
                <FaStore />
              </div>
              <h3 className="text-[#00418c] mb-4 text-2xl font-semibold">
                Sector Terciario
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Comercio, turismo, transporte, comunicaciones, servicios financieros, educación, salud, logística y tecnología de la información.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #00418c 0%, #0066cc 45%, #003165 100%)'
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-[#b3d9ff]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-[#b3d9ff]/8 rounded-full blur-lg animate-bounce delay-500"></div>
        </div>
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 sm:opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/></svg>')`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
              Nuestros resultados hablan por sí solos
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#b3d9ff] max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4">
              La confianza de nuestros clientes se refleja en estos números
            </p>
          </div>

          {/* Stats with enhanced design for 2 items - Fully Responsive */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-20">
            {[
              { target: 5, suffix: '', label: 'Años de Experiencia', description: 'Consolidando empresas' },
              { target: 97, suffix: '%', label: 'Satisfacción Cliente', description: 'Casos exitosos' }
            ].map((stat, index) => (
              <div key={index} className="group relative w-full sm:w-auto">
                {/* Decorative border */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl sm:rounded-3xl blur-sm"></div>
                
                {/* Main card */}
                <div className="relative bg-white/10 backdrop-blur-lg p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 text-center w-full sm:min-w-[260px] md:min-w-[280px] lg:min-w-[320px] max-w-sm mx-auto sm:mx-0 transition-all duration-300 hover:bg-white/15 hover:scale-105">
                  {/* Professional Icon */}
                  <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 backdrop-blur-sm border border-white/30">
                    {index === 0 ? (
                      // Calendar icon for experience
                      <svg className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      // Chart icon for satisfaction
                      <svg className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Number - Responsive sizing */}
                  <div className="mb-4 sm:mb-6">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-white via-[#b3d9ff] to-[#e6f2ff] bg-clip-text text-transparent filter drop-shadow-lg">
                      <StatCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                  </div>
                  
                  {/* Label - Responsive sizing */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white leading-tight px-2">
                    {stat.label}
                  </h3>
                  
                  {/* Description - Responsive sizing */}
                  <p className="text-sm sm:text-base text-[#b3d9ff] font-medium opacity-90 leading-relaxed px-2">
                    {stat.description}
                  </p>
                  
                  {/* Subtle accent line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="nosotros" className="py-25 bg-white text-center">
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-[#00418c] mb-8 font-bold">
              ¿Por Qué Elegir AS Soluciones?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
              En AS Soluciones trabajamos como aliados estratégicos de tu negocio. Nuestro enfoque combina experiencia, atención personalizada y soluciones innovadoras para garantizar que alcances tus objetivos con eficiencia y confianza.
            </p>
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={() => scrollToSection('contacto')}
                className="cursor-pointer text-white px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #0066cc 0%, #00418c 100%)',
                  boxShadow: '0 8px 30px rgba(0, 65, 140, 0.3)'
                }}
              >
                COMENZAR AHORA
              </button>
              <a 
                href="tel:+523347622946" 
                className="bg-transparent text-[#00418c] border-2 border-[#00418c] px-9 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:bg-[#00418c] hover:text-white"
              >
                LLAMAR AHORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contacto" 
        className="text-white py-16 sm:py-20 lg:py-25 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #00418c 45%, #0066cc 100%)'
        }}
      >
        {/* Background particles */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(0, 65, 140, 0.2) 0%, transparent 50%)
            `
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center relative z-10">
            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8 font-bold bg-gradient-to-br from-white to-[#b3d9ff] bg-clip-text text-transparent leading-tight">
                Hablemos de tu Proyecto
              </h2>
              <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 leading-relaxed">
                Cuéntanos tus necesidades y te mostraremos cómo podemos ayudarte a llevar tu empresa al siguiente nivel.
              </p>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold my-6 sm:my-8 text-[#b3d9ff]">
                +52 33 4762 2946
              </div>
              <p className="text-base sm:text-lg opacity-90">
                Lunes a viernes de 9:00 AM a 6:00 PM
              </p>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-2xl border border-white/20">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">AS Soluciones</h3>
              <p className="text-slate-300 leading-relaxed">
                Consultoría integral con enfoque en resultados. Acompañamos a nuestros clientes en cada etapa, desde el cumplimiento fiscal hasta el crecimiento comercial.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">Servicios</h3>
              <ul className="list-none space-y-3">
                {[
                  'Asesoría Fiscal',
                  'Contabilidad', 
                  'Cumplimiento Fiscal',
                  'Seguridad social'
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
              <h3 className="text-[#66b3ff] mb-6 text-xl font-semibold">Contacto</h3>
              <ul className="list-none space-y-3">
                <li>
                  <a 
                    href="tel: 33 4762 2946" 
                    className="text-slate-400 hover:text-[#66b3ff] transition-colors duration-300"
                  >
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
                    Agenda tu consulta
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-slate-500">
            <p>&copy; 2024 AS Soluciones. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [target]);

  return <span>{count}{suffix}</span>;
};

export default Home;