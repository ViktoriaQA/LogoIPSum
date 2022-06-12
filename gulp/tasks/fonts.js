import fs from 'fs'; 
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    // search .otf files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`,{})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message%>'
            }))
        )
        // .otf converter to .ttf
        .pipe(fonter({
            formats:['ttf']
        }))
        //push to srcFolder/fonts
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
       // search .ttf files
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`,{})
       .pipe(app.plugins.plumber(
           app.plugins.notify.onError({
               title: 'FONTS',
               message: 'Error: <%= error.message%>'
           }))
       )
       // .ttf converter to .woff
       .pipe(fonter({
           formats:['woff']
       }))
       // push to srcFolder/fonts
       .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // search .ttf files
       .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // .ttf  converter to .woff2
       .pipe(ttf2woff2())
        // push to srcFolder/fonts
       .pipe(app.gulp.dest(`${app.path.build.fonts}`))

}
export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    fs.readdir(app.path.build.fonts, function(err,fontsFiles){
        if(fontsFiles){
            if(!fs.existsSync(fontsFiles)){  // if has no file create file
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for(var i = 0; i < fontsFiles.length; i++){
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if(newFileOnly !== fontFileName){
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin'){
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight'){
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light'){
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium'){
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold'){
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold'){
                            fontWeight = 700;
                        }else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy'){
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black'){
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\t\ font-family: ${fontName};\n\t\ font-display: swap;\n\t\ src: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\t\ font-weight: ${fontWeight};\n\t\ font-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;     
                    }

                }

            } else {
                console.log('File scss/fonts.css is created. For update file you need to be delete!')
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb(){}
}

