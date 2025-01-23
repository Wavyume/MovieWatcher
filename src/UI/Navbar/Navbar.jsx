import React, {useEffect, useState} from 'react';
import {useSpring, animated} from 'react-spring';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import classes from './Navbar.module.css';

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const inputStyle = useSpring({
    width: isFocused ? '400px' : '200px',
    config: {duration: 300},
  });

  return (
    <div
      className={`${classes.navbar} ${
        isScrolled ? classes['navbar-scrolled'] : ''
      }`}>
      <div className="icon-container">
        <FontAwesomeIcon icon={faFilm} className={classes.icon} />
      </div>
      <animated.input
        style={inputStyle}
        className={classes.myInput}
        placeholder="Search movie"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default Navbar;
