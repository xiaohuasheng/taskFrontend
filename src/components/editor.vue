<template>
  <mavon-editor v-model="value.content" @save="save"/>
</template>
<script>

export default {
  name: 'editor',
  data() {
    return {
      value: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    save() {
      this.axios.post(process.env.BACKEND_HOST + '/api/post', this.value).then(data => {
        if (data.data.data) {
          console.log(data)
          this.$message('保存成功')
        } else {
          this.$message('保存失败')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
