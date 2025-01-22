import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import {type BaseSchema, defineCollection} from 'astro:content';
import { pageThemeObsidianSchema } from 'starlight-theme-obsidian/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// TODO: Identify type conflict problem
			extend: pageThemeObsidianSchema as BaseSchema,
		}),
	}),
};
