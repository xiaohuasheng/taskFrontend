<template>
  <el-container>
    <el-main>
      <div v-for="item in posts" v-bind:key="item.id">
        <h3>{{ item.title }}</h3>
        <div>{{ item.content }}</div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'post',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.axios.get(process.env.BACKEND_HOST + '/api/post').then(response => {
      this.posts = response.data.data
    }).catch(function (error) { // 请求失败处理
      this.$message('服务端出错')
      console.log(error)
    })
  },
  methods: {}
}
</script>
