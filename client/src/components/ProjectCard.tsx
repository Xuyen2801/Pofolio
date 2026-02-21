import { motion } from "framer-motion";
import { Github, ExternalLink, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { PortfolioData } from "@shared/schema";

type Project = PortfolioData["projects"][0];

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
        <div className="relative h-48 overflow-hidden bg-muted">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <Code className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.demoLink && (
              <Button size="icon" variant="secondary" asChild className="rounded-full">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            )}
            {project.githubLink && (
              <Button size="icon" variant="secondary" asChild className="rounded-full">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold font-display">{project.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.shortDesc}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs bg-muted/30">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-6 text-xs text-muted-foreground border-t bg-muted/20 p-4">
          <span className="font-semibold mr-2">Role:</span> {project.role}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
