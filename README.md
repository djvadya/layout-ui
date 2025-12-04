# Layout UI

Modern site layout with Gulp, Nunjucks, and SCSS. Features a component-based architecture for building responsive web layouts with live reload and optimized production builds.

## Features

- 🎨 **Component-Based Architecture** - Modular blocks and components for reusable UI elements
- 🔄 **Live Reload** - BrowserSync with automatic browser refresh on file changes
- 📱 **Responsive Design** - Mobile-first approach with flexible grid system
- ⚡ **Fast Builds** - esbuild for lightning-fast JavaScript bundling
- 🎯 **Template Engine** - Nunjucks for powerful HTML templating
- 🌈 **Modern CSS** - SCSS with autoprefixer and modular imports
- 🖼️ **Image Optimization** - Automatic image compression for production
- 📦 **Production Ready** - Minified and optimized assets for deployment

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [NPM](https://www.npmjs.com/) or other package manager

### Setup

Install dependencies:

```sh
npm install
```

## Development

### Start Development Server

```sh
npm start
# or
gulp
```

This will:

- Compile all assets to the `temp/` folder
- Start BrowserSync server at `http://localhost:3000`
- Watch for file changes and auto-reload the browser
- Generate sourcemaps for debugging

### Build for Production

```sh
npm run build
# or
gulp build
```

This will:

- Compile and minify CSS/JavaScript
- Optimize images (JPEG/PNG compression)
- Output production-ready files to the `build/` folder
- Remove sourcemaps and comments

### Code Quality

**All-in-One Commands:**

```sh
npm run check            # Run all checks (lint + format)
npm run fix              # Auto-fix everything (lint + format)
```

**Linting:**

```sh
npm run lint             # Check both JavaScript and SCSS
npm run lint:js          # Check JavaScript with ESLint
npm run lint:js:fix      # Auto-fix JavaScript issues

npm run lint:scss        # Check SCSS with Stylelint
npm run lint:scss:fix    # Auto-fix SCSS issues
```

**Formatting:**

```sh
npm run format           # Check code formatting (HTML, SCSS, JS, JSON)
npm run format:fix       # Auto-fix formatting issues
```

Prettier is fully integrated with ESLint and Stylelint - no conflicts!

### Bundle Analysis

```sh
npm run analyze          # Analyze JavaScript bundle size
```

Shows minified bundle size in KB for optimization monitoring.

### Additional Commands

**HTML Validation:**

```sh
npm run validate         # Validate HTML files with W3C validator
```

Validates all HTML files in `build/` directory. Run `npm run build` first.

**Image Compression:**

```sh
npm run compress         # Compress source images (replaces originals!)
```

Compresses images in `src/assets/images/` with higher quality settings than production build.

**Clean Build Directories:**

```sh
gulp clean               # Remove temp/ and build/ folders
```

## Project Structure

```
layout-ui/
├── src/                          # Source files
│   ├── assets/                   # Static assets
│   │   ├── favicons/
│   │   ├── fonts/
│   │   └── images/
│   ├── blocks/                   # Large structural sections
│   │   ├── common/               # Page-specific blocks
│   │   └── general/              # General blocks (header, footer, etc.)
│   ├── components/               # Small reusable UI elements
│   │   ├── common/               # Project-specific components (logo, copyright)
│   │   └── general/              # General components (button, menu)
│   ├── layouts/                  # Layout templates
│   │   ├── default.njk           # Main layout
│   │   └── grid.njk              # Grid layout variant
│   ├── pages/                    # Page templates (each becomes .html)
│   │   ├── index.njk             # Project navigation
│   │   └── home.njk              # Homepage
│   ├── scss/                     # Stylesheets
│   │   ├── core/                 # Variables, mixins, globals
│   │   └── index.scss            # Main SCSS entry point
│   └── js/                       # JavaScript
│       ├── utils/                # Utility functions
│       └── index.js              # Main JS entry point
├── temp/                         # Development build output (auto-generated)
├── build/                        # Production build output (auto-generated)
├── gulpfile.js                   # Build configuration
├── package.json
├── CLAUDE.md                     # AI coding assistant guidance
└── README.md
```

### Component Structure

Each component/block follows this pattern:

```
component-name/
├── component-name.njk            # Template
├── component-name.scss           # Styles
└── component-name.js             # Logic (optional)
```

### Available Components

**General Components** (reusable):

- `button` - Button with variants (primary, secondary, outline) and sizes
- `textarea` - Textarea with states (default, error, disabled)
- `breadcrumbs` - Navigation breadcrumbs
- `code` - Code block with syntax highlighting
- `menu` - Mobile menu toggle
- `heading`, `title`, `text` - Typography components
- `navigation-top`, `navigation-side`, `navigation-mobile` - Navigation elements

**Common Components** (unique):

- `logo` - Site logo
- `copyright` - Copyright text
- `dev`, `stack` - Development info components

**Blocks** (structural sections):

- `header`, `footer` - Page header and footer
- `section`, `sidebar` - Content containers
- `hero` - Hero section
- `error-404` - 404 error page
- `example` - Example/demo block

## Technology Stack

### Core Technologies

- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Powerful templating engine with inheritance and macros
- **[SCSS](https://sass-lang.com/)** - CSS preprocessor with variables, mixins, and nesting
- **[esbuild](https://esbuild.github.io/)** - Ultra-fast JavaScript bundler
- **[Gulp](https://gulpjs.com/)** - Task runner and build system
- **[BrowserSync](https://browsersync.io/)** - Live reloading and synchronized testing

### Code Quality Tools

- **[ESLint](https://eslint.org/)** - JavaScript linter (ESLint 9+ flat config)
- **[Stylelint](https://stylelint.io/)** - SCSS/CSS linter with automatic property ordering
- **[Prettier](https://prettier.io/)** - Opinionated code formatter for HTML, SCSS, JS, JSON
- **eslint-config-prettier** - Disables conflicting ESLint rules
- **stylelint-config-prettier-scss** - Disables conflicting Stylelint rules

### Included Libraries

**Active:**

- **[Lozad.js](https://apoorv.pro/lozad.js/)** - Lazy loading for images (use `.lazy` class)

**Available (CSS imported, not yet implemented):**

- **[Swiper](https://swiperjs.com/)** - Modern mobile-friendly slider
- **[Fancyapps UI](https://fancyapps.com/)** - Lightbox and gallery component
- **[Nice Select 2](https://bluzky.github.io/nice-select2/)** - Custom select dropdown styling
- **[imask](https://imask.js.org/)** - Input field masking

> **Note:** These libraries are installed and ready to use. See `TODO.md` for implementation recommendations or removal instructions.

## Development Workflow

### Creating a New Component

1. Create component folder in `src/components/general/` or `src/blocks/general/`

2. Create `.njk` file as a **macro** (no documentation comments inside):

    ```nunjucks
    {% macro render(text="", variant="primary", size="md") %}
        <div class="your-component {{ variant }} {{ size }}">
            {{ text }}
        </div>
    {% endmacro %}
    ```

3. Import styles in `src/scss/index.scss`:

    ```scss
    @use "../components/general/your-component/your-component";
    ```

4. If component needs initialization, export function and import in `src/js/index.js`:

    ```javascript
    import { initYourComponent } from "../../components/general/your-component/your-component.js";

    document.addEventListener("DOMContentLoaded", () => {
        initYourComponent();
    });
    ```

5. Use macro in templates (import at the **top** of the file):

    ```nunjucks
    {% from "components/general/your-component/your-component.njk" import render as yourComponent %}

    {{ yourComponent(text="Hello", variant="primary") }}
    ```

> **See** `CLAUDE.md` for detailed component development guidelines.

### Creating a New Page

1. Create `.njk` file in `src/pages/`
2. Extend a layout:

    ```nunjucks
    {% extends "layouts/default.njk" %}

    {% block content %}
        <!-- Your page content -->
    {% endblock %}
    ```

3. The page will be compiled to HTML in the output folder

## Recommended Tools

- **[Nunjucks VS Code Extension](https://marketplace.visualstudio.com/items?itemName=douglaszaltron.nunjucks-vscode-extensionpack)** - Syntax highlighting, formatting, and snippets

## Browser Support

Configured via `browserslist` in `package.json`:

- \> 1% market share
- Last 10 versions of major browsers
- Excludes dead browsers
