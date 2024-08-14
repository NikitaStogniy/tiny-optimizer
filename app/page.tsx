"use client";

import { motion } from "framer-motion";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import OptimisationComp from "./components/OptimisationComp";

const img_src = `${process.env.NEXT_PUBLIC_API_URL}/santaLucia.jpg`;

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold"
      >
        Optimize your images
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col items-center justify-center max-h-[500px] h-auto w-[300px] rounded-lg bg-clip-border overflow-clip overflow-hidden"
      >
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={img_src}
              srcSet={img_src}
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={img_src}
              srcSet={img_src}
              alt="Image two"
            />
          }
        />
      </motion.div>
      <OptimisationComp />
    </motion.main>
  );
}
