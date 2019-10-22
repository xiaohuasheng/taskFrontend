<style>
  .class1 {
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <p v-if="info">{{ info.username }}</p>
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
      this.axios.post('http://192.168.3.97:9999/form', {
        username: 'Fred',
        password: 'Flintstone'
      }).then(response => (this.info = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    watch: {
      info: function (newValue, oldValue) {
        console.log(newValue)
      }
    }
  }
</script>
