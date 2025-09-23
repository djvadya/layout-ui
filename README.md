# Project

## Navigation

1. [Installation](#installation)
2. [Development](#development)
3. [File Structure](#file-structure)
4. [Features](#features)

## Installation

You need to have [Node.js](https://nodejs.org/ "Node.js") and package manager [NPM](https://www.npmjs.com/ "NPM") installed.

Install all dependencies in the project directory:

```sh
npm i
```

## Development

To start the local dev server, open terminal in the root directory and run:

```sh
gulp
```

After that, a new tab with the root page will automatically open in the browser and file change tracking processes will start. Compiled files during development are stored in the _tmp_ folder.

To build the project and prepare for deployment:

```sh
gulp build
```

Compiled files will be in the _build_ folder.

## File Structure

```
project/
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── fonts/
│   │   └── images/
│   ├── blocks/
│   │   ├── common/
│   │   │   └── hero/
│   │   │       ├── hero.js
│   │   │       ├── hero.scss
│   │   │       └── hero.njk
│   │   └── general/
│   │       ├── header/
│   │       │   ├── header.js
│   │       │   ├── header.scss
│   │       │   └── header.njk
│   │       └── footer/
│   │           ├── footer.js
│   │           ├── footer.scss
│   │           └── footer.njk
│   ├── components/
│   │   ├── common/
│   │   │   └── copyright/
│   │   │       ├── copyright.js
│   │   │       ├── copyright.scss
│   │   │       └── copyright.njk
│   │   └── general/
│   │       ├── button/
│   │       │   ├── button.js
│   │       │   ├── button.scss
│   │       │   └── button.njk
│   │       └── title/
│   │           ├── title.js
│   │           ├── title.scss
│   │           └── title.njk
│   ├── layouts/
│   │   ├── default.njk
│   │   └── grid.njk
│   ├── pages/
│   │   ├── index.njk                        # Project navigation
│   │   └── home.njk
│   ├── scss/
│   │   ├── core/
│   │   │   ├── animations.scss
│   │   │   ├── breakpoints.scss
│   │   │   ├── fonts.scss
│   │   │   ├── globals.scss
│   │   │   ├── mixins.scss
│   │   │   └── variables.scss
│   │   └── index.scss                       # SCSS entry point
│   └── js/
│       ├── core/
│       │   ├── init.js
│       │   └── handlers.js
│       └── index.js                         # JavaScript entry point
├── .gitignore
├── gulpfile.js
├── package.json
└── README.md
```

## Features

-   Uses [Nunjucks](https://mozilla.github.io/nunjucks/ "Nunjucks") templating engine for pages and components;
-   [SCSS](https://sass-lang.com/ "SCSS") with autoprefixer and modular architecture;
-   JavaScript is bundled with [esbuild](https://www.npmjs.com/package/esbuild "esbuild").

## Additional Tools

[VS Code Extension](https://marketplace.visualstudio.com/items?itemName=douglaszaltron.nunjucks-vscode-extensionpack "Extension") — Formatting, Syntax Highlighting, Hover, and Snippets for Nunjucks.

Commonly used plugins:

-   [Fancyapps UI](https://fancyapps.com/ "Fancyapps UI") — lightbox gallery;
-   [GSAP](https://gsap.com/ "GSAP") — animations;
-   [Inputmask](https://robinherbots.github.io/Inputmask/ "Inputmask") — input masking;
-   [Swiper](https://swiperjs.com/ "Swiper") — slider;
-   [Lozad.js](https://apoorv.pro/lozad.js/ "Lozad.js") — lazy loading for images;
-   [Nice Select 2](https://bluzky.github.io/nice-select2/ "Nice Select 2") — select styling.
