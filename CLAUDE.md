# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gulp-based static site generator using Nunjucks templates, SCSS, and JavaScript bundled with esbuild. The project uses a component-based architecture where UI elements are organized into reusable blocks and components.

## Development Commands

### Start Development Server
```sh
npm start
# or
gulp
```
Starts BrowserSync server at http://localhost:3000 with live reload. Compiled files go to `temp/` folder.

### Build for Production
```sh
npm run build
# or
gulp build
```
Compiles optimized assets to `build/` folder with minified CSS/JS and optimized images.

### Clean Build Directories
```sh
gulp clean
```
Removes both `temp/` and `build/` folders.

### Lint Code
```sh
npm run lint
```
Runs both ESLint (JavaScript) and Stylelint (SCSS) checks.

```sh
npm run lint:js
```
Check JavaScript files with ESLint.

```sh
npm run lint:js:fix
```
Auto-fix JavaScript linting issues.

```sh
npm run lint:scss
```
Check SCSS files with Stylelint.

```sh
npm run lint:scss:fix
```
Auto-fix SCSS linting issues.

## Architecture

### Build System (gulpfile.js)

The Gulp pipeline has separate tasks for development and production:

**Development tasks** (output to `temp/`):
- `html` - Compile Nunjucks templates without minification
- `styles` - Compile SCSS with sourcemaps, output as `bundle.css`
- `scripts` - Bundle JS with esbuild and sourcemaps, output as `bundle.js`
- `assets` - Copy assets without optimization
- `serve` - Run BrowserSync server with file watching

**Production tasks** (output to `build/`):
- `htmlProd` - Compile templates and replace bundle references with `.min` versions
- `stylesProd` - Compile SCSS with autoprefixer and cssnano, output as `bundle.min.css`
- `scriptsProd` - Bundle and minify JS, output as `bundle.min.js`
- `assetsProd` - Copy and optimize images with mozjpeg and pngquant

### Component Architecture

**Blocks** (`src/blocks/`) - Large, structural page sections:
- `general/` - Reusable blocks like header, footer, sidebar, section
- `common/` - Page-specific blocks like hero

**Components** (`src/components/`) - Small, reusable UI elements:
- `general/` - Reusable components like button, title, menu, breadcrumbs
- `common/` - Unique components like logo, copyright

Each block/component follows this structure:
```
component-name/
├── component-name.njk   # Nunjucks template
├── component-name.scss  # Styles
└── component-name.js    # JavaScript (if needed)
```

### Template System (Nunjucks)

**Layouts** (`src/layouts/`):
- `default.njk` - Main layout with header, footer, and content block
- `grid.njk` - Layout variant (if needed)

**Pages** (`src/pages/`):
- Each `.njk` file becomes an HTML page
- Pages extend layouts and include blocks/components
- Use `{% extends "layouts/default.njk" %}` and `{% block content %}`

**Template includes**:
- Blocks/components: `{% include "blocks/general/header/header.njk" %}`
- Metadata in layouts: `{% include "blocks/general/meta/meta.njk" %}`

### Styling System

**Entry point**: `src/scss/index.scss`

SCSS is organized into:
- `core/` - Variables, mixins, fonts, animations, globals, breakpoints
- Component styles imported from `src/blocks/` and `src/components/`
- Third-party library styles from `node_modules/`

The Sass compiler uses `includePaths` to resolve imports from:
- `src/blocks`
- `src/components`
- `src/scss/core`

### JavaScript System

**Entry point**: `src/js/index.js` (imports `core/init.js`)

`src/js/core/init.js`:
- Initializes lozad.js for lazy loading images with `.lazy` class
- Registers component initializers on DOMContentLoaded
- Imports component JS files (e.g., `initMenu()` from menu component)

Component JS files export initialization functions imported in `init.js`.

esbuild bundles everything into a single IIFE bundle for the browser.

### Code Quality

#### ESLint (JavaScript)

**Configuration**: `eslint.config.js` (ESLint 9+ flat config format)

ESLint is configured with:
- ES modules support (`sourceType: "module"`)
- Browser and Node.js globals
- Recommended JavaScript rules
- Custom stylistic rules (4-space indentation, double quotes, semicolons)
- Auto-ignore patterns for `node_modules/`, `temp/`, `build/`, and `*.min.js`

Key rules enforced:
- `no-var` - Must use `let`/`const` instead of `var`
- `prefer-const` - Use `const` for variables that are never reassigned
- `indent: 4` - 4-space indentation
- `quotes: "double"` - Double quotes for strings
- `semi: "always"` - Always use semicolons

#### Stylelint (SCSS/CSS)

**Configuration**: `.stylelintrc.json`

Stylelint is configured with:
- `stylelint-config-standard-scss` - Standard SCSS rules
- `stylelint-config-recess-order` - Automatic CSS property ordering (similar to Bootstrap's style)
- Auto-ignore patterns for `node_modules/`, `temp/`, `build/`, and `*.min.css`

Features:
- SCSS syntax validation
- Automatic property ordering (position → display → box-model → typography → visual → etc.)
- Detection of duplicate selectors and invalid rules
- Color, unit, and value validation
- Auto-fix support for most formatting issues

Key rules disabled for flexibility:
- `selector-class-pattern` - No BEM enforcement
- `scss/dollar-variable-pattern` - No variable naming restrictions
- `no-descending-specificity` - Allows flexible specificity

## Common Libraries

- **Fancyapps UI** - Lightbox gallery
- **GSAP** - Animations
- **Inputmask** - Input masking
- **Swiper** - Carousels/sliders
- **Lozad.js** - Lazy loading (images with `.lazy` class)
- **Nice Select 2** - Custom select styling

## Adding New Components

1. Create component directory in `src/components/general/` or `src/blocks/general/`
2. Create `.njk`, `.scss`, and `.js` files (if needed)
3. Import SCSS in `src/scss/index.scss`
4. If component needs initialization, export init function from `.js` and import in `src/js/core/init.js`
5. Include component in pages/layouts using `{% include "path/to/component.njk" %}`

## File Watching

Gulp watches these patterns in development:
- `src/**/*.njk` - Triggers `html` task
- `src/**/*.scss` - Triggers `styles` task
- `src/**/*.js` - Triggers `scripts` task
- `src/assets/**/*.*` - Triggers `assets` task
