@echo off

echo Clean wux folder..
del /Q .\js\*.*

echo Compile demo...
call tsc --noEmitHelpers --declaration --project ./ts/demo/tsconfig.json

echo Minify...

rem Install first https://www.npmjs.com/package/minifier
rem Usage: minify input_file
rem call minify ./wux/js/wux.js
rem call minify ./wux/js/demo.js

rem Install first https://www.npmjs.com/package/uglify-js
rem Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
call uglifyjs ./js/demo.js -c -o ./js/demo.min.js
