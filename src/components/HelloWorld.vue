<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: '欢迎来到菜鸟教程！',
        ok: true,
        id: 1
      }
    }
  }
</script>
