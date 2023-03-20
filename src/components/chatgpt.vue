<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="chatgpt">
      <el-input autosize type="textarea" size="medium" v-model="chatgpt"></el-input>
      <el-button type="primary" @click="onSubmit">发送(网络很慢，请耐心等等)</el-button>
      <el-input autosize type="textarea" size="medium" v-model="chatgptRes"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'post',
  data() {
    return {
      chatgpt: '',
      chatgptRes: ''
    }
  },
  methods: {
    onSubmit() {
      this.forbid_submit = true
      let param = {'content': this.chatgpt}
      this.axios.post('http://task.xiaohuasheng.cc/api/chatgpt', param).then(data => {
        console.log(data)
        if (data.data.data) {
          this.chatgptRes = data.data.data
          this.chatgpt = ''
        } else {
          this.$message('请求失败，如果重试多次都不行，可能被限制了，可以明天再来')
        }
        this.forbid_submit = false
      }).catch(function (error) {
        // 请求失败处理
        console.log(error)
        this.forbid_submit = false
      })
    }
  }
}
</script>
