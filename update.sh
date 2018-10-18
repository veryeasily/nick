#!/bin/bash
CACHE_BUSTER="$RANDOM"
sed -i -r 's#\?version=\d*#?version='"$CACHE_BUSTER"'#g' index.html
sass ./assets/sass/main.scss >./assets/css/main.css

git commit -am "$(date)"
git push
