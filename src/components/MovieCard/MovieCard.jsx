import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import cl from "./MovieCard.module.css";
const response_poster = "https://image.tmdb.org/t/p/w185";

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

const MovieCard = (props) => {
  return (
    <motion.div
      className={cl.post}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={`${response_poster}${props.movie.poster_path}`} />
      <div>{props.movie.title}</div>
    </motion.div>
  );
};

export default MovieCard;
