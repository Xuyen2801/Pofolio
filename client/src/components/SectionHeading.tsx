import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, className = "", align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-20 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight mb-4 text-gradient inline-block">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className={`h-1.5 w-24 bg-primary rounded-full mt-6 ${align === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
