import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Roles Enum
export type UserRole = 'user' | 'team_lead' | 'admin';

// Priority Levels
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// Story Status
export type StoryStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';

// Story Types
export type StoryType = 'story' | 'task' | 'bug' | 'epic' | 'adhoc' | 'call';

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  role: text("role").$type<UserRole>().notNull().default('user'),
  skills: text("skills").array(),
  managerId: varchar("manager_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Teams table
export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  leadId: varchar("lead_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team members junction table
export const teamMembers = pgTable("team_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").references(() => teams.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  key: text("key").notNull().unique(), // e.g., "PROJ"
  description: text("description"),
  teamId: varchar("team_id").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Stories table
export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id).notNull(),
  key: text("key").notNull(), // e.g., "PROJ-123"
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").$type<StoryType>().notNull().default('story'),
  status: text("status").$type<StoryStatus>().notNull().default('backlog'),
  priority: text("priority").$type<Priority>().notNull().default('medium'),
  storyPoints: integer("story_points"),
  estimatedHours: integer("estimated_hours"),
  loggedHours: integer("logged_hours").default(0),
  assigneeId: varchar("assignee_id").references(() => users.id),
  reporterId: varchar("reporter_id").references(() => users.id).notNull(),
  parentStoryId: varchar("parent_story_id").references(() => stories.id),
  acceptanceCriteria: text("acceptance_criteria").array(),
  labels: text("labels").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comments table
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storyId: varchar("story_id").references(() => stories.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isPrivate: boolean("is_private").default(false), // For team lead private notes
  createdAt: timestamp("created_at").defaultNow(),
});

// Time logs table
export const timeLogs = pgTable("time_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storyId: varchar("story_id").references(() => stories.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  duration: integer("duration").notNull(), // in minutes
  description: text("description"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI Insights table
export const aiInsights = pgTable("ai_insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storyId: varchar("story_id").references(() => stories.id),
  suggestionType: text("suggestion_type").notNull(), // 'effort_estimation', 'assignee', 'priority', etc.
  value: text("value").notNull(),
  confidence: integer("confidence"), // 0-100
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  loggedHours: true,
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
});

export const insertTimeLogSchema = createInsertSchema(timeLogs).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertTimeLog = z.infer<typeof insertTimeLogSchema>;
export type TimeLog = typeof timeLogs.$inferSelect;
