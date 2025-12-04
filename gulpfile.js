import gulp from "gulp";
import browsersync from "browser-sync";
import nunjucksRender from "gulp-nunjucks-render";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import esbuild from "gulp-esbuild";
import sourcemaps from "gulp-sourcemaps";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import pngquant from "imagemin-pngquant";
import { deleteSync } from "del";
import rename from "gulp-rename";
import replace from "gulp-replace";
import htmlValidator from "html-validator";
import fg from "fast-glob";
import fs from "fs";
import path from "path";

const sassCompiler = gulpSass(sass);
const bs = browsersync.create();

const paths = {
    html: "src/pages/**/*.njk",
    templates: "src",
    styles: "src/scss/index.scss",
    componentStyles: ["src/blocks/**/*.scss", "src/components/**/*.scss", "src/scss/core/*.scss"],
    js: "src/js/index.js",
    componentJS: ["src/blocks/**/*.js", "src/components/**/*.js", "src/js/core/*.js"],
    assets: "src/assets/**/*",
    devDist: "temp",
    prodDist: "build",
};

// Очистка папок temp/ и build/
export const clean = (done) => {
    deleteSync([paths.devDist, paths.prodDist]);
    done();
};

// HTML для разработки (пишет в temp/)
export const html = () =>
    gulp
        .src(paths.html)
        .pipe(nunjucksRender({ path: [paths.templates] }))
        .pipe(gulp.dest(paths.devDist))
        .pipe(bs.stream());

// HTML для продакшн (пишет в build/)
export const htmlProd = () =>
    gulp
        .src(paths.html)
        .pipe(nunjucksRender({ path: [paths.templates] }))
        .pipe(replace("bundle.css", "bundle.min.css"))
        .pipe(replace("bundle.js", "bundle.min.js"))
        .pipe(gulp.dest(paths.prodDist));

// Стили для разработки (пишет в temp/css/bundle.css с sourcemaps)
export const styles = () =>
    gulp
        .src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(
            sassCompiler({
                includePaths: ["src/blocks", "src/components", "src/scss/core"],
            }).on("error", sassCompiler.logError),
        )
        .pipe(rename("bundle.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(`${paths.devDist}/css`))
        .pipe(bs.stream());

// Стили для продакшн (пишет в build/css/bundle.css без sourcemaps)
export const stylesProd = () =>
    gulp
        .src(paths.styles)
        .pipe(
            sassCompiler({
                includePaths: ["src/blocks", "src/components", "src/scss/core"],
            }).on("error", sassCompiler.logError),
        )
        .pipe(postcss([autoprefixer(), cssnano({ preset: "default" })]))
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest(`${paths.prodDist}/css`));

// Скрипты для разработки (пишет в temp/js/bundle.js с sourcemaps, без минификации)
export const scripts = () =>
    gulp
        .src(paths.js, { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(
            esbuild({
                outfile: "bundle.js",
                bundle: true,
                format: "iife",
                platform: "browser",
                minify: false,
                sourcemap: true,
            }).on("error", function (err) {
                console.error("esbuild error:", err);
                this.emit("end");
            }),
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${paths.devDist}/js`))
        .pipe(bs.stream());

// Скрипты для продакшн (пишет в build/js/bundle.js без sourcemaps, с минификацией)
export const scriptsProd = () =>
    gulp
        .src(paths.js, { allowEmpty: true })
        .pipe(
            esbuild({
                outfile: "bundle.min.js",
                bundle: true,
                format: "iife",
                platform: "browser",
                minify: true,
                sourcemap: false,
                legalComments: "none",
            }).on("error", function (err) {
                console.error("esbuild error:", err);
                this.emit("end");
            }),
        )
        .pipe(gulp.dest(`${paths.prodDist}/js`));

// Копирование ассетов для разработки
export const assets = () => gulp.src(paths.assets, { encoding: false }).pipe(gulp.dest(`${paths.devDist}/assets`));

// Копирование ассетов для продакшн
export const assetsProd = () =>
    gulp
        .src(paths.assets, { encoding: false })
        .pipe(
            imagemin([
                mozjpeg({ quality: 75, progressive: true }),
                pngquant({ quality: [0.6, 0.8] }),
            ]),
        )
        .pipe(gulp.dest(`${paths.prodDist}/assets`));

// Ручное сжатие изображений в src (заменяет оригиналы)
export const compressImages = () => {
    console.log("\n⚠️  ВНИМАНИЕ: Эта команда заменит оригинальные изображения сжатыми версиями!\n");

    return gulp
        .src("src/assets/images/**/*.{jpg,jpeg,png}", { encoding: false })
        .pipe(
            imagemin([
                mozjpeg({ quality: 85, progressive: true }),
                pngquant({ quality: [0.7, 0.9] }),
            ]),
        )
        .pipe(gulp.dest("src/assets/images"));
};

// Валидация HTML через W3C валидатор
export const validateHtml = async () => {
    const htmlFiles = await fg(`${paths.prodDist}/**/*.html`);

    if (htmlFiles.length === 0) {
        console.log("\n⚠️  HTML файлы не найдены в папке build/. Запустите 'npm run build' сначала.\n");
        return;
    }

    console.log(`\n🔍 Проверка ${htmlFiles.length} HTML файл(ов)...\n`);

    let totalErrors = 0;

    for (const file of htmlFiles) {
        const html = fs.readFileSync(file, "utf8");
        const fileName = path.relative(paths.prodDist, file);

        try {
            const result = await htmlValidator({
                data: html,
                format: "json",
            });

            const messages = result.messages || [];
            const errors = messages.filter((msg) => msg.type === "error");

            if (errors.length > 0) {
                console.log(`\n📄 ${fileName}`);
                console.log(`  ❌ Ошибок: ${errors.length}`);
                errors.forEach((err) => {
                    console.log(`     Строка ${err.lastLine}: ${err.message}`);
                });
                totalErrors += errors.length;
            } else {
                console.log(`✅ ${fileName} - валидация пройдена`);
            }
        } catch (error) {
            console.error(`\n❌ Ошибка валидации ${fileName}:`, error.message);
        }
    }

    console.log(`\n📊 Итого: ${totalErrors} ошибок\n`);
};

// Сервер для разработки (использует temp/)
export const serve = () => {
    bs.init({
        server: {
            baseDir: paths.devDist,
        },
        port: 3000,
        notify: false,
        open: true,
        cors: true,
        reloadOnRestart: true,
    });

    gulp.watch(["src/**/*.njk"], html);
    gulp.watch(["src/**/*.scss"], styles);
    gulp.watch(["src/**/*.js"], scripts);
    gulp.watch(["src/assets/**/*.*"], assets);
};

// Таск для разработки
export const dev = gulp.series(clean, gulp.parallel(html, styles, scripts, assets));

// Таск для сборки
export const build = gulp.series(clean, gulp.parallel(htmlProd, stylesProd, scriptsProd, assetsProd));

// Стандартный таск
export default gulp.series(dev, serve);
