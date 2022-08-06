参考https://www.runoob.com/vue2/vue-install.html

淘宝的源
```shell
brew install node
npm config set registry https://registry.npm.taobao.org

source ~/.bash_profile
/opt/lib/node_modules/cnpm/bin/cnpm
/opt/lib/node_modules/cnpm/bin/cnpm install
/opt/lib/node_modules/cnpm/bin/cnpm run dev
cnpm run build
cp -rf dist/index.html /Users/xhs/go_workspace/work-utils-backend/views/index.html
cp -rf dist/static /Users/xhs/go_workspace/work-utils-backend/static
cp -rf dist/static/* /Users/xhs/go_workspace/work-utils-backend/static
mkdir dist
cp work-utils-backend dist
cp -rf views dist
cp -rf static dist
ls dist
cp -rf conf dist
tar -zcvf dist.tar.gz dist
scp dist.tar.gz root@xhs:/usr/local/openresty/nginx/html/
scp dist.tar.gz root@114.215.111.84:/usr/local/openresty/nginx/html/ 
```
1. 安装

   ```
   cd my-project
   cnpm install
   ```

2. 运行

   ```
   cnpm run dev
   ```



安装组件

1. install

   ```
   cnpm install vue-layer
   ```



2. src/main.js

   ```
   import layer from 'vue-layer'
   import 'vue-layer/lib/vue-layer.css'

   Vue.prototype.$layer = layer(Vue)

   ```



3. 部署
  ```
  npm run build
  ```
  生成dist目录，放到nginx能访问的目录
4.
