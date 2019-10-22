<style>
  .class1 {
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <ol>
      <li v-for="n in 10" v-bind:key="n">
        {{ n }}
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        sites: [
          {name: 'Runoob'},
          {name: 'Google'},
          {name: 'Taobao'}
        ],
        object: {
          name: '菜鸟教程',
          url: 'http://www.runoob.com',
          slogan: '学的不仅是技术，更是梦想！'
        }
      }
    }
  }
</script>
