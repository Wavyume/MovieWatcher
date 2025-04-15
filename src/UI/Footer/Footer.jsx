import React from 'react';
import cl from './Footer.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  faLinkedin,
  faTelegram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className={cl.footer}>
      <div className={cl['footer-wrapper']}>
        <a
          href="https://www.linkedin.com/in/wavyume/"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className={cl.icon} />
        </a>
        <a
          href="https://t.me/wavyume"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTelegram} className={cl.icon} />
        </a>
        <a
          href="https://github.com/Wavyume"
          target="_blank"
          rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className={cl.icon} />
        </a>
      </div>
      <p className={cl.copyright}>©2025 made by wavyume</p>
    </div>
  );
};

export default Footer;
