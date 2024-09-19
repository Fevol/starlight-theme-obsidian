import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import { pageSchema } from 'starlight-theme-obsidian/schema';

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: context => pageSchema(context),
		}),
	}),
};
