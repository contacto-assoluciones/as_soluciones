import React from "react";
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa";
import styled from 'styled-components';

const SocialCard = () => {
  const baseBtn =
    "group w-[52px] h-[52px] flex items-center justify-center rounded-[30px] bg-[#1e2d9e] text-white transition-all duration-300 hover:scale-110 active:scale-95";

  return (
    <div className="flex items-center justify-center gap-5 p-4 bg-transparent">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/assoluciones.mx?igsh=bDV0M3ZzcXA1NGtu"
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} hover:bg-[#d62976]`}
        aria-label="Instagram"
      >
        <FaInstagram className="w-5 h-5 group-hover:animate-bounce" />
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@as.soluciones?_t=ZS-90MI75jFG9g&_r=1"
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} hover:bg-[#010101]`}
        aria-label="TikTok"
      >
        <FaTiktok className="w-5 h-5 group-hover:animate-bounce" />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1FHdT51XRq/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} hover:bg-[#1877F2]`}
        aria-label="Facebook"
      >
        <FaFacebook className="w-5 h-5 group-hover:animate-bounce" />
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/5213347622946"
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtn} hover:bg-[#25D366]`}
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 group-hover:animate-bounce" />
      </a>
    </div>
  );
};


const StyledWrapper = styled.div`
  .card {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    gap: 20px;
  }

  /* for all social containers*/
  .socialContainer {
    width: 52px;
    height: 52px;
    background-color: #1e2d9e;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition-duration: 0.3s;
    border-radius: 30px;
  }
  /* instagram*/
  .containerOne:hover {
    background-color: #d62976;
    transition-duration: 0.3s;
    transform: scale(1.2);
  }
  /* twitter*/
  .containerTwo:hover {
    background-color: #00acee;
    transition-duration: 0.3s;
    transform: scale(1.2);
  }
  /* linkdin*/
  .containerThree:hover {
    background-color: #0072b1;
    transition-duration: 0.3s;
    transform: scale(1.2);
  }
  /* Whatsapp*/
  .containerFour:hover {
    background-color: #128c7e;
    transition-duration: 0.3s;
    transform: scale(1.2);
  }

  .socialContainer:active {
    transform: scale(0.9);
    transition-duration: 0.3s;
  }

  .socialSvg {
    width: 17px;
  }

  .socialSvg path {
    fill: rgb(255, 255, 255);
  }

  .socialContainer:hover .socialSvg {
    animation: slide-in-top 0.3s both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }`;

export default SocialCard;