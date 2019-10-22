<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: '欢迎来到菜鸟教程！'
      }
    }
  }
</script>
