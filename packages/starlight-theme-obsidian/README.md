<p align="center">
	<img src="https://raw.githubusercontent.com/Fevol/starlight-theme-obsidian/refs/heads/main/assets/icon.png" width="400">
</p>

---

<div align="center">
<a href="https://github.com/Fevol/starlight-theme-obsidian/" style="text-decoration: none">
<img alt="Starlight Obsidian Theme downloads - weekly" src="https://img.shields.io/npm/dw/starlight-theme-obsidian?label=Downloads:&logo=npm&color=CB3837&logoColor=CB3837">
</a>
<a href="https://github.com/Fevol/starlight-theme-obsidian/stargazers" style="text-decoration: none">
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/fevol/starlight-theme-obsidian?color=yellow&label=Stargazers%3A&logo=OpenTelemetry&logoColor=yellow">
</a>
<a href="https://github.com/Fevol/starlight-theme-obsidian/actions/workflows/release.yml" style="text-decoration: none">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/fevol/starlight-theme-obsidian/.github/workflows/publish.yml?label=Build%20status%3A&logo=buddy&logoColor=5cff1e">
</a>
<a href="https://github.com/Fevol/starlight-theme-obsidian/releases/latest" style="text-decoration: none">
<img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/fevol/starlight-theme-obsidian?color=%234e96af&display_name=tag&include_prereleases&label=Latest%20release%3A&logo=Dropbox&logoColor=%236abdd9">
</a>
<br>
<a href="https://astro.build/" style="text-decoration: none">
<img alt="Astro" src="https://img.shields.io/badge/-Astro-BC52EE?logo=Astro&logoColor=white&style=flat&">
</a>
<a href="https://starlight.astro.build/" style="text-decoration: none">
<img alt="Starlight" src="https://img.shields.io/badge/-Starlight-E1A037?logo=Starship&logoColor=white&style=flat&">
</a>
</div>

---

<div align="center">
<h4>
 <a href="https://fevol.github.io/starlight-theme-obsidian/getting-started/">GET STARTED</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/starlight-theme-obsidian/">WEBSITE</a>
 <span>&nbsp;·&nbsp;</span>
 <a href="https://fevol.github.io/starlight-theme-obsidian/configuration/">CONFIGURATION</a>
</h4>
</div>

---

A [Starlight](https://starlight.astro.build/) theme inspired by the style of [Obsidian Publish](https://obsidian.md/publish) websites.

<br>
<p align="center">
	<img src="https://raw.githubusercontent.com/Fevol/starlight-theme-obsidian/refs/heads/main/assets/website-showcase.png" width="400">
</p>
<br>

---

<a name="table-of-contents"></a>

## 📑 Table of Contents

- [📑 Table of Contents](#table-of-contents)
- [🧰 Set-up](#setup)
- [💬 Discussion and Feedback](#discussion-and-feedback)
- [💎 Acknowledgements](#acknowledgements)
- [🤝 Contributors](#contributors)
- [❤️ Support](#support)

---

## 🧰 Set-up

You can install this package from [npm](https://www.npmjs.com/package/starlight-theme-obsidian) from your favourite package manager:

```bash
npm install starlight-theme-obsidian
```

If you are using Starlight, you can just add the following to your `astro.config.mjs`:

```js
// astro.config.mjs
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeObsidian from 'starlight-theme-obsidian'

export default defineConfig({
    integrations: [
        starlight({ 
            plugins: [starlightThemeObsidian({ ... })],
            title: 'My Docs',
        }),
    ],
})
```

For more information, check out the [Getting Started](https://fevol.github.io/starlight-theme-obsidian/getting-started/) guide.

<a name="discussion-and-feedback"></a>

## 💬 Discussion and Feedback

Any feedback would _very_ much be appreciated. Please use the [GitHub issue tracker](https://github.com/Fevol/starlight-theme-obsidian/issues/new) to report bugs, request features,
or suggest improvements, or message me over on Discord (`@fevol`).

---

<a name="acknowledgements"></a>

## 💎 Acknowledgements

This theme is heavily based on the [Starlight Rapide Theme](https://github.com/HiDeoo/starlight-theme-rapide) by HiDeoo, licensed under MIT.
All credits for page examples, project structure and certain styles go to them.

Where applicable, attribution has been added to each relevant piece of code (or codefile).

The moon icon used for the site favicon is adapted from [SVG Repo](https://www.svgrepo.com/svg/120949/moon), which has a CC0 license.

<a name="contributors"></a>

## 🤝 Contributors

[HiDeoo](https://github.com/HiDeoo/) - For creating the original Starlight Rapide Theme, which this theme is based on. <br>
[mProjectsCode](https://github.com/mProjectsCode) - For providing much-needed feedback on the project.

---

<a name="support"></a>

## ❤️ Support

If you like this project, please consider giving it a star on GitHub,
contributing some code, or sponsoring me via [GitHub Sponsors](https://github.com/sponsors/Fevol).
