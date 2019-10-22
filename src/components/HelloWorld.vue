<style>
  .class1{
    background: #444;
    color: #eee;
  }
</style>
<template>
  <div class="hello">
    <ol>
      <li v-for="site in sites" v-bind:key="site.name">
        {{ site.name }}
      </li>
    </ol>
    <ul>
      <li v-for="(value, key, index) in object" v-bind:key="index">
        {{ index }}. {{ key }} : {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        sites: [
          { name: 'Runoob' },
          { name: 'Google' },
          { name: 'Taobao' }
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
