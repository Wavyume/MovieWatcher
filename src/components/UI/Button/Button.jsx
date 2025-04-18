import React from 'react';
import {motion} from 'framer-motion';
import cl from './Button.module.css';

const Button = ({
  onClick,
  children,
  className,
  whileHover = {scale: 1.2},
  whileTap = {scale: 0.9},
  transition = {type: 'spring', stiffness: 300},
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${cl.button} ${className}`}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}>
      {children}
    </motion.button>
  );
};

export default Button;
