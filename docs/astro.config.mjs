import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidianTheme from 'starlight-theme-obsidian';

export default defineConfig({
    site: "https://fevol.github.io",
    base: "/starlight-theme-obsidian",
    integrations: [
        starlight({
            title: 'Starlight Obsidian Theme',
            credits: true,
            social: {
                discord: 'https://discord.com/users/264169866511122432',
                github: 'https://github.com/fevol/starlight-theme-obsidian'
            },
            editLink: {
                baseUrl: 'https://github.com/fevol/starlight-theme-obsidian/edit/main/docs/',
            },
            customCss: [
                './src/styles/global.css'
            ],
            plugins: [
                starlightObsidianTheme(),
            ],
            favicon: './public/favicon.svg',
            sidebar: [
                {
                    label: 'Start Here',
                    items: [{ label: 'Getting Started', link: '/getting-started/' }],
                },
                {
                    label: 'Configuration',
                    autogenerate: { directory: 'configuration' },
                },
                {
                    label: 'Examples',
                    autogenerate: { directory: 'examples' },
                },
            ],
        }),
    ],
    devToolbar: { enabled: false },
});
