var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var tsConfig = require("../tsconfig.json").compilerOptions;


function compile_ts(path){
    //console.log(path);
    return gulp.src([
            path
            ,"./jspm_packages/npm/event-emitter-lite@1.0.5/*.d.ts"
        ])
        .pipe(ts(tsConfig))
        //.pipe(uglify())
        .pipe(gulp.dest(tsConfig.outDir));
};

gulp.task('compile',function(){
    return  compile_ts("./src/**/*.ts");
});

gulp.task('copy_assets',function(){
    return gulp.src([
        "./src/**/assets/**/*.*"
    ])
    .pipe(gulp.dest(tsConfig.outDir));
});

module.exports = compile_ts;