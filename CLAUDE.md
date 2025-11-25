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

## Component Development Guidelines

This section describes the standard patterns and code style for creating new components, based on existing components like `button` and `textarea`.

### File Structure

Each component should have:
```
component-name/
├── component-name.njk   # Nunjucks template (required)
├── component-name.scss  # Styles (required)
└── component-name.js    # JavaScript (optional, only if needed)
```

### Nunjucks Template (.njk) Structure

#### 1. Documentation Header

Start every `.njk` file with a comment block explaining usage:

```njk
{#
  Component Name with brief description

  Usage:
  {% set componentName = {
    param1: "value",
    param2: "option1|option2|option3",
    param3: true|false
  } %}
  {% include "components/general/component-name/component-name.njk" %}
#}
```

#### 2. Default Values

Set default values at the top using Nunjucks filters:

```njk
{% set size = component.size | default("md") %}
{% set variant = component.variant | default("primary") %}
```

#### 3. Class Name Building

Build CSS classes conditionally:

```njk
{% set componentClasses = "component-name " + variant %}
{% if component.modifier %}{% set componentClasses = componentClasses + " " + modifier %}{% endif %}
{% if component.class %}{% set componentClasses = componentClasses + " " + component.class %}{% endif %}
```

**Pattern:** Base class + variant/size + modifiers + custom classes

#### 4. HTML Element

Render the element with conditional attributes:

```njk
<element
    class="{{ componentClasses }}"
    {% if component.id %}id="{{ component.id }}"{% endif %}
    {% if component.name %}name="{{ component.name }}"{% endif %}
    {% if component.disabled %}disabled{% endif %}
    {% if component.data %}
        {% for key, val in component.data %}
            data-{{ key | replace("_", "-") }}="{{ val }}"
        {% endfor %}
    {% endif %}
    {% if component.aria %}
        {% for key, val in component.aria %}
            aria-{{ key | replace("_", "-") }}="{{ val }}"
        {% endfor %}
    {% endif %}
>
    {% if component.content %}{{ component.content }}{% endif %}
</element>
```

**Key patterns:**
- Use `{% if %}` for optional attributes
- Always support `data` and `aria` attributes via loops
- Convert underscores to hyphens in data/aria keys: `replace("_", "-")`
- Keep formatting clean with proper indentation

#### 5. Conditional Logic

Exclude certain modifiers from specific variants:

```njk
{% set buttonClasses = "button " + variant %}
{% if variant != "link" %}
    {% set buttonClasses = buttonClasses + " " + size + " " + shape %}
{% endif %}
```

### SCSS Structure

#### 1. File Header

```scss
@use "core/breakpoints" as bp;
@use "core/mixins" as mix;

// --------------------------------------
// Component Name Component
// --------------------------------------
```

#### 2. CSS Custom Properties

Define component-specific variables using CSS custom properties:

```scss
.component-name {
    // Component variables
    --component-border-radius: 6px;
    --component-font-size-sm: 0.75rem;
    --component-font-size-md: 0.875rem;
    --component-font-size-lg: 0.875rem;
    --component-padding-sm: 0.625rem;
    --component-padding-md: 0.75rem;
    --component-padding-lg: 1rem;

    // Base styles
    display: block;
    // ... other base styles
}
```

**Benefits:**
- Easy to override
- Readable variable names
- Scoped to component

#### 3. Base Styles

Define base styles first:

```scss
.component-name {
    // Variables first

    // Base styles
    position: relative;
    display: block;
    font-family: var(--font-family-primary);
    font-size: var(--component-font-size-md);
    // ... other styles
    transition: all 0.2s ease-in-out;
```

#### 4. States

Group interactive states together:

```scss
    // Focus state
    &:focus,
    &:focus-visible {
        outline: 2px solid var(--color-primary);
    }

    // Hover state
    &:hover:not(:disabled) {
        border-color: var(--color-black);
    }

    // Disabled state
    &:disabled,
    &.disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    // Active state
    &:active:not(:disabled) {
        transform: translateY(1px);
    }
```

**Important:** Always use `:not(:disabled)` for hover/active states

#### 5. Variants Section

Group variants with a comment header:

```scss
    // --------------------------------------
    // Variants
    // --------------------------------------

    &.primary {
        color: var(--color-white);
        background-color: var(--color-primary);

        &:hover:not(:disabled) {
            background-color: var(--color-primary-dark);
        }
    }

    &.secondary {
        // ...
    }
```

#### 6. Sizes Section

Group sizes with a comment header:

```scss
    // --------------------------------------
    // Sizes
    // --------------------------------------

    &.sm {
        padding: var(--component-padding-sm);
        font-size: var(--component-font-size-sm);
    }

    &.md {
        padding: var(--component-padding-md);
        font-size: var(--component-font-size-md);
    }

    &.lg {
        padding: var(--component-padding-lg);
        font-size: var(--component-font-size-lg);
    }
```

#### 7. Modifiers

Additional modifiers go after main variants:

```scss
    &.error {
        border-color: var(--color-red);

        &:focus {
            border-color: var(--color-red);
        }

        &:hover {
            border-color: var(--color-red) !important;
        }
    }
```

### Code Style Rules

#### Nunjucks

- **No BEM notation** - Use simple class names with modifiers
- **Inline conditionals** - Keep simple conditions on one line:
  ```njk
  {% if component.id %}id="{{ component.id }}"{% endif %}
  ```
- **Multi-line for loops** - Format loops with proper indentation
- **Comments** - Use `{# #}` for documentation blocks

#### SCSS

- **NO BEM notation** - Avoid `__element` and `--modifier` syntax
- **Use nesting** - Nest related selectors instead of BEM:
  ```scss
  .component {
      .header {
          .title { }
      }
  }
  ```
- **Section dividers** - Use comment separators:
  ```scss
  // --------------------------------------
  // Section Name
  // --------------------------------------
  ```
- **State chaining** - Chain states for specificity:
  ```scss
  &:hover:not(:disabled):not(.disabled) { }
  ```
- **CSS Variables** - Use CSS custom properties prefixed with component name:
  ```scss
  --button-padding-md: 0.75rem;
  ```

### Parameter Naming Conventions

**Common parameters all components should support:**
- `id` - Element ID attribute
- `class` - Additional CSS classes
- `name` - Form element name
- `disabled` - Disabled state (boolean)
- `data` - Object of data attributes
- `aria` - Object of aria attributes

**Size/variant naming:**
- `size: "sm|md|lg"` - Small, medium, large
- `variant` - Component variants (e.g., "primary", "secondary")

**Boolean flags:**
- Use simple boolean names: `disabled`, `readonly`, `required`, `error`
- NOT: `isDisabled`, `hasError`

### Component Pages

When creating a documentation page for a component:

1. **Location:** `src/pages/components/component-name.njk`

2. **Structure:**
   - Metadata and breadcrumbs at top
   - Multiple sections showing different features:
     - Variants
     - Sizes
     - States
     - Special cases
   - Usage section with code examples at the end

3. **Code examples** using the `code` component:
   ```njk
   {% set code = {
       title: "Example Title",
       language: "njk",
       content: 'code here'
   } %}
   {% include "components/general/code/code.njk" %}
   ```

4. **Example containers:**
   - Use inline styles for spacing:
     ```njk
     <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
     ```

### Integration Checklist

When adding a new component:

1. ✅ Create component directory: `src/components/general/component-name/`
2. ✅ Create `.njk` template with documentation header
3. ✅ Create `.scss` file with proper structure
4. ✅ Create `.js` file if component needs initialization
5. ✅ Import SCSS in `src/scss/index.scss`:
   ```scss
   @use "../components/general/component-name/component-name";
   ```
6. ✅ Import and initialize JS in `src/js/core/init.js` (if needed):
   ```js
   import { initComponentName } from "../../components/general/component-name/component-name.js";
   // ...
   initComponentName();
   ```
7. ✅ Create documentation page: `src/pages/components/component-name.njk`
8. ✅ Test all variants, sizes, and states
9. ✅ Verify responsive behavior
10. ✅ Run linters: `npm run lint`
