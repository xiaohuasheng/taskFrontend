<template>
  <div class="container">
    <div>Task here</div>
    <div class="row">
      <div class="block">
      </div>
      <div class="block"></div>
    </div>
    <div class="row">
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  data () {
    return {
      sites: [
        { name: 'Runoob' },
        { name: 'Google' },
        { name: 'Taobao' }
      ]
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
  .row {
    margin-bottom: 0.1rem;
  }

  .block {
    display: inline-block;
    background-color: rebeccapurple;
    width: 48%;
    height: 10rem;
    margin-right: 0.1rem;
  }

</style>
