<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="天机阁tags">
      <el-input autosize type="textarea" size="medium" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="结果">
      <el-input type="textarea" v-model="form.result"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">转换</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Convert',
  data() {
    return {
      form: {
        desc: '',
        result: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.axios.post('http://localhost:9090/convert', {'tags': this.form.desc}).then(data => {
        console.log(data)
        if (data.data.data) {
          this.form.result = data.data.data
        } else {
          this.$message('更新失败')
        }
      }).catch(function (error) {
        // 请求失败处理
        console.log(error)
      })
    },
    localConvert() {
      if (this.form.desc.length <= 0) {
        return
      }
      let s = this.form.desc
      let ss = s.split('\n')
      let sWithPrefix = []
      for (let i = 0; i < ss.length; i++) {
        if (i % 2 === 0) {
          ss[i] = 'tags.' + ss[i]
        }
        ss[i] = ss[i].trim()
        sWithPrefix.push(ss[i])
      }
      console.log(sWithPrefix)
      let sHaveColon = []
      for (let i = 0; i < sWithPrefix.length; i++) {
        if (i % 2 === 0) {
          let newS = sWithPrefix[i] + ':' + sWithPrefix[i + 1]
          if (sWithPrefix[i] === 'tags.trpc.status_code' || sWithPrefix[i] === 'tags.result_code') {
            sHaveColon.push('_exists_:"' + sWithPrefix[i] + '"')
          }
          sHaveColon.push(newS)
        }
      }
      console.log(sHaveColon)
      console.log(sHaveColon.join(' AND '))
      this.form.result = sHaveColon.join(' AND ')
    }
  }
}
</script>
