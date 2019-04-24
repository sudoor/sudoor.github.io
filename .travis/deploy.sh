#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

ls -l
echo "waiting ....."
sleep 5000
# 如果是发布到自定义域名
echo 'w.wzzx.xyz' > CNAME

git init
git add -A
git commit -m 'deploy @ '`date`

# 如果发布到 https://<USER_NAME>.github.io
#git push -f git@github.com:${USER_NAME}/{USER_NAME}.github.io.git master

# 如果发布到 https://<USER_NAME>.github.io/<REPO>
# git push -f git@github.com:<USER_NAME>/<REPO>.git master:gh-pages

# git push -f https://${ACCESS_TOKEN}@github.com:<USER_NAME>/{USER_NAME}.github.io.git master

cd -
