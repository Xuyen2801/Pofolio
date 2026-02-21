import { usePortfolio } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { 
  Download, Mail, Github, Linkedin, ChevronRight, 
  Terminal, Database, Layout, Server, CheckCircle2 
} from "lucide-react";
import { useState } from "react";

export default function Portfolio() {
  const { data, isLoading, error } = usePortfolio();
  const [projectFilter, setProjectFilter] = useState<string>("ALL");

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">Failed to load portfolio data.</div>;
  if (!data) return null;

  const filteredProjects = projectFilter === "ALL" 
    ? data.projects 
    : data.projects.filter(p => p.tags.includes(projectFilter));

  const uniqueTags = ["ALL", ...Array.from(new Set(data.projects.flatMap(p => p.tags)))];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10" />

        <div className="container px-4 md:px-6 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              Software Engineering Student
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-6 leading-tight">
              Hi, I'm <span className="text-gradient">{data.hero.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 font-light leading-relaxed">
              {data.hero.tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg" className="rounded-full px-8 text-base h-12" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View Projects
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12">
                Download CV
                <Download className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="mt-12 flex gap-6 justify-center md:justify-start">
              <a href={data.contact.github} className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href={data.contact.linkedin} className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={`mailto:${data.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-[2rem] rotate-6 opacity-20 blur-xl" />
              <img 
                src={data.hero.avatarUrl} 
                alt="Profile" 
                className="relative w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-background"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeading title="About Me" subtitle="Get to know me a little better." />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="p-6 border-none shadow-lg bg-card/50 backdrop-blur">
                <h3 className="text-2xl font-bold mb-4 font-display">Education</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Layout className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Major</p>
                      <p className="text-lg font-medium">{data.about.major}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Terminal className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Current Year</p>
                      <p className="text-lg font-medium">{data.about.year}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display">Career Goal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.about.careerGoal}
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Key Strengths
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.about.strengths.map(strength => (
                    <Badge key={strength} variant="secondary" className="px-3 py-1 text-sm">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 font-display flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  Tech I Love
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.about.techLiked.map(tech => (
                    <Badge key={tech} variant="outline" className="px-3 py-1 text-sm border-primary/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="container px-4 md:px-6">
          <SectionHeading title="Skills & Expertise" subtitle="My technical toolkit and capabilities." />
          
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 font-display flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Technical Skills
              </h3>
              <div className="space-y-6">
                {data.skills.technical.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && <span className="text-muted-foreground">{skill.level}%</span>}
                    </div>
                    {skill.level && (
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 font-display flex items-center gap-3">
                <Layout className="w-6 h-6 text-primary" />
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.soft.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-center text-center font-medium"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <SectionHeading title="Featured Projects" subtitle="A collection of my best work." />
          
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-1 bg-background rounded-full border shadow-sm">
              {uniqueTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setProjectFilter(tag)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    projectFilter === tag 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container px-4 md:px-6 max-w-4xl">
          <SectionHeading title="Experience" subtitle="My professional journey so far." />
          
          <div className="space-y-12">
            {data.experience.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                
                <div className={`md:flex items-center justify-between gap-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className="flex-1 text-left md:text-right md:order-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 mt-1.5 md:mt-0 z-10" />
                  
                  <div className="flex-1 pt-2 md:pt-0">
                    <h3 className="text-xl font-bold font-display">{exp.title}</h3>
                    <p className="text-lg text-primary font-medium mb-2">{exp.organization}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <SectionHeading title="Certifications" className="text-primary-foreground" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary-foreground/10 p-6 rounded-xl border border-white/10 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors"
              >
                <div className="mb-4 text-primary-foreground/60 text-sm font-mono">{cert.year}</div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm opacity-80">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container px-4 md:px-6 max-w-5xl">
          <SectionHeading title="Get In Touch" subtitle="Have a project in mind or just want to say hi?" />
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold font-display mb-6">Contact Information</h3>
              <div className="space-y-6">
                <a href={`mailto:${data.contact.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Me</p>
                    <p className="font-medium text-lg">{data.contact.email}</p>
                  </div>
                </a>
                
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Linkedin />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-medium text-lg">Connect professionally</p>
                  </div>
                </a>

                <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Github />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GitHub</p>
                    <p className="font-medium text-lg">Check my code</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border shadow-lg">
              <h3 className="text-2xl font-bold font-display mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/20">
        <div className="container px-4 md:px-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center space-y-8">
      <div className="flex gap-8 items-center w-full max-w-4xl">
        <div className="space-y-4 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <Skeleton className="h-64 w-64 rounded-full" />
      </div>
    </div>
  );
}
