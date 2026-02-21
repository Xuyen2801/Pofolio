import { db } from "./db";
import {
  messages,
  type InsertMessage,
  type Message,
  type PortfolioData
} from "@shared/schema";
import portfolioDataJson from "./data.json";

export interface IStorage {
  getPortfolio(): Promise<PortfolioData>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getPortfolio(): Promise<PortfolioData> {
    return portfolioDataJson as PortfolioData;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
