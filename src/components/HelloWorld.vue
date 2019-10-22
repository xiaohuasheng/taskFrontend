<style>
  .class1 {
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p style="font-size:25px;">计数器: {{ counter }}</p>
    <button @click="counter++" style="font-size:25px;">点我</button>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        counter: 1
      }
    },
    watch: {
      counter: function (nval, oval) {
        alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!')
      }
    }
  }
</script>
