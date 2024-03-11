<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="item/graphql参数转换">
      <el-button type="primary" @click="graphqlConvert()">转换</el-button>
      <el-input autosize type="textarea" size="medium" v-model="form.graphql"></el-input>
    </el-form-item>
    <el-divider></el-divider>
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
    <el-divider></el-divider>
    <el-form-item label="ES日志转换为curl">
      <el-input autosize type="textarea" size="medium" v-model="form.eslog"></el-input>
      <el-input autosize type="textarea" v-model="form.eslogRes"></el-input>
      <el-button type="primary" @click="eslogConvert(form.eslog)">转换</el-button>
    </el-form-item>
    <el-form-item label="nginx日志解析">
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
    <el-form-item label="sql填充参数">
      <el-input autosize :placeholder="sqlPlaceholder" type="textarea" size="medium" v-model="form.sql"></el-input>
      <el-input autosize type="textarea" v-model="form.sqlRes"></el-input>
      <el-button type="primary" @click="sqlConvert(form.sql)">转换</el-button>
    </el-form-item>
    <el-divider></el-divider>
  </el-form>
</template>
<script>
import {convertLogToCurlCommand} from '../convert'
import {convertNginxLog} from '../parseNginxLog'
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
        teamStatus: '{"task_status":{"task_statuses":[{"uuid":"UhxdU8LM","name":"测试提交","name_pinyin":"ce4shi4ti2jiao1","category":"to_do","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"X6dh25ML","name":"处理中","name_pinyin":"chu4li3zhong1","category":"in_progress","built_in":true,"detail_type":2004,"create_time":1678881369},{"uuid":"AEtgFL2u","name":"待办","name_pinyin":"dai4ban4","category":"to_do","built_in":true,"detail_type":1007,"create_time":1678881369},{"uuid":"BnPt6Z8J","name":"待处理","name_pinyin":"dai4chu4li3","category":"to_do","built_in":true,"detail_type":1006,"create_time":1678881369},{"uuid":"XoEgDN8V","name":"待回归","name_pinyin":"dai4hui2gui1","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"8nXPBY3S","name":"挂起","name_pinyin":"gua4qi3","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"TUyR5Ngi","name":"关闭","name_pinyin":"guan1bi4","category":"done","built_in":true,"detail_type":3008,"create_time":1678881369},{"uuid":"Paa8JtsD","name":"回归不通过","name_pinyin":"hui2gui1bu4tong1guo4","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"MDgoHf2j","name":"回归通过","name_pinyin":"hui2gui1tong1guo4","category":"done","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"AvQ1HsiW","name":"进行中","name_pinyin":"jin4xing2zhong1","category":"in_progress","built_in":true,"detail_type":2003,"create_time":1678881369},{"uuid":"CLnnver1","name":"实现中","name_pinyin":"shi2xian4zhong1","category":"in_progress","built_in":true,"detail_type":2002,"create_time":1678881369},{"uuid":"XJ3kjw83","name":"完成","name_pinyin":"wan2cheng2","category":"done","built_in":true,"detail_type":3009,"create_time":1678881369},{"uuid":"CE8SNLbp","name":"未发布","name_pinyin":"wei4fa1bu4","category":"to_do","built_in":true,"detail_type":1005,"create_time":1678881369},{"uuid":"57o5LzJd","name":"未激活","name_pinyin":"wei4ji1huo2","category":"to_do","built_in":true,"detail_type":1002,"create_time":1678881369},{"uuid":"4fXcjHJj","name":"未开始","name_pinyin":"wei4kai1shi3","category":"to_do","built_in":true,"detail_type":1001,"create_time":1678881369},{"uuid":"7YVUN5YR","name":"修复中","name_pinyin":"xiu1fu4zhong1","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"Ldnmbcnz","name":"已发布","name_pinyin":"yi3fa1bu4","category":"done","built_in":true,"detail_type":3004,"create_time":1678881369},{"uuid":"6PDWwFu1","name":"已关单","name_pinyin":"yi3guan1dan1","category":"done","built_in":true,"detail_type":3006,"create_time":1678881369},{"uuid":"6K9sSTTK","name":"已解决","name_pinyin":"yi3jie3jue2","category":"done","built_in":true,"detail_type":3007,"create_time":1678881369},{"uuid":"ik9GgK3P","name":"已拒绝","name_pinyin":"yi3ju4jue2","category":"done","built_in":true,"detail_type":3005,"create_time":1678881369},{"uuid":"CrEXAVmW","name":"已确认","name_pinyin":"yi3que4ren4","category":"to_do","built_in":true,"detail_type":1004,"create_time":1678881369},{"uuid":"FJyZJm1k","name":"已实现","name_pinyin":"yi3shi2xian4","category":"done","built_in":true,"detail_type":3002,"create_time":1678881369},{"uuid":"AG5RPoHT","name":"已完成","name_pinyin":"yi3wan2cheng2","category":"done","built_in":true,"detail_type":3003,"create_time":1678881369},{"uuid":"12ZZvq55","name":"已修复","name_pinyin":"yi3xiu1fu4","category":"in_progress","built_in":true,"detail_type":2001,"create_time":1678881369},{"uuid":"29ciQvjM","name":"已验证","name_pinyin":"yi3yan4zheng4","category":"done","built_in":true,"detail_type":3001,"create_time":1678881369},{"uuid":"CmNnx8T1","name":"重新打开","name_pinyin":"zhong4xin1da3kai1","category":"to_do","built_in":true,"detail_type":1003,"create_time":1678881369}],"server_update_stamp":1678936043910459}}',
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
    if (this.historyList.length > 0) {
      this.form.tpl = this.historyList[0]
    }
  },
  methods: {
    onSubmit(type, value) {
      let param = {'type': type, 'value': value}
      this.axios.post(process.env.BACKEND_HOST + '/api/convert', param).then(data => {
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
      // this.form.taskStr = '{"tasks":[{"uuid":"AYuecVfJHOEjGZky","owner":"AYuecVfJ","assign":"AYuecVfJ","summary":"today","parent_uuid":"","field_values":[{"field_uuid":"field004","type":8,"value":"AYuecVfJ"},{"field_uuid":"field012","type":1,"value":"ATQz4y4x"},{"field_uuid":"field031","type":1,"value":null},{"field_uuid":"field011","type":7,"value":null},{"field_uuid":"field038","type":1,"value":null},{"field_uuid":"field041","type":1,"value":null},{"field_uuid":"field040","type":8,"value":null},{"field_uuid":"RmvG6a2Y","type":2,"value":""},{"field_uuid":"5qobnM6i","type":1,"value":null},{"field_uuid":"JFoogWSG","type":8,"value":null},{"field_uuid":"VCjgrHNF","type":7,"value":null},{"field_uuid":"UphUjBb2","type":15,"value":""},{"field_uuid":"UJV4tNci","type":16,"value":null},{"field_uuid":"PaZAmqL7","type":13,"value":null},{"field_uuid":"VuGHLaEM","type":50,"value":null},{"field_uuid":"51nZ17or","type":4,"value":null},{"field_uuid":"BsBwUhih","type":5,"value":null},{"field_uuid":"7sjNWa1i","type":6,"value":null},{"field_uuid":"QHFZzTyr","type":3,"value":null}],"project_uuid":"AYuecVfJDCNBKyOM","issue_type_uuid":"H45miQMw","link_source_task":null,"watchers":["AYuecVfJ"]}]}'
      // this.form.teamUUID = 'WrGnwyb8'
      // this.form.dateStatus = '2021-08-25 待处理\n' +
      //   '2021-08-27 处理中\n'
      // this.form.dateStatus = '2021-08-25 待处理 2021-08-27 处理中 2021-08-29 已解决 2021-08-31 已关单\n' +
      //   '2021-08-25 待处理 2021-08-27 处理中 2021-08-31 已解决\n' +
      //   '2021-08-31 待处理\n' +
      //   '2021-08-31 待处理\n' +
      //   '2021-08-31 待处理 2021-09-01 已解决\n' +
      //   '2021-09-01 待处理\n' +
      //   '2021-09-01 待处理\n'
      // this.form.dateStatus = '2021-08-25 待处理 2021-08-27 处理中 2021-08-29 已解决 2021-08-31 已关单'
      // this.form.teamStatus = '{"task_status":{"task_statuses":[{"uuid":"UhxdU8LM","name":"测试提交","name_pinyin":"ce4shi4ti2jiao1","category":"to_do","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"X6dh25ML","name":"处理中","name_pinyin":"chu4li3zhong1","category":"in_progress","built_in":true,"detail_type":2004,"create_time":1678881369},{"uuid":"AEtgFL2u","name":"待办","name_pinyin":"dai4ban4","category":"to_do","built_in":true,"detail_type":1007,"create_time":1678881369},{"uuid":"BnPt6Z8J","name":"待处理","name_pinyin":"dai4chu4li3","category":"to_do","built_in":true,"detail_type":1006,"create_time":1678881369},{"uuid":"XoEgDN8V","name":"待回归","name_pinyin":"dai4hui2gui1","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"8nXPBY3S","name":"挂起","name_pinyin":"gua4qi3","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"TUyR5Ngi","name":"关闭","name_pinyin":"guan1bi4","category":"done","built_in":true,"detail_type":3008,"create_time":1678881369},{"uuid":"Paa8JtsD","name":"回归不通过","name_pinyin":"hui2gui1bu4tong1guo4","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"MDgoHf2j","name":"回归通过","name_pinyin":"hui2gui1tong1guo4","category":"done","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"AvQ1HsiW","name":"进行中","name_pinyin":"jin4xing2zhong1","category":"in_progress","built_in":true,"detail_type":2003,"create_time":1678881369},{"uuid":"CLnnver1","name":"实现中","name_pinyin":"shi2xian4zhong1","category":"in_progress","built_in":true,"detail_type":2002,"create_time":1678881369},{"uuid":"XJ3kjw83","name":"完成","name_pinyin":"wan2cheng2","category":"done","built_in":true,"detail_type":3009,"create_time":1678881369},{"uuid":"CE8SNLbp","name":"未发布","name_pinyin":"wei4fa1bu4","category":"to_do","built_in":true,"detail_type":1005,"create_time":1678881369},{"uuid":"57o5LzJd","name":"未激活","name_pinyin":"wei4ji1huo2","category":"to_do","built_in":true,"detail_type":1002,"create_time":1678881369},{"uuid":"4fXcjHJj","name":"未开始","name_pinyin":"wei4kai1shi3","category":"to_do","built_in":true,"detail_type":1001,"create_time":1678881369},{"uuid":"7YVUN5YR","name":"修复中","name_pinyin":"xiu1fu4zhong1","category":"in_progress","built_in":false,"detail_type":0,"create_time":1678881369},{"uuid":"Ldnmbcnz","name":"已发布","name_pinyin":"yi3fa1bu4","category":"done","built_in":true,"detail_type":3004,"create_time":1678881369},{"uuid":"6PDWwFu1","name":"已关单","name_pinyin":"yi3guan1dan1","category":"done","built_in":true,"detail_type":3006,"create_time":1678881369},{"uuid":"6K9sSTTK","name":"已解决","name_pinyin":"yi3jie3jue2","category":"done","built_in":true,"detail_type":3007,"create_time":1678881369},{"uuid":"ik9GgK3P","name":"已拒绝","name_pinyin":"yi3ju4jue2","category":"done","built_in":true,"detail_type":3005,"create_time":1678881369},{"uuid":"CrEXAVmW","name":"已确认","name_pinyin":"yi3que4ren4","category":"to_do","built_in":true,"detail_type":1004,"create_time":1678881369},{"uuid":"FJyZJm1k","name":"已实现","name_pinyin":"yi3shi2xian4","category":"done","built_in":true,"detail_type":3002,"create_time":1678881369},{"uuid":"AG5RPoHT","name":"已完成","name_pinyin":"yi3wan2cheng2","category":"done","built_in":true,"detail_type":3003,"create_time":1678881369},{"uuid":"12ZZvq55","name":"已修复","name_pinyin":"yi3xiu1fu4","category":"in_progress","built_in":true,"detail_type":2001,"create_time":1678881369},{"uuid":"29ciQvjM","name":"已验证","name_pinyin":"yi3yan4zheng4","category":"done","built_in":true,"detail_type":3001,"create_time":1678881369},{"uuid":"CmNnx8T1","name":"重新打开","name_pinyin":"zhong4xin1da3kai1","category":"to_do","built_in":true,"detail_type":1003,"create_time":1678881369}],"server_update_stamp":1678936043910459}}'
      if (this.form.taskStr.length === 0) {
        return
      }
      let res = generateTask(this.form.taskStr, this.form.dateStatus, this.form.teamUUID, this.form.teamStatus)
      console.log(res)
      this.form.taskStrRes = res.json
      this.form.statusSql = res.sql
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
        resultStr = convertNginxLog(this.result)
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
