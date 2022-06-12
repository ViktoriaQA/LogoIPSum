import gulp from "gulp";
import {path} from "./gulp/config/path.js";
import {plugins} from './gulp/config/plugins.js'


global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}
//import tasks
import {copy} from './gulp/tasks/copy.js';
import {reset} from './gulp/tasks/reset.js';
import {html} from './gulp/tasks/html.js';
import {scss} from './gulp/tasks/scss.js';
import {server} from './gulp/tasks/server.js';
import {js} from './gulp/tasks/js.js';
import {images} from './gulp/tasks/images.js';
import {otfToTtf, ttfToWoff, fontsStyle} from './gulp/tasks/fonts.js';
import {svgSprive} from './gulp/tasks/svgSprive.js';
import {zip} from './gulp/tasks/zip.js';
import {ftp} from './gulp/tasks/ftp.js';


function watcher (){
    gulp.watch(path.watch.files, copy); 
    gulp.watch(path.watch.html, gulp.series(html,ftp));     // auto push to server ftp /html change gulp.series(html,ftp) 
    gulp.watch(path.watch.scss, scss);     // gulp.series(scss,ftp) 
    gulp.watch(path.watch.js, js);         // gulp.series(js,ftp) 
    gulp.watch(path.watch.images, images); // gulp.series(images,ftp) 
}
export {svgSprive} // starts npm run svgSprive

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)); // копіювання html файлів та інших файлів


const dev = gulp.series(reset, mainTask, gulp.parallel(watcher,server)); // виконує задачі послідовно (reset на поч. щоб очищало папку dist потім copy)
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask, zip);
const deployFtp = gulp.series(reset, mainTask, ftp);

export {dev} 
export {build}
export {deployZip}
export {deployFtp}

gulp.task('default', dev);
