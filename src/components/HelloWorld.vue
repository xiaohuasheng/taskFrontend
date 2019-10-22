<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <pre><a v-bind:href="url">xhs</a></pre>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: '欢迎来到菜鸟教程！',
        ok: true,
        id: 1,
        url: 'http://xiaohuasheng.cc'
      }
    }
  }
</script>
