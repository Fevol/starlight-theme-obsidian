import type { StarlightPlugin } from '@astrojs/starlight/types';
import { type StarlightThemeObsidianConfig, validateConfig } from 'starlight-theme-obsidian/config';

export default function plugin(userConfig?: StarlightThemeObsidianConfig): StarlightPlugin {
	const settings = validateConfig(userConfig);

	let i18nArgs = null;
	return {
		name: 'starlight-theme-obsidian',
		hooks: {
			'i18n:setup': async args => {
				i18nArgs = args;
			},
			'config:setup': async args => {
				const { config, logger, updateConfig } = args;

				const customCss: typeof config.customCss = [
					'starlight-theme-obsidian/styles/layers.css',
					'starlight-theme-obsidian/styles/theme.css',
					'starlight-theme-obsidian/styles/centered-reading.css',
					'starlight-theme-obsidian/styles/common.css'
				];

				const componentOverrides: typeof config.components = {};

				type StarlightComponent = "Sidebar" | "PageFrame" | "Pagination" | "ThemeSelect" | "PageSidebar";
				const overridableComponents: Record<StarlightComponent, string> = {
					'Sidebar': 'Sidebar',
					'PageFrame': 'PageFrame',
					'Pagination': 'Pagination',
					'ThemeSelect': 'ThemeSelect',
					'PageSidebar': 'PageSidebar',
				};

				if (settings.overrideWarnings) {
					const pluginsAfterTheme =
						config.plugins?.slice(
							config.plugins.findIndex(p => p.name === 'starlight-theme-obsidian') + 1,
						) ?? [];
					for (const plugin of pluginsAfterTheme) {
						const pluginConfigSetup = plugin['hooks']?.['config:setup'];
						if (pluginConfigSetup) {
							const functionBody = pluginConfigSetup.toString();
							const includedIdentifiers = Object.keys(overridableComponents).filter(identifier =>
								functionBody.includes(identifier),
							);

							if (includedIdentifiers.length !== 0) {
								const allIdentifiers = includedIdentifiers.join('`, `');
								logger.warn(
									`The plugin \`${plugin.name}\` appears to override the following components in its \`config:setup\` hook: \`${allIdentifiers}\`.`,
								);
								logger.warn(
									`\tSince this plugin is listed after \`starlight-theme-obsidian\`, it will take precedence over the theme's built-in support for these plugins.`,
								);
								logger.warn(
									`\tPlease move the \`starlight-theme-obsidian\` plugin to the end of your plugins list in your Starlight configuration to ensure compatibility.`,
								);
								logger.warn(
									`\tSuppress this warning by setting the \`overrideWarnings\` option to \`false\` in your Starlight configuration.`,
								);
							}
						}
					}
				}

				if (config.plugins?.some(plugin => plugin.name === 'starlight-site-graph-plugin')) {
					logger.info('Detected `starlight-site-graph` plugin, applying compatibility settings...');
					overridableComponents.PageSidebar += `-slsg`;
					customCss.push('starlight-theme-obsidian/styles/extensions/starlight-site-graph.css');
				}

				if (config.plugins?.some(plugin => plugin.name === 'starlight-sidebar-topics')) {
					logger.info('Detected `starlight-sidebar-topics` plugin, applying compatibility settings...');
					overridableComponents.Sidebar += `-ssbt`;
					customCss.push('starlight-theme-obsidian/styles/extensions/starlight-sidebar-topics.css');
				}

				for (const identifier of Object.keys(overridableComponents) as StarlightComponent[]) {
					const other_usage = config.components?.[identifier];
					if (settings.overrideWarnings && other_usage) {
						if (!other_usage.startsWith('starlight-site-graph/')) {
							const isLocal = other_usage.startsWith('./') || other_usage.startsWith('../') || other_usage.startsWith('/');
							if (isLocal) {
								logger.warn(`A local override for the \`${identifier}\` component was detected at \`${other_usage}\`.`)
								logger.warn(`\t\`starlight-theme-obsidian\` will skip overriding this component to avoid conflicts.`)
								logger.warn(`\tIf you are trying to support another plugin, please consider opening an issue on this theme's repository to have it supported by default.`)
								logger.warn(`\tSuppress this warning by setting the \`overrideWarnings\` option to \`false\` in your Starlight configuration.`)
							} else {
								logger.warn(`A \`${identifier}\` component override was defined for a plugin that this theme does not have built-in support for: \`${other_usage}\`.`)
								logger.warn(`\t\`starlight-theme-obsidian\` will skip overriding this component to avoid conflicts.`)
								logger.warn(`\tIf you are trying to use another plugin with this theme, please consider opening an issue on this theme's repository to have it supported by default.`)
								logger.warn(`\tSuppress this warning by setting the \`overrideWarnings\` option to \`false\` in your Starlight configuration.`)
							}
							continue;
						}
					}

					componentOverrides[identifier] = `starlight-theme-obsidian/overrides/${overridableComponents[identifier]}.astro`;
				}

				updateConfig({
					components: {
						...config.components,
						...componentOverrides,
					},
					customCss: [...customCss, ...(config.customCss ?? [])],
				});
			},
		},
	};
}
