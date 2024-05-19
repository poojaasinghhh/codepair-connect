import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const testing = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  fullName: text("full_name"),
});
