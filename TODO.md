# TODO: Project Improvements

> Comprehensive list of improvements and optimizations for Layout UI project
> Based on analysis conducted on 2025-12-04

---

## 🔴 High Priority (Critical - Do Now)

### 1. ✅ Fix Critical Bug in Button Component
**File:** `src/components/general/button/button.njk:29`
**Issue:** Duplicate class attribute overwrites instead of appending disabled class
**Time estimate:** ~5 minutes

**Current code:**
```njk
{% if button.disabled %}class="{{ buttonClasses }} disabled"{% endif %}
```

**Fixed code:**
```njk
<a class="{{ buttonClasses }}{% if button.disabled %} disabled{% endif %}">
```

---

### 2. ✅ Add More Blocks to Default Layout
**File:** `src/layouts/default.njk`
**Goal:** Increase layout flexibility with more override blocks
**Time estimate:** ~20 minutes
**Completed:** 2025-12-04

**Blocks added (13 total):**
- ✅ `{% block lang %}` - Language attribute
- ✅ `{% block meta %}` - Meta tags
- ✅ `{% block styles %}` - Stylesheet links
- ✅ `{% block head_scripts %}` - Scripts in head
- ✅ `{% block body_class %}` - Body class attribute
- ✅ `{% block site_wrapper %}` - Site wrapper div
- ✅ `{% block header %}` - Header section
- ✅ `{% block main_class %}` - Main class attribute
- ✅ `{% block breadcrumbs %}` - Breadcrumbs section
- ✅ `{% block page_heading %}` - Page heading
- ✅ `{% block menu %}` - Mobile menu
- ✅ `{% block footer %}` - Footer section
- ✅ `{% block scripts %}` - Scripts at end of body

---

### 3. ⬜ Implement Whitespace Control
**Files:** All `.njk` component files
**Goal:** Reduce HTML output size by 10-20%
**Time estimate:** ~30 minutes

**Pattern:**
```njk
{# Before #}
{% if condition %}
    <span>{{ text }}</span>
{% endif %}

{# After #}
{%- if condition -%}
    <span>{{ text }}</span>
{%- endif -%}
```

**Files to update:**
- `src/components/general/button/button.njk`
- `src/components/general/textarea/textarea.njk`
- `src/components/general/breadcrumbs/breadcrumbs.njk`
- Other component files

---

## 🟡 Medium Priority (Architecture Improvements)

### 4. ⬜ Convert Button Component to Macro
**File:** `src/components/general/button/button.njk`
**Goal:** Better reusability and cleaner scope
**Time estimate:** ~45 minutes

**New structure:**
```njk
{% macro render(
    text,
    variant="primary",
    size="md",
    shape="default",
    type="button",
    href="#",
    disabled=false,
    id="",
    name="",
    class=""
) %}
    {# Component logic #}
{% endmacro %}
```

**Usage:**
```njk
{% from "components/general/button/button.njk" import render as button %}
{{ button(text="Click me", variant="primary") }}
```

**Pages to update:**
- `src/pages/components/button.njk`
- All pages using button component

---

### 5. ⬜ Convert Textarea Component to Macro
**File:** `src/components/general/textarea/textarea.njk`
**Goal:** Same as button component
**Time estimate:** ~30 minutes

---

### 6. ⬜ Convert Breadcrumbs Component to Macro
**File:** `src/components/general/breadcrumbs/breadcrumbs.njk`
**Goal:** Same as button component
**Time estimate:** ~30 minutes

---

### 7. ⬜ Add Custom Nunjucks Filters
**File:** `gulpfile.js`
**Goal:** DRY improvements and better template readability
**Time estimate:** ~40 minutes

**Filters to add:**
```js
const customFilters = {
    // Convert underscore to dash: foo_bar → foo-bar
    kebab: (str) => str.replace(/_/g, "-"),

    // Class builder for conditional classes
    classnames: (classes) => {
        return Object.entries(classes)
            .filter(([_, condition]) => condition)
            .map(([className]) => className)
            .join(" ");
    }
};
```

**Implementation in gulpfile.js:**
```js
.pipe(nunjucksRender({
    path: [paths.templates],
    manageEnv: (env) => {
        Object.entries(customFilters).forEach(([name, fn]) => {
            env.addFilter(name, fn);
        });
    }
}))
```

**Update components to use new filters:**
- Replace `| replace("_", "-")` with `| kebab`
- Use `| classnames` for conditional class building

---

### 8. ⬜ Add Cleanup Functions to Event Listeners
**Files:**
- `src/components/general/menu/menu.js`
- `src/components/general/code/code.js`
- `src/js/core/init.js`

**Goal:** Prevent memory leaks and follow best practices
**Time estimate:** ~25 minutes

**Pattern:**
```js
export function initMenu() {
    // ... existing code ...

    // Return cleanup function
    return () => {
        menuToggles.forEach((btn) => {
            btn.removeEventListener("click", toggleDropdown);
        });
        document.removeEventListener("click", handleDocumentClick);
        document.removeEventListener("keydown", handleEscape);
    };
}
```

**Update init.js:**
```js
const cleanupFunctions = [];

document.addEventListener("DOMContentLoaded", () => {
    cleanupFunctions.push(initMenu());
    cleanupFunctions.push(initCode());
});

window.addEventListener("beforeunload", () => {
    cleanupFunctions.forEach(cleanup => cleanup?.());
});
```

---

### 9. ⬜ Use Optional Chaining in JavaScript
**Files:** All `.js` files
**Goal:** More concise null-safe code
**Time estimate:** ~15 minutes

**Pattern:**
```js
// Before
const codeBlock = this.closest(".code");
const codeElement = codeBlock.querySelector("code");
const codeText = codeElement.textContent;

// After
const codeText = this.closest(".code")?.querySelector("code")?.textContent;
if (!codeText) return;
```

---

## 🟢 Low Priority (Optional Modern Features)

### 10. ⬜ Add CSS @layer Organization
**File:** `src/scss/index.scss`
**Goal:** Better cascade control and modern CSS organization
**Time estimate:** ~20 minutes

**Structure:**
```scss
@layer reset, base, components, utilities;

@layer reset {
    @use "../../node_modules/swiper/swiper.css";
    // Other library styles
}

@layer base {
    @use "./core/variables";
    @use "./core/fonts";
    @use "./core/globals";
}

@layer components {
    @use "../components/general/button/button";
    // Other components
}

@layer utilities {
    .visually-hidden { /* ... */ }
    .text-center { /* ... */ }
}
```

---

### 11. ⬜ Implement Modern CSS Features
**Files:** All `.scss` component files
**Goal:** Use modern CSS features for better maintainability
**Time estimate:** ~60 minutes

**Features to implement:**

**Logical Properties:**
```scss
// Instead of margin-left/right
.button {
    margin-inline: 1rem;
    padding-block: 0.5rem;
    border-inline-start: 2px solid;
}
```

**Container Queries:**
```scss
.button {
    container-type: inline-size;

    @container (min-width: 300px) {
        padding: 1rem 2rem;
    }
}
```

**:has() Selector:**
```scss
.form:has(.error) {
    border-color: var(--color-red);
}
```

---

### 12. ⬜ Add Bundle Analysis
**File:** `gulpfile.js`
**Goal:** Monitor bundle size and optimize
**Time estimate:** ~30 minutes

**Add task:**
```js
export const analyzeBundle = () => {
    return gulp.src(paths.js)
        .pipe(esbuild({
            bundle: true,
            metafile: true,
            minify: true,
            outfile: "bundle.min.js"
        }))
        .on("data", (file) => {
            console.log("Bundle size:", file.contents.length, "bytes");
        });
};
```

**Add script to package.json:**
```json
{
    "scripts": {
        "analyze": "gulp analyzeBundle"
    }
}
```

---

### 13. ⬜ Add Modern NPM Scripts
**File:** `package.json`
**Goal:** Improve developer experience
**Time estimate:** ~10 minutes

**Scripts to add:**
```json
{
    "scripts": {
        "dev": "gulp",
        "build": "gulp build",
        "preview": "npm run build && npx serve build",
        "check": "npm run lint && npm run format",
        "fix": "npm run lint:js:fix && npm run lint:scss:fix && npm run format:fix",
        "precommit": "npm run check"
    }
}
```

---

### 14. ⬜ Add Critical CSS Extraction
**File:** `gulpfile.js`
**Goal:** Improve First Contentful Paint (FCP)
**Time estimate:** ~45 minutes

**Install package:**
```bash
npm install --save-dev critical
```

**Add task:**
```js
import critical from "critical";

export const extractCritical = () => {
    return gulp.src("build/**/*.html")
        .pipe(critical.stream({
            base: "build/",
            inline: true,
            css: ["build/css/bundle.min.css"],
            dimensions: [
                { width: 375, height: 667 },   // Mobile
                { width: 1920, height: 1080 }  // Desktop
            ]
        }))
        .pipe(gulp.dest("build"));
};
```

**Update build task:**
```js
export const build = gulp.series(
    clean,
    gulp.parallel(htmlProd, stylesProd, scriptsProd, assetsProd),
    extractCritical
);
```

---

## 📊 Progress Tracking

**Total Tasks:** 14

### By Priority
- 🔴 High Priority: 3 tasks (~55 minutes)
- 🟡 Medium Priority: 6 tasks (~3.5 hours)
- 🟢 Low Priority: 5 tasks (~2.5 hours)

### By Status
- ✅ Completed: 2
- ⬜ Pending: 12

**Total Time Estimate:** ~6.5 hours
**Time Spent:** ~25 minutes
**Remaining Time:** ~6 hours

---

## 🎯 Recommended Execution Order

1. **Phase 1: Critical Fixes** (Tasks 1-3)
   - Fix bug in button component
   - Improve layout flexibility
   - Optimize HTML output
   - **Time:** ~55 minutes

2. **Phase 2: Architecture** (Tasks 4-9)
   - Convert components to macros
   - Add custom filters
   - Improve JavaScript patterns
   - **Time:** ~3.5 hours

3. **Phase 3: Modern Features** (Tasks 10-14)
   - Implement modern CSS
   - Add performance optimizations
   - Improve developer experience
   - **Time:** ~2.5 hours

---

## 📝 Notes

- This TODO list was generated based on comprehensive code analysis
- All recommendations follow modern web development best practices
- Nunjucks improvements are based on official documentation from mozilla.github.io/nunjucks
- Each task includes file paths and time estimates for planning
- Mark tasks with ✅ when completed
- Update progress tracking section as you complete tasks

---

**Last Updated:** 2025-12-04
**Status:** In progress (2/14 tasks completed)
