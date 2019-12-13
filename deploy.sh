#!/usr/bin/env sh

set -e
npm run build
cd dist
echo 'hub.alili.fun' > CNAME
git init
git add .
git commit -am 'deploy'
git checkout -b gh-page
git remote add origin https://github.com/NineSwordsMonster/NineSwordsMonster.github.io.git
git branch --set-upstream-to=origin/gh-page gh-page
git push -f

cd -
