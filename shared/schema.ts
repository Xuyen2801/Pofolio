import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- Contact Form ---
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// --- Portfolio JSON Data Schema ---
export const portfolioSchema = z.object({
  hero: z.object({
    name: z.string(),
    role: z.string(),
    tagline: z.string(),
    avatarUrl: z.string(),
  }),
  about: z.object({
    major: z.string(),
    year: z.string(),
    careerGoal: z.string(),
    strengths: z.array(z.string()),
    techLiked: z.array(z.string()),
  }),
  skills: z.object({
    technical: z.array(z.object({ name: z.string(), level: z.number().optional() })),
    soft: z.array(z.string()),
  }),
  projects: z.array(z.object({
    id: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    shortDesc: z.string(),
    techStack: z.array(z.string()),
    demoLink: z.string().optional(),
    githubLink: z.string().optional(),
    role: z.string(),
    imageUrl: z.string(),
  })),
  experience: z.array(z.object({
    title: z.string(),
    organization: z.string(),
    period: z.string(),
    description: z.string(),
  })),
  certifications: z.array(z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string(),
  })),
  contact: z.object({
    email: z.string(),
    github: z.string(),
    linkedin: z.string(),
  })
});

// === EXPLICIT API CONTRACT TYPES ===
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type PortfolioData = z.infer<typeof portfolioSchema>;
