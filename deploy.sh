#!/bin/bash

# 打包前端代码
npm run build

# 压缩 dist 目录
tar -zcvf dist.tar.gz dist

# 上传 dist.tar.gz 到服务器
scp -P 10022 dist.tar.gz root@114.215.111.84:/usr/local/openresty/nginx/html/taskFrontend/

# 登录服务器，解压缩并替换旧版本
ssh -p 10022 root@114.215.111.84 << EOF
  cd /usr/local/openresty/nginx/html/taskFrontend/
  rm -rf dist.bak
  mv dist dist.bak
  tar -zxvf dist.tar.gz
  rm -f dist.tar.gz
EOF
