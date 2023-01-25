import { motion } from "framer-motion";
import React from "react";
function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, transition: { duration: 0.5 } }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      Home
      <button onClick={()=> console.log('lol')}>Logout</button>
    </motion.div>
  );
}

export default Home;
