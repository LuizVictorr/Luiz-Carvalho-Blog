// components/Footer.js
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'; // Substitua 'fa' pelo pacote correto, se necessário
import styles from './css/Footer.module.css'; // Substitua pelo caminho correto

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialMedia}>
        <a href="https://www.facebook.com/seu-facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/seu-instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.youtube.com/seu-canal" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
      <div className={styles.footerText}>
        <p>Blog da Luiz Carvalho © 2023. Todos os direitos reservados.</p>
        <p>
          <a href="/direitos-autorais">Direitos Autorais</a> | <a href="/termos-de-uso">Termos de Uso</a> |{' '}
          <a href="/politicas-de-privacidade">Políticas de Privacidade</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
