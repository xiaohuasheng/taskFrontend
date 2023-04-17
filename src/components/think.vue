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
  name: 'think',
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    let thinkID = this.$route.query.id
    this.axios.get('http://task.xiaohuasheng.cc/api/think?id=' + thinkID).then(response => {
      if (response.data.code !== 0) {
        this.$message(response.data.msg)
      } else {
        this.posts = response.data.data
      }
    }).catch(function (error) { // 请求失败处理
      this.$message('服务端出错')
      console.log(error)
    })
  },
  methods: {}
}
</script>
