参考https://www.runoob.com/vue2/vue-install.html

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
