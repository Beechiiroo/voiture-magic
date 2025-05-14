
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  highlight?: string;
  delay?: number;
}

const AnimatedTitle = ({ 
  title, 
  subtitle, 
  className = "", 
  highlight = "rental-600",
  delay = 0 
}: AnimatedTitleProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Séparer le titre en mots
  const titleWords = title.split(" ");

  // Animation pour chaque mot
  const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + i * 0.2,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  // Animation pour le sous-titre
  const subtitleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + titleWords.length * 0.2 + 0.3,
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className={`${className}`}>
      <h2 className="font-heading">
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={titleAnimation}
            initial="hidden"
            animate={controls}
            className={`inline-block ${
              word.includes("<highlight>") && word.includes("</highlight>")
                ? `text-${highlight}`
                : ""
            }`}
          >
            {word.replace("<highlight>", "").replace("</highlight>", "")}{" "}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          variants={subtitleAnimation}
          initial="hidden"
          animate={controls}
          className="text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedTitle;
