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

   

3. 