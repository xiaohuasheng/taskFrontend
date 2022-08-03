<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="参数转换">
      <el-button type="primary" @click="graphqlConvert()">转换</el-button>
      <el-input autosize type="textarea" size="medium" v-model="form.graphql"></el-input>
    </el-form-item>
    <!-- <el-form-item label="转义">
      <el-input autosize type="textarea" size="medium" v-model="form.url"></el-input>
      <el-input type="textarea" v-model="form.urlRes"></el-input>
      <el-button type="primary" @click="onSubmit('rep', form.url)">转换</el-button>
    </el-form-item> -->
  </el-form>
</template>
<script>
export default {
  name: 'Convert',
  data() {
    return {
      form: {
        graphql: '',
        tags: '',
        tagsRes: '',
        fileID: '',
        fileIDRes: '',
        url: '',
        urlRes: '',
        oidb: '',
        oidbRes: ''
      }
    }
  },
  methods: {
    onSubmit(type, value) {
      this.axios.post('http://localhost:9090/convert', {'type': type, 'value': value}).then(data => {
        console.log(data)
        if (data.data.data) {
          switch (type) {
            case 'graphql':
              this.form.graphql = data.data.data
              break
            case 'tags':
              this.form.tagsRes = data.data.data
              break
            case 'fileID':
              this.form.fileIDRes = data.data.data
              break
            case 'rep':
              this.form.urlRes = data.data.data
              break
            case 'oidb':
              this.form.oidbRes = data.data.data
              break
          }
        } else {
          this.$message('更新失败')
        }
      }).catch(function (error) {
        // 请求失败处理
        console.log(error)
      })
    },
    graphqlConvert() {
      if (this.form.graphql.length <= 0) {
        return
      }
      let s = this.form.graphql
      if (s.indexOf('\\n') >= 0) {
        let strList = s.split('\\n')
        this.form.graphql = strList.join('\n')
        return
      }
      let strList = s.split('\n')
      this.form.graphql = strList.join('\\n')
    }
  }
}
</script>
