#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
echo 'hub.alili.fun' > CNAME

git init
git add .
git commit -am 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git remote add origin https://github.com/NineSwordsMonster/NineSwordsMonster.github.io.git
git push -f -u --set-upstream origin gh-page

cd -
