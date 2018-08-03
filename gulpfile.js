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
            PORT:8000
        },
        ignore: ['./node_modules/**', './test/**', './Work/**', './.git/**']
    })
    .on('start', function(){
    })
});