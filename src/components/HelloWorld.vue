<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    {{ message | capitalize }}
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        message: 'runoob'
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>
