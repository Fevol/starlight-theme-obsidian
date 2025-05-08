import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidianTheme from 'starlight-theme-obsidian';
import starlightLinksValidator from 'starlight-links-validator';

export default defineConfig({
    site: "https://fevol.github.io",
    base: "/starlight-theme-obsidian",
    integrations: [
        starlight({
            title: 'Starlight Obsidian Theme',
            credits: true,
            social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/fevol/starlight-theme-obsidian'},
				{ icon: 'discord', label: 'Discord', href: 'https://discord.com/users/264169866511122432' },
            ],
            editLink: {
                baseUrl: 'https://github.com/fevol/starlight-theme-obsidian/edit/main/docs/',
            },
            customCss: [
                './src/styles/global.css'
            ],
            plugins: [
                starlightLinksValidator({
                    errorOnInvalidHashes: false
                }),
                starlightObsidianTheme(),
            ],
            favicon: './favicon.svg',
            sidebar: [
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Getting Started', link: '/getting-started/' },
                        { label: 'Contributing', link: '/contributing/' },
                        { label: 'Attribution', link: '/attribution/' },
                        { label: 'Changelog', link: '/changelog/' },
                    ],
                },
                {
                    label: 'Configuration',
                    autogenerate: { directory: 'configuration' },
                },
                {
                    label: 'Components',
                    autogenerate: { directory: 'components' },
                },
                {
                    label: 'Examples',
                    autogenerate: { directory: 'examples' },
                },
            ],
            components: {
                Head: './src/overrides/Head.astro',
            },
        }),
    ],
    devToolbar: { enabled: false },
});
