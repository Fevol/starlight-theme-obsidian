import { AstroError } from 'astro/errors';
import { z } from 'astro/zod';

import { starlightSiteGraphConfigSchema } from 'starlight-site-graph/config';

export const starlightThemeObsidianConfigSchema = starlightSiteGraphConfigSchema.removeDefault().extend({
    /**
     * Whether to add a graph component to the sidebar
     *
     * @remarks If false, it is equivalent to setting `graphConfig.visibilityRules` an empty array
     * @default true
     */
    graph: z.boolean().default(true),

    /**
     * Whether to add a backlinks panel to the sidebar
     *
     * @remarks If false, it is equivalent to setting `backlinksConfig.visibilityRules` an empty array
     * @default true
     */
    backlinks: z.boolean().default(true),
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
