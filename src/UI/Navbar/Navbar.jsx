import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFilm, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import classes from './Navbar.module.css';
import SearchResultsWindow from '../../components/SearchResultsWindow/SearchResultsWindow';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const inputRef = useRef(null);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    const handleScroll = () => {
      if (isMobile) {
        if (!isFocused) {
          setIsVisible(window.scrollY < lastScrollY);
          lastScrollY = window.scrollY;
        }
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, isFocused]);

  return (
    <div
      className={`${classes.navbar} 
      ${isScrolled ? classes['navbar-scrolled'] : ''}
      ${isMobile && !isVisible ? classes.hidden : ''}`}>
      <Link to={'/'}>
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faFilm}
            className={`${classes.icon} ${
              isFocused && window.innerWidth <= 480 ? classes.hidden : ''
            }`}
          />
        </div>
      </Link>
      <div className={classes['input-container']}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={classes['search-icon']}
        />
        <motion.input
          ref={inputRef}
          className={classes.myInput}
          placeholder="Search movie"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          animate={{width: isFocused ? '550px' : '200px'}}
          transition={{duration: 0.3}}
        />
        <SearchResultsWindow isFocused={isFocused} inputRef={inputRef} />
      </div>
    </div>
  );
};

export default Navbar;
