#!/usr/bin/env bash

TIMESTAMP=$(date "+%Y%m%d%H%M%S")

find . -name 'src/dist/*.deflate' -delete
find . -name 'src/dist/*.gz' -delete

grunt minify

# We have to write to a temp file to work around a bug in Mac's version of sed :(
sed -i '.bak' -e 's/{timestamp}/'$TIMESTAMP'/g' src/dist/server.html
rm src/dist/server.html.bak
