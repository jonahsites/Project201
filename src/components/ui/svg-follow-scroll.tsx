"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const floatingImages = [
    {
      src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
      style: { top: "25%", right: "8%", width: "22vw" },
      range: [0.1, 0.2, 0.3, 0.4]
    },
    {
      src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800",
      style: { top: "40%", left: "12%", width: "18vw" },
      range: [0.25, 0.35, 0.45, 0.55]
    },
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
      style: { top: "55%", right: "12%", width: "24vw" },
      range: [0.4, 0.5, 0.6, 0.7]
    },
    {
      src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
      style: { top: "70%", left: "8%", width: "20vw" },
      range: [0.55, 0.65, 0.75, 0.85]
    },
    {
      src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800",
      style: { top: "85%", right: "5%", width: "15vw" },
      range: [0.7, 0.8, 0.9, 1.0]
    },
    {
      src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800",
      style: { top: "92%", left: "5%", width: "18vw" },
      range: [0.8, 0.9, 0.95, 1.0]
    }
  ];

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[350vh] w-screen flex-col items-center overflow-hidden bg-white px-4 text-brand-blue relative"
    >
      {/* Floating Images */}
      {floatingImages.map((img, i) => {
        const opacity = useTransform(scrollYProgress, img.range, [0, 1, 1, 0]);
        const scale = useTransform(scrollYProgress, img.range, [0.8, 1, 1, 0.8]);
        const y = useTransform(scrollYProgress, img.range, [50, 0, 0, -50]);

        return (
          <motion.img
            key={i}
            src={img.src}
            style={{ 
              ...img.style,
              opacity,
              scale,
              y,
              position: 'absolute',
              zIndex: 5
            }}
            className="rounded-3xl shadow-2xl object-cover aspect-[4/3]"
          />
        );
      })}

      <div className="mt-42 relative flex w-fit flex-col items-center justify-center gap-5 text-center">
        <h2 className="font-display relative z-10 text-6xl font-bold tracking-[-0.08em] lg:text-9xl uppercase">
          EMPOWERING <br /> THE NEXT <br />
          GENERATION
        </h2>
        <p className="font-sans relative z-10 max-w-2xl text-xl font-medium text-slate-500 uppercase tracking-widest">
          Scroll down to see our progress
        </p>

        <LinePath
          className="absolute -right-[40%] top-0 z-0 opacity-20"
          scrollYProgress={scrollYProgress}
        />
      </div>

      <div className="rounded-4xl font-display w-full translate-y-[200vh] bg-brand-blue pb-10 text-white">
        <h1 className="mt-10 text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[16.6vw] uppercase">
          PROJECT 201
        </h1>
        <div className="mt-80 flex w-full flex-col items-start gap-5 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between uppercase">
          <div className="flex w-full items-center justify-between gap-12 lg:w-fit lg:justify-center">
            <p className="w-fit text-sm">
              Jersey City, NJ <br />
              and online
            </p>
            <p className="w-fit text-right text-sm lg:text-left">
              May 14, 2026 <br /> Hudson Gives
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-12 lg:w-fit lg:justify-center">
            <p className="w-fit text-sm">
              Mentorship <br /> free
            </p>
            <p className="w-fit text-right text-sm lg:text-left">
              Join the mission <br /> Donate today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#89CFF0"
        strokeWidth="20"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};
