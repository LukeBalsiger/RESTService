var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
<<<<<<< HEAD
        console.log('Restarting and running tests...');
        return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
    })
    .on('start', function(){
        console.log('Running tests...');
        return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
    })
=======
        console.log('Restarting');
    });
>>>>>>> a0c718f4704bd19357b8a4b8ce19805c180fa06a
});