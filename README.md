# Layout UI

Modern static site generator built with Gulp, Nunjucks, and SCSS. Features a component-based architecture for building responsive web layouts with live reload and optimized production builds.

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
│   │   └── general/              # Reusable blocks (header, footer, etc.)
│   ├── components/               # Small reusable UI elements
│   │   ├── common/               # Unique components (logo, copyright)
│   │   └── general/              # Reusable components (button, menu)
│   ├── layouts/                  # Nunjucks layout templates
│   │   ├── default.njk           # Main layout
│   │   └── grid.njk              # Grid layout variant
│   ├── pages/                    # Page templates (each becomes .html)
│   │   ├── index.njk             # Project navigation
│   │   └── home.njk              # Homepage
│   ├── scss/                     # Stylesheets
│   │   ├── core/                 # Variables, mixins, globals
│   │   └── index.scss            # Main SCSS entry point
│   └── js/                       # JavaScript
│       ├── core/                 # Core initialization
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

- **[Swiper](https://swiperjs.com/)** - Modern mobile-friendly slider
- **[GSAP](https://gsap.com/)** - Professional-grade animation library
- **[Fancyapps UI](https://fancyapps.com/)** - Lightbox and gallery component
- **[Lozad.js](https://apoorv.pro/lozad.js/)** - Lazy loading for images (use `.lazy` class)
- **[Inputmask](https://robinherbots.github.io/Inputmask/)** - Input field masking
- **[Nice Select 2](https://bluzky.github.io/nice-select2/)** - Custom select dropdown styling

## Development Workflow

### Creating a New Component

1. Create component folder in `src/components/general/` or `src/blocks/general/`
2. Add `.njk`, `.scss`, and `.js` files (if needed)
3. Import styles in `src/scss/index.scss`:
   ```scss
   @use "../components/general/your-component/your-component";
   ```
4. If component needs initialization, export function and import in `src/js/core/init.js`:
   ```javascript
   import { initYourComponent } from "../../components/general/your-component/your-component.js";

   document.addEventListener("DOMContentLoaded", () => {
       initYourComponent();
   });
   ```
5. Include in templates:
   ```nunjucks
   {% include "components/general/your-component/your-component.njk" %}
   ```

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

## License

This project is available for use under your preferred license.
