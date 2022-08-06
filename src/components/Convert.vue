<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="item/graphql参数转换">
      <el-button type="primary" @click="graphqlConvert()">转换</el-button>
      <el-input autosize type="textarea" size="medium" v-model="form.graphql"></el-input>
    </el-form-item>
    <el-form-item label="sql填充参数">
      <el-input autosize :placeholder="sqlPlaceholder" type="textarea" size="medium" v-model="form.sql"></el-input>
      <el-input autosize type="textarea" v-model="form.sqlRes"></el-input>
      <el-button type="primary" @click="onSubmit('sql', form.sql)">转换</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Convert',
  data() {
    return {
      sqlPlaceholder: ' [SQL] 2022/08/04 16:04:42 SELECT xxx ? ?; [1:"xxx" 2:"xxx" 3:1]',
      form: {
        graphql: '',
        tags: '',
        tagsRes: '',
        fileID: '',
        fileIDRes: '',
        url: '',
        urlRes: '',
        sql: '',
        sqlRes: '',
        oidb: '',
        oidbRes: ''
      }
    }
  },
  methods: {
    onSubmit(type, value) {
      this.axios.post('http://task.xiaohuasheng.cc/api/convert', {'type': type, 'value': value}).then(data => {
        console.log(data)
        if (data.data.data) {
          switch (type) {
            case 'sql':
              this.form.sqlRes = data.data.data
              break
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
          this.$message('转换失败')
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
