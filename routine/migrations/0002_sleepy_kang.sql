ALTER TABLE "tasks" ADD COLUMN "task_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_id_unique" UNIQUE("task_id");