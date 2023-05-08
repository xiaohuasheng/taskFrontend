<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="新建task json">
      <el-button type="primary" @click="taskConvert()">转换</el-button>
      <el-input placeholder="团队UUID" type="input" size="medium" v-model="form.teamUUID"></el-input>
      <el-input placeholder="希望创建的工作项的时间和状态变化过程，空格分开，如果不指定状态，就表示不需要状态流转
2021-08-25 待处理 2021-08-26 处理中
2021-08-27" autosize type="textarea" size="medium" v-model="form.dateStatus"></el-input>
      <el-input placeholder="add3接口的参数" type="textarea" size="medium" v-model="form.taskStr"></el-input>
      <el-input placeholder="stamps/data接口获取团队状态的结果" type="textarea" size="medium" v-model="form.teamStatus"></el-input>
<!--      分割线-->
      <el-divider></el-divider>
      <el-input placeholder="创建工作项参数" type="textarea" size="medium" v-model="form.taskStrRes"></el-input>
      <el-input placeholder="修改状态SQL" autosize type="textarea" size="medium" v-model="form.statusSql"></el-input>
      <el-button type="primary" @click="taskConvert()">转换</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="nginx日志解析">
      <el-button type="primary" @click="test()">测试</el-button>
      <el-upload
        class="upload-demo"
        action=""
        :http-request="uploadSectionFile"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <el-divider></el-divider>
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
      <el-radio v-model="form.tplToOneRow" label="true">变为一行</el-radio>
      <el-radio v-model="form.tplToOneRow" label="false">换行</el-radio>
      <el-input autosize type="textarea" v-model="form.tplRes"></el-input>
      <el-button type="primary" @click="templateConvert(form.tpl, form.tplValue, form.tplToOneRow)">转换</el-button>
<!--      <el-button type="primary" @click="toOneRow(form.tplRes)">变成一行</el-button>-->
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="json压缩">
      <el-input autosize type="textarea" size="medium" v-model="form.jsonStr"></el-input>
      <el-button type="primary" @click="jsonConvert(form.jsonStr)">转换</el-button>
    </el-form-item>
    <!-- 去重，分割，排序 -->
    <el-divider></el-divider>
    <el-form-item label="分割排序去重">
      <el-input autosize type="textarea" size="medium" v-model="form.split"></el-input>
      <el-input autosize type="textarea" v-model="form.splitRes"></el-input>
      <el-button type="primary" @click="splitSortConvert(form.split)">转换</el-button>
    </el-form-item>
    <el-form-item label="ES日志转换为curl">
      <el-input autosize type="textarea" size="medium" v-model="form.eslog"></el-input>
      <el-input autosize type="textarea" v-model="form.eslogRes"></el-input>
      <el-button type="primary" @click="eslogConvert(form.eslog)">转换</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {convertLogToCurlCommand} from '../convert'
import {convertAllLog} from '../parseNginxLog'
import {generateTask} from '../generateTask'
import {saveAs} from 'file-saver'

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
        tplToOneRow: 'true',
        split: '',
        splitRes: '',
        jsonStr: '',
        teamUUID: 'WrGnwyb8',
        dateStatus: '',
        taskStr: '',
        taskStrRes: '',
        teamStatus: '',
        teamStrRes: '',
        statusSql: '',
        eslog: '',
        eslogRes: ''
      },
      historyList: [],
      fileList: [],
      nginxResult: ''
    }
  },
  mounted() {
    this.historyList = this.getHistory()
  },
  meta: {
    contentSecurityPolicy: {
      scriptSrc: ["'self'", "'unsafe-eval'"]
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
    toOneRow(res) {
      if (res.length <= 0) {
        return ''
      }
      // 去掉换行符
      let str = res.replace(/\n/g, '')
      this.form.tplRes = str
    },
    templateConvert(tpl, tplValue, toOneRow) {
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
      let resStr = resArr.join(spiltCh)
      if (toOneRow === 'true') {
        resStr = resStr.replace(/\n/g, '')
      }
      this.form.tplRes = resStr
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
        let sqlPrefixs = ['SELECT', 'INSERT', 'UPDATE']
        let prefix = sqlPrefixs[0]
        for (let prefixIndex in sqlPrefixs) {
          if (row.indexOf(sqlPrefixs[prefixIndex]) > -1) {
            prefix = sqlPrefixs[prefixIndex]
            break
          }
        }
        let tmp = row.split(prefix)
        let toConvert = tmp[0]
        if (tmp.length > 1) {
          toConvert = prefix + tmp[1]
        }
        let tmpSql = this.ConvertOneSql(toConvert)
        result.push(tmpSql)
      }
      this.form.sqlRes = result.join('\n')
    },
    ConvertOneSql(data) {
      let splitCharPos = data.indexOf('[')
      if (splitCharPos === -1) {
        return data
      }
      let sql = data.slice(0, splitCharPos)
      let paramsStr = data.slice(splitCharPos + 1, data.length - 1)
      let paramStrList = paramsStr.split(' ')
      let paramList = []
      for (let key in paramStrList) {
        let val = paramStrList[key]
        let colonPos = val.indexOf(':')
        let param = val
        if (colonPos > -1) {
          let tmp = val.split(':')
          if (tmp.length < 2) {
            console.log('error:' + val)
            return data
          }
          param = tmp[1]
        } else {
          // 判断param是否为数字
          if (isNaN(param)) {
            param = '"' + param + '"'
          }
        }
        paramList.push(param)
      }
      for (let key in paramList) {
        let val = paramList[key]
        sql = sql.replace('?', val)
      }
      return sql
    },
    jsonConvert(jsonStr) {
      if (jsonStr.length === 0) {
        return
      }
      if (jsonStr.includes('\n')) {
        this.form.jsonStr = JSON.stringify(JSON.parse(jsonStr))
      } else {
        this.form.jsonStr = JSON.stringify(JSON.parse(jsonStr), null, '  ')
      }
    },
    taskConvert() {
      if (this.form.taskStr.length === 0) {
        return
      }
      let res = generateTask(this.form.taskStr, this.form.dateStatus, this.form.teamUUID, this.form.teamStatus)
      console.log(res)
      this.form.taskStrRes = res.json
      this.form.statusSql = res.sql
    },
    test() {
      convertAllLog('')
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
    unique(arr) {
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
    },
    eslogConvert(eslog) {
      if (eslog.length === 0) {
        return
      }
      let curlCommand = convertLogToCurlCommand(eslog)
      this.form.eslogRes = curlCommand
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除`)
    },
    uploadSectionFile(param) {
      // TODO 能让用户确认哪些列是什么信息，以适应不同格式的日志，可以按某列排序
      let fileObj = param.file
      let reader = new FileReader()
      reader.readAsText(fileObj)
      const _this = this
      let resultStr = ''
      reader.onload = function () {
        console.log(fileObj)
        console.log(_this)
        resultStr = convertAllLog(this.result)
        let strData = new Blob([resultStr], {type: 'text/plain;charset=utf-8'})
        // 文件名加上parsed后缀
        let fileName = fileObj.name.replace(/(\.[^.]+)$/, '_parsed$1')
        saveAs(strData, fileName)
        _this.fileList = []
      }
    }
  }
}
</script>
