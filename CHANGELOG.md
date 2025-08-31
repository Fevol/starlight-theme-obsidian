## [0.4.1](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.4.1) (2025/08/31)
### Changes
-   Bumps the minimum supported version for `starlight-site-graph` to `0.5.0`, due to style changes.

## [0.4.0](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.4.0) (2025/07/02)
### Changes
-   ⚠️ **Breaking change:** All classes provided by `starlight-site-graph` are now prefixed with `slsg-` to avoid conflicts with other packages.
    -   If you have written custom CSS that targets the classes provided by the package, you will need to update them to use the new prefix.

## [0.3.2](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.3.2) (2025/05/22)
### Upgrades
-   Bumps the minimum supported version for `starlight-site-graph` to `0.3.3`, due to internal refactoring.

## [0.3.1](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.3.1) (2025/05/09)
### Fixes
-   Properly add `sitegraph` as a layer to the CSS cascade, so that this theme can override its variables
-   Made the package version constraint less stringent, making `npm` less likely to throw a peer dependency error
    when installing the package.

## [0.3.0](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.3.0) (2025/05/09)
### Upgrades
-   The minimum supported version of Starlight is now `0.33.0` due to a change in the social link syntax and support for CSS cascade layers.
    - The theme now exists on the `obsidian` layer, added after the base `starlight` layer. 
    - Styles added by this theme can now be more easily overridden with custom CSS.


## [0.2.2](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.2.2) (2025/03/28)
### Fixes
-   Fix issue which may cause the `build` step to fail

## [0.2.1](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.2.1) (2025/03/22)
### Fixes
-   Improve overflow behaviour of social media icons in sidebar

## [0.2.0](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.2.0) (2025/03/21)
### Upgrades
-   ⚠️ **Minor change:** The minimum supported version of Starlight is now `0.32.0`, and Astro `5.5.0`.<br>
    No breaking changes are introduced in this upgrade, but it is recommended to update component overrides
    snippets that were provided by this plugin: please remove the following lines:
    ```diff
    ---
    -import type { Props } from '@astrojs/starlight/props';
    import Default from "@astrojs/starlight/components/PageSidebar.astro";
    ---
    
    -<Default {...Astro.props}><slot /></Default>
    +<Default><slot /></Default>
    ```

### Fixes
-   Center header for full-screen pages
-   Slightly improve rendering for dark reader extension users
-   All fixes from [`starlight-site-graph` version `0.3.0`](https://github.com/Fevol/starlight-site-graph/releases/tag/0.3.0)

## [0.1.1](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.1.1) (2025/01/23)
### Upgrades
-   The minimum supported version of Starlight is now `0.31.0`, and Astro `5.1.5`.


## [0.1.0](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.1.0) (2025/01/22)
### Upgrades
-   ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now `0.30.0`, and Astro `5.0.0`. <br>
    Please follow the [upgrade guide](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.30.0) to update your project. <br>
    Note that the [`legacy.collections` flag](https://docs.astro.build/en/reference/legacy-flags/#collections) is not supported by this theme and you should update your collections to use Astro's new Content Layer API.

## [0.0.10](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.0.10) (2024/12/12)
### Features
- Simpler disabling of the graph and backlinks via the `graph` and `backlinks` settings

## [0.0.9](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.0.9) (2024/11/11)
### Fixes
- Site sidebar not scrolling properly on Firefox
- Completely empty pages not rendering properly 

## [0.0.8](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.0.8) (2024/10/30)
### Fixes
- Screenreader elements causing page overflow
- Prevent additional padding on pages without a sidebar


## [0.0.7](https://github.com/Fevol/starlight-theme-obsidian/releases/tag/0.0.7) (2024/10/18)

**First official release of the theme** <br/>
Older versions can be found in the [releases](https://github.com/Fevol/starlight-theme-obsidian/releases) but are not recommended for use.
