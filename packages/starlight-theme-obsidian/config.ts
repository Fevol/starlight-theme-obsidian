import { AstroError } from 'astro/errors';
import { z } from 'astro/zod';

export const starlightThemeObsidianConfigSchema = z.object({

	/**
	 * Whether to suppress warnings about overrides
	 * @default true
	 * @remarks If false, the plugin will not warn you if a plugin is overriding the theme's overrides or if you have local overrides for components that the theme is trying to override.
	 */
	overrideWarnings: z.boolean().optional().default(true),


}).default({});

export type StarlightThemeObsidianConfig = z.infer<typeof starlightThemeObsidianConfigSchema>;

export function validateConfig(userConfig: unknown): StarlightThemeObsidianConfig {
    const config = starlightThemeObsidianConfigSchema.safeParse(userConfig);

    if (!config.success) {
        const errors = config.error.flatten();
        throw new AstroError(
            `Invalid starlight-theme-obsidian configuration:

            ${errors.formErrors.map(formError => ` - ${formError}`).join('\n')}
            ${Object.entries(errors.fieldErrors)
                .map(([fieldName, fieldErrors]) => `- ${fieldName}: ${JSON.stringify(fieldErrors)}`)
                .join('\n')}
            `,
        );
    }

    return config.data;
}
