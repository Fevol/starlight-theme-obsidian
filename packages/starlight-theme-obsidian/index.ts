import type { StarlightPlugin } from '@astrojs/starlight/types';
import starlightSiteGraph from 'starlight-site-graph';
import { type StarlightThemeObsidianConfig, validateConfig } from 'starlight-theme-obsidian/config';

export default function plugin(userConfig?: StarlightThemeObsidianConfig): StarlightPlugin {
	const parsedConfig = validateConfig(userConfig);

	let i18nArgs = null;
	return {
		name: 'starlight-theme-obsidian',
		hooks: {
			'i18n:setup': async args => {
				i18nArgs = args;
			},
			'config:setup': async args => {
				const { config, logger, updateConfig } = args;

				// TODO: This is a temporary bodge until `addPlugin` PR is created
				if (config.plugins?.some(plugin => plugin.name === 'starlight-site-graph')) {
					logger.warn(
						'`starlight-site-graph` is already included in the `astro.config.mjs`. Skipping integration.',
					);
				} else {
					// TODO: This is dumb, bad, and I should really start work on that `addPlugin` PR...
					const starlightPlugin = starlightSiteGraph(parsedConfig);
					await starlightPlugin.hooks['i18n:setup']?.(i18nArgs);
					await starlightPlugin.hooks['config:setup']?.(args);
				}
				const customCss: typeof config.customCss = [
					'starlight-theme-obsidian/styles/layers.css',
					'starlight-theme-obsidian/styles/theme.css',
					'starlight-theme-obsidian/styles/centered-reading.css',
					'starlight-theme-obsidian/styles/common.css',
					'starlight-site-graph/styles/common.css',
				];

				const componentOverrides: typeof config.components = {};

				type OverridableComponent = 'Sidebar' | 'PageFrame' | 'Pagination' | 'ThemeSelect' | 'PageSidebar';
				const overridableComponents: OverridableComponent[] = [
					'Sidebar',
					'PageFrame',
					'Pagination',
					'ThemeSelect',
					'PageSidebar',
				];
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
