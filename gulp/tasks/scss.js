import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';    //зжимання css файла
import webpcss from 'gulp-webpcss';    
import autoprefixer from 'gulp-autoprefixer'; // added auto @
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //  group media 



const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev}) // true for isDev
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error: <%= error.message%>'
            })))
        .pipe(app.plugins.replace(/@img\//g,'../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries())
        )    
        .pipe(app.plugins.if(
            app.isBuild,
            webpcss({
                webpClass: ".webp",
                noWebpClass: ".no-webp"    //added js code для перевірки 
            }))
        )    
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer({
                grid: 'true',
                overrideBrowserslist: ['last 3 version'],
                cascade: true
            }))
        )    
        .pipe(app.gulp.dest(app.path.build.css)) // розкоментувати якщо потрібен Не зжатий файл стилів .min зжатий css
        .pipe(app.plugins.if(
            app.isBuild,
            cleanCss())
        )    
        .pipe(rename({
            extname:'.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))              // push in dest folder  
        .pipe(app.plugins.browsersync.stream())               // update browser
}