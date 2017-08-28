var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    env = require('gulp-env'),
    supertest = require('supertest');

gulp.task('default', function(){
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: {
            PORT:9000
        },
        ignore: ['./node_modules/**', './test/**', './Work/**', './.git/**']
    })
    .on('start', function(){
        console.log('Running tests...');
        return gulp.src(['test/unit/*.js', 'test/integration/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
    })
});

gulp.task('test-unit', function(){
    env({vars: {ENV:'Test'}});
    console.log('Running unit tests...');
        return gulp.src(['test/unit/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('test-integration', function(){
    env({vars: {ENV:'Test'}});
    console.log('Running integration tests...');
        return gulp.src(['test/integration/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('test-ui', function(){
    env({vars: {ENV:'Test'}});
    console.log('Running ui tests...');
        return gulp.src(['test/ui/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});