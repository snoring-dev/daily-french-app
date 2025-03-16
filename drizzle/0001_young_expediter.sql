CREATE TABLE `phrases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`word_id` integer NOT NULL,
	`texte` text NOT NULL,
	`niveau` text NOT NULL,
	`contexte` text NOT NULL,
	FOREIGN KEY (`word_id`) REFERENCES `words`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`word` text NOT NULL,
	`type` text NOT NULL,
	`explication` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `completions`;--> statement-breakpoint
DROP TABLE `definitions`;--> statement-breakpoint
DROP TABLE `french_words`;