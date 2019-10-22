<style>
  .class1 {
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p v-if="info">{{ info.message }}</p>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        info: null
      }
    },
    mounted () {
      this.axios.get('http://localhost:9999/ping')
        .then(response => (this.info = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  }
</script>
