import type { StarlightPlugin } from '@astrojs/starlight/types';
import starlightSiteGraph from 'starlight-site-graph';
import { type StarlightThemeObsidianConfig, validateConfig } from 'starlight-theme-obsidian/config';

export default function plugin(userConfig?: StarlightThemeObsidianConfig): StarlightPlugin {
	const parsedConfig = validateConfig(userConfig);
	return {
		name: 'starlight-theme-obsidian',
		hooks: {
			'config:setup': async args => {
				const { config, logger, updateConfig } = args;
				// TODO: Temporary implementation of graph/backlinks exclusion from theme
				//       Eventually, starlight-site-graph should be an optional dependency
				if (!parsedConfig.graph) {
					parsedConfig.graphConfig.visibilityRules = [];
				}
				if (!parsedConfig.backlinks) {
					parsedConfig.backlinksConfig.visibilityRules = [];
				}
				if (!(parsedConfig.graph || parsedConfig.backlinks)) {
					// This bypasses the sitemap generation, so page contents don't have to be parsed
					parsedConfig.sitemapConfig.pageInclusionRules = [];
				}

				// TODO: This is a temporary bodge until `addPlugin` PR is created
				if (config.plugins?.some(plugin => plugin.name === 'starlight-site-graph')) {
					logger.warn(
						'`starlight-site-graph` is already included in the `astro.config.mjs`. Skipping integration.',
					);
				} else {
					await starlightSiteGraph(parsedConfig).hooks['config:setup']?.(args);
				}
				const customCss: typeof config.customCss = [
					'starlight-theme-obsidian/styles/common.css',
					'starlight-site-graph/styles/common.css',
				];

				const componentOverrides: typeof config.components = {};

				const overridableComponents = ['Sidebar', 'PageFrame', 'Pagination', 'ThemeSelect', 'PageSidebar'];
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

