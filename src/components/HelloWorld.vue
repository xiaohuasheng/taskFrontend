<style>
  .class1 {
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p>原始字符串: {{ message }}</p>
    <p>计算后反转字符串: {{ reversedMessage }}</p>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: 'xiaohuasheng'
      }
    },
    computed: {
      // 计算属性的 getter
      reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
      }
    }
  }
</script>
