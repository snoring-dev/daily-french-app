ALTER TABLE `words` ADD `original_id` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `words_original_id_unique` ON `words` (`original_id`);