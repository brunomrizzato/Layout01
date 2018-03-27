
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//Compilar o SASS
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'arquivos/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("arquivos"))
        .pipe(browserSync.stream());
});

//Mover o JS para src/js
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'
                        ,'node_modules/jquery/dist/jquery.min.js'
                        ,'node_modules/popper.js/dist/popper.min.js'])
        .pipe(gulp.dest("arquivos"))
        .pipe(browserSync.stream());
})


//Servidor para olhar o HTML/SCSS
gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: "./arquivos"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'arquivos/*.scss'], ['sass']);
    gulp.watch("arquivos/*.html").on('change', browserSync.reload);
})

gulp.task('default', ['js','server']);
