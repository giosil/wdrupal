@echo off

echo Clean wux folder..
del /Q .\wux\*.*

echo Compile WUX...
call tsc --declaration --project ./ts/wux/tsconfig.json

echo Minify...

rem Install first https://www.npmjs.com/package/minifier
rem Usage: minify input_file
rem call minify ./wux/js/wux.js

rem Install first https://www.npmjs.com/package/uglify-js
rem Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
call uglifyjs ./wux/js/wux.js -c -o ./wux/js/wux.min.js

rem Share the file wux.d.ts with other projects.
rem copy /Y .\wux\js\wux.d.ts ..\other\ts\types\wux\
