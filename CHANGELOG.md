# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-12-04

### Added
- Initial project setup with Gulp build system
- Nunjucks templating engine with component-based architecture
- SCSS compilation with autoprefixer and minification
- JavaScript bundling with esbuild
- BrowserSync for live reload during development
- Component library with macro pattern:
  - Button
  - Textarea
  - Breadcrumbs
- Blocks (header, footer, section, sidebar, hero)
- Code quality tools:
  - ESLint for JavaScript linting
  - Stylelint for SCSS linting with automatic property ordering
  - Prettier for code formatting
- Lazy loading support with Lozad.js
- Image optimization for production builds
- HTML validation with W3C validator
- Bundle size analysis