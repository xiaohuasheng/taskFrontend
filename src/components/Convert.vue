<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="item/graphql参数转换">
      <el-button type="primary" @click="graphqlConvert()">转换</el-button>
      <el-input autosize type="textarea" size="medium" v-model="form.graphql"></el-input>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="sql填充参数">
      <el-input autosize :placeholder="sqlPlaceholder" type="textarea" size="medium" v-model="form.sql"></el-input>
      <el-input autosize type="textarea" v-model="form.sqlRes"></el-input>
      <el-button type="primary" @click="onSubmit('sql', form.sql)">转换</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="模板填充">
      <el-button type="primary" @click="templateConvert(form.tpl, form.tplValue)">转换</el-button>
      <el-input autosize placeholder="\1" type="textarea" size="medium" v-model="form.tpl"></el-input>
      <el-input autosize placeholder="一行一个" type="textarea" size="medium" v-model="form.tplValue"></el-input>
      <el-input autosize type="textarea" v-model="form.tplRes"></el-input>
      <el-button type="primary" @click="templateConvert(form.tpl, form.tplValue)">转换</el-button>
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
        sql: '',
        sqlRes: '',
        tpl: '',
        tplValue: '',
        tplRes: ''
      }
    }
  },
  methods: {
    onSubmit(type, value) {
      let param = {'type': type, 'value': value}
      this.axios.post('http://task.xiaohuasheng.cc/api/convert', param).then(data => {
        console.log(data)
        if (data.data.data) {
          switch (type) {
            case 'sql':
              this.form.sqlRes = data.data.data
              break
            case 'graphql':
              this.form.graphql = data.data.data
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
    },
    templateConvert(tpl, tplValue) {
      if (tpl.length <= 0 || tplValue.length <= 0) {
        return ''
      }
      let spiltChar = ['|', '\n', ',']
      let items = []
      let spiltCh = ''
      for (let key in spiltChar) {
        items = tplValue.split(spiltChar[key])
        if (items.length > 1) {
          spiltCh = spiltChar[key]
          break
        }
      }
      if (items.length === 0) {
        return tplValue
      }
      let resArr = []
      for (let key in items) {
        let tmp = tpl.replaceAll('\\1', items[key])
        resArr.push(tmp)
      }
      this.form.tplRes = resArr.join(spiltCh)
    }
  }
}
</script>
