<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">反转字符串</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: '欢迎来到菜鸟教程！'
      }
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
  }
</script>
