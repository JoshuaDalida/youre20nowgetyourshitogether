import { pgTable, serial, text, timestamp, boolean} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerk_id: text("clerk_id").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  task_id: serial("task_id").unique().primaryKey(),
  clerk_id: text("clerk_id").notNull(),
  task_name: text("task_name").notNull(),
  completed: boolean("completed").notNull().default(false),
});

