"use client"

import { motion } from "framer-motion"

interface TerrainWaveProps {
  fillColor?: string
  flip?: boolean
  className?: string
}

const PATH_A = "M0,60 C200,40 400,80 600,55 C800,30 1000,70 1200,50 C1350,35 1420,60 1440,52 L1440,100 L0,100 Z"
const PATH_B = "M0,50 C200,70 400,35 600,65 C800,55 1000,40 1200,62 C1350,50 1420,40 1440,48 L1440,100 L0,100 Z"

export default function TerrainWave({
  fillColor = "#FBF7F0",
  flip = false,
  className = "",
}: TerrainWaveProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : "none" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "80px" }}
      >
        <motion.path
          d={PATH_A}
          fill={fillColor}
          animate={{ d: [PATH_A, PATH_B, PATH_A] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
    </div>
  )
}
