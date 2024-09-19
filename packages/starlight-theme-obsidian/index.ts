import type { StarlightPlugin } from '@astrojs/starlight/types';
import starlightSiteGraph from 'starlight-site-graph';
import { type StarlightSiteGraphConfig } from 'starlight-site-graph/config';

export default function plugin(userConfig?: StarlightSiteGraphConfig): StarlightPlugin {
    return {
        name: 'starlight-theme-obsidian',
        hooks: {
            setup: async (args) => {
                const { config, logger, updateConfig } = args;

                // TODO: This is a temporary bodge until `addPlugin` PR is created
                if (config.plugins?.some(plugin => plugin.name === 'starlight-site-graph')) {
                    logger.warn("`starlight-site-graph` is already included in the `astro.config.mjs`. Skipping integration.");
                } else {
                    await (starlightSiteGraph(userConfig).hooks).setup(args);
                }
                const customCss: typeof config.customCss = ['starlight-theme-obsidian/styles/common.css',
                    'starlight-site-graph/styles/common.css',
                ];


                const componentOverrides: typeof config.components = {};

                const overridableComponents = ['Sidebar', 'PageFrame', 'Pagination', 'ThemeSelect', 'MobileMenuFooter', 'PageSidebar'];
                for (const component of overridableComponents) {
                    if (config.components?.[component]) {
                        logger.warn(
                            `It looks like you already have a \`${component}\` component override in your Starlight configuration.`,
                        );
                    } else {
                        componentOverrides[component] = `starlight-theme-obsidian/overrides/${component}.astro`;
                    }
                }

                updateConfig({
                    components: {
                        ...componentOverrides,
                        ...config.components,
                    },
                    customCss: [...customCss, ...(config.customCss ?? [])],
                });
            },
        },
    };
}
