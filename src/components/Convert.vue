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
      <el-button type="primary" @click="sqlConvert(form.sql)">转换</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="模板历史记录">
      <div v-for="(history, index) in historyList" :key="index" class="text item">
        <el-input autosize type="textarea" size="medium" :value="history"></el-input>
      </div>
    </el-form-item>
    <el-form-item label="模板填充">
      <el-button type="primary" @click="templateConvert(form.tpl, form.tplValue)">转换</el-button>
      <el-input autosize placeholder="\1" type="textarea" size="medium" v-model="form.tpl"></el-input>
      <el-input autosize placeholder="一行一个" type="textarea" size="medium" v-model="form.tplValue"></el-input>
      <el-input autosize type="textarea" v-model="form.tplRes"></el-input>
      <el-button type="primary" @click="templateConvert(form.tpl, form.tplValue)">转换</el-button>
    </el-form-item>
    <!-- 去重，分割，排序 -->
    <el-divider></el-divider>
    <el-form-item label="分割排序去重">
      <el-input autosize type="textarea" size="medium" v-model="form.split"></el-input>
      <el-input autosize type="textarea" v-model="form.splitRes"></el-input>
      <el-button type="primary" @click="splitSortConvert(form.split)">转换</el-button>
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
        tplRes: '',
        split: '',
        splitRes: ''
      },
      historyList: []
    }
  },
  mounted () {
    this.historyList = this.getHistory()
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
      this.setLocalHistory(tpl)
    },
    sqlConvert(data) {
      if (data.length <= 0) {
        return
      }
      let rows = data.split('\n')
      let result = []
      for (let key in rows) {
        let row = rows[key]
        if (row.length === 0) {
          continue
        }
        let tmp = row.split(' SELECT')
        let toConvert = tmp[0]
        if (tmp.length > 1) {
          toConvert = 'SELECT' + tmp[1]
        }
        let tmpSql = this.ConvertOneSql(toConvert)
        result.push(tmpSql)
      }
      this.form.sqlRes = result.join('\n')
    },
    ConvertOneSql(data) {
      let strList = data.split('[')
      if (strList.length < 2) {
        return data
      }
      let sql = strList[0]
      let params = strList[1]
      params = params.slice(0, params.length - 1)
      let paramStrList = params.split(' ')
      let paramList = []
      for (let key in paramStrList) {
        let val = paramStrList[key]
        let tmp = val.split(':')
        if (tmp.length < 2) {
          return data
        }
        paramList.push(tmp[1])
      }
      for (let key in paramList) {
        let val = paramList[key]
        sql = sql.replace('?', val)
      }
      return sql
    },
    splitSortConvert(source) {
      if (source.length === 0) {
        return
      }
      let items = []
      let rows = source.split('\n')
      for (let rowIndex in rows) {
        let splitChars = [',', '，', '|', ' ', '、']
        for (let key in splitChars) {
          let splitCh = splitChars[key]
          let rowItems = rows[rowIndex].split(splitCh)
          for (let key in rowItems) {
            items.push(rowItems[key])
          }
        }
      }
      items = this.unique(items)
      items.sort()
      // 排序
      this.form.splitRes = items.join('\n')
    },
    unique (arr) {
      return Array.from(new Set(arr))
    },
    setLocalHistory(template) {
      let historyList = this.getHistory()
      if (!historyList.includes(template)) {
          historyList.unshift(template)
          localStorage.setItem('historyList', JSON.stringify(historyList))
      } else {
          let i = historyList.indexOf(template)
          historyList.splice(i, 1)
          historyList.unshift(template)
          localStorage.setItem('historyList', JSON.stringify(historyList))
      }
      this.historyList = historyList
      this.$forceUpdate()
    },
    getHistory() {
        let historyList = []
        if (JSON.parse(localStorage.getItem('historyList'))) {
            historyList = JSON.parse(localStorage.getItem('historyList'))
        }
        return historyList
    }
  }
}
</script>
