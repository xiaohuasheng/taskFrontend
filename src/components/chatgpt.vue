<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="chatgpt">
      <div>https://chat.openai.com/api/auth/session</div>
      <el-input type="input" size="medium" v-model="textType" placeholder="curl/word"></el-input>
      <el-input autosize type="textarea" size="medium" v-model="chatgpt"></el-input>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'post',
  data() {
    return {
      chatgpt: '',
      textType: 'curl'
    }
  },
  methods: {
    onSubmit() {
      let param = {'content': this.chatgpt, 'text_type': this.textType}
      this.axios.post(process.env.BACKEND_HOST + '/api/chatgpt', param).then(data => {
        if (data.data.code === 0) {
          this.$message('保存成功')
        } else {
          this.$message('保存失败')
        }
      }).catch(function (error) {
        // 请求失败处理
        console.log(error)
        this.$message('保存失败')
      })
    }
  }
}
</script>
