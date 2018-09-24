const gulp = require('gulp')
const install = require('gulp-install')
const ts = require('gulp-typescript')
const yargs = require('yargs').argv

const DIST_DIR = yargs.dist || './dist'

gulp.task('install', () => {
    return gulp.src('./package.json').pipe(gulp.dest(DIST_DIR)).pipe(install({production: true}))
})

const tsProject = ts.createProject('./tsconfig.json')

gulp.task('ts_build', () => {
    return gulp.src('src/**/*.ts').pipe(tsProject()).pipe(gulp.dest(DIST_DIR))
})

gulp.task('default', ['install', 'ts_build'])
