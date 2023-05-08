export function convertNginxLog(nginxLog) {
  const lines = nginxLog.split('\n')
  // console.log(lines)
  const result = []
  // 统计 path 的请求次数
  const pathCount = {}
  lines.forEach((line) => {
    const lineArr = line.split(' ')
    if (lineArr.length < 7) {
      console.log('无法解析的行', line, 'lineArr.length', lineArr.length)
      return
    }
    let ip = lineArr[0]
    let time = lineArr[3] + ' ' + lineArr[4]
    let method = lineArr[5]
    let path = lineArr[6]
    // 统计 path 的请求次数
    if (pathCount[path]) {
      pathCount[path]++
    } else {
      pathCount[path] = 1
    }
    // 127.0.0.1 - - [21/Feb/2023:23:59:05 +0800] "GET /api/project/team/2vtyv8Uu/task/WPf96zgeCHUKVMFw/messages HTTP/1.1" 200 4617 "-" "Go-http-client/1.1" "192.168.24.5" "0.011"
    // 取状态码
    let status = lineArr[8]
    // 取请求客户端
    // let client = lineArr[11]
    // 如果status是200，跳过
    // if (status === '200') {
    //   return
    // }
    // console.log('status', status)
    // 如果 status 不是 605,612,615,616,跳过
    // if (status !== '605' && status !== '612' && status !== '615' && status !== '616') {
    //   return
    // }
    // if (status !== '605' || ) {
    //   return
    // }
    // 取lineArr最后一个元素
    let requestTime = lineArr[lineArr.length - 1]
    requestTime = parseFloat(requestTime.replace(/"/g, ''))
    if (isNaN(requestTime)) {
      console.log('无法解析请求耗时', line, 'lineArr.length', lineArr.length)
      return
    }
    // 把数据放到对象里，按请求耗时排序，耗时相同按请求时间排序
    let resultObj = {
      ip: ip,
      time: time,
      method: method + ' ' + path,
      status: status,
      // client: client,
      requestTime: requestTime
    }
    result.push(resultObj)
  })
  // 对result按请求耗时排序，耗时相同按请求时间排序
  // result.sort((a, b) => {
  //   if (a.requestTime === b.requestTime) {
  //     return a.time > b.time ? 1 : -1
  //   } else {
  //     return a.requestTime > b.requestTime ? -1 : 1
  //   }
  // })
  // 对result按path排序，path相同按请求时间排序
  result.sort((a, b) => {
    if (a.requestTime === b.requestTime) {
      return a.time > b.time ? 1 : -1
    } else {
      return a.requestTime > b.requestTime ? -1 : 1
    }
  })
  // 对result按path排序，path相同按请求时间排序
  console.log('pathCount', pathCount)
  // result.sort((a, b) => {
  //   if (a.method === b.method) {
  //     return a.time > b.time ? 1 : -1
  //   } else {
  //     return a.method > b.method ? 1 : -1
  //   }
  // })

  // 转为字符串，输出
  let resultStr = ''
  console.log('result.length', result.length)
  result.forEach((item) => {
    // 把item对象合并为字符串，空格分开
    resultStr += Object.values(item).join(' ') + '\n'
    // resultStr += item.time + ' ' + item.method + ' ' + item.requestTime + '\n'
  })
  return resultStr
}

export function parselog2(nginxLog) {
  const lines = nginxLog.split('\n')
  // console.log(lines)
  const result = []
  // 统计 path 的请求次数
  const pathCount = {}
  lines.forEach((line) => {
    const lineArr = line.split(' ')
    if (lineArr.length < 7) {
      console.log('无法解析的行', line, 'lineArr.length', lineArr.length)
      return
    }
    let ip = lineArr[0]
    let time = lineArr[3] + ' ' + lineArr[4]
    let method = lineArr[5]
    let path = lineArr[6]
    // 统计 path 的请求次数
    if (pathCount[path]) {
      pathCount[path]++
    } else {
      pathCount[path] = 1
    }
    // 127.0.0.1 - - [21/Feb/2023:23:59:05 +0800] "GET /api/project/team/2vtyv8Uu/task/WPf96zgeCHUKVMFw/messages HTTP/1.1" 200 4617 "-" "Go-http-client/1.1" "192.168.24.5" "0.011"
    // 取状态码
    let status = lineArr[8]
    let requestTime = lineArr[lineArr.length - 1]
    requestTime = parseFloat(requestTime.replace(/"/g, ''))
    if (isNaN(requestTime)) {
      console.log('无法解析请求耗时', line, 'lineArr.length', lineArr.length)
      return
    }
    // 把数据放到对象里，按请求耗时排序，耗时相同按请求时间排序
    let resultObj = {
      ip: {
        type: 'string',
        value: ip
      },
      time: {
        type: 'string',
        value: time
      },
      method: {
        type: 'string',
        value: method + ' ' + path
      },
      status: {
        type: 'string',
        value: status
      },
      // client: client,
      requestTime: {
        type: 'number',
        value: requestTime
      }
    }
    result.push(resultObj)
  })
  return result
}

export function convertAllLog(nginxLog2) {
  let nginxLog = `172.31.0.123 - - [04/May/2023:23:59:04 +0800] "GET /project/api/project/team/RZxvwUZ8/notices/info?type=1 HTTP/1.0" 200 587 "https://ones.bangcle.com/project/" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.1.12.0 Safari/537.36 Language/zh wxwork/4.1.3 (MicroMessenger/6.2) WindowsWechat  MailPlugin_Electron WeMail embeddisk" "106.38.121.197, 172.31.0.123" "0.012"
172.31.0.123 - - [04/May/2023:23:59:04 +0800] "GET /project/api/project/team/RZxvwUZ8/notices/info?type=1 HTTP/1.0" 200 490 "https://ones.bangcle.com/project/" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.1.12.0 Safari/537.36 Language/zh wxwork/4.1.3 (MicroMessenger/6.2) WindowsWechat  MailPlugin_Electron WeMail embeddisk" "106.38.121.197, 172.31.0.123" "0.010"
172.31.0.123 - - [04/May/2023:23:59:04 +0800] "POST /project/api/project/team/RZxvwUZ8/card/5CRXLgun/data HTTP/1.0" 200 639 "https://ones.bangcle.com/project/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36" "106.38.121.194, 172.31.0.123" "0.017"
172.31.0.123 - - [04/May/2023:23:59:05 +0800] "POST /project/api/project/team/RZxvwUZ8/card/NZyQ1vaK/data HTTP/1.0" 200 106 "https://ones.bangcle.com/project/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36" "106.38.121.194, 172.31.0.123" "0.036"`
  // const lines = nginxLog.split('\n')
  let funcStr = `function parselog(nginxLog) {
  const lines = nginxLog.split('\\n')
  // console.log(lines)
  const result = []
  // 统计 path 的请求次数
  const pathCount = {}
  lines.forEach((line) => {
    const lineArr = line.split(' ')
    if (lineArr.length < 7) {
      console.log('无法解析的行', line, 'lineArr.length', lineArr.length)
      return
    }
    let ip = lineArr[0]
    let time = lineArr[3] + ' ' + lineArr[4]
    let method = lineArr[5]
    let path = lineArr[6]
    // 统计 path 的请求次数
    if (pathCount[path]) {
      pathCount[path]++
    } else {
      pathCount[path] = 1
    }
    // 127.0.0.1 - - [21/Feb/2023:23:59:05 +0800] "GET /api/project/team/2vtyv8Uu/task/WPf96zgeCHUKVMFw/messages HTTP/1.1" 200 4617 "-" "Go-http-client/1.1" "192.168.24.5" "0.011"
    // 取状态码
    let status = lineArr[8]
    let requestTime = lineArr[lineArr.length - 1]
    requestTime = parseFloat(requestTime.replace(/"/g, ''))
    if (isNaN(requestTime)) {
      console.log('无法解析请求耗时', line, 'lineArr.length', lineArr.length)
      return
    }
    // 把数据放到对象里，按请求耗时排序，耗时相同按请求时间排序
    let resultObj = {
      ip: {
        type: 'string',
        value: ip
      },
      time: {
        type: 'string',
        value: time
      },
      method: {
        type: 'string',
        value: method + ' ' + path
      },
      status: {
        type: 'string',
        value: status
      },
      // client: client,
      requestTime: {
        type: 'number',
        value: requestTime
      }
    }
    result.push(resultObj)
  })
  return result
}
`
  // eslint-disable-next-line no-eval
  eval(funcStr)
  // eslint-disable-next-line no-undef
  let result = parselog(nginxLog)
  console.log('result: ', result)
}

export function convertAllLogCanUse(nginxLog2) {
  let nginxLog = `# Time: 2023-05-02T20:07:41.658728Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 975945
# Query_time: 1.715076  Lock_time: 0.000024 Rows_sent: 278686  Rows_examined: 336258
SET timestamp=1683058061;
SELECT uuid, team_uuid, org_uuid, context_type, context_param_1, context_param_2, user_domain_type, user_domain_param, permission, create_time, status, read_only, position FROM permission_rule WHERE team_uuid='RZxvwUZ8' AND permission IN (1202) AND status=1;
# Time: 2023-05-02T21:00:01.084358Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 975990
# Query_time: 1.064522  Lock_time: 0.000029 Rows_sent: 0  Rows_examined: 62561
SET timestamp=1683061201;
SELECT team_uuid,COUNT(DISTINCT owner) AS count FROM \`task\` WHERE LEFT(create_time, 10) >= 1682956800 AND LEFT(create_time, 10) <= 1683043199 GROUP BY \`team_uuid\`;
`
  // const lines = nginxLog.split('\n')
  let funcStr2 = `function add(log) {
    const logEntries = log.split('# Time:');
    const result = [];
    logEntries.forEach((entry) => {
        if (entry.trim() === '') {
            return
        }
        const lines = entry.split('\\n');
        const entryObject = {};
        lines.forEach((line) => {
            const [key, value] = line.split(': ');
            if (key === undefined || value === undefined) {
                return
            }
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'Query_time' || trimmedKey === 'Lock_time') {
                entryObject[trimmedKey] = parseFloat(trimmedValue)
            } else if (trimmedKey === 'Rows_sent' || trimmedKey === 'Rows_examined') {
                entryObject[trimmedKey] = parseInt(trimmedValue)
            } else if (trimmedKey === 'SET timestamp') {
                entryObject['timestamp'] = new Date(parseInt(trimmedValue) * 1000)
            } else {
                entryObject[trimmedKey.toLowerCase()] = trimmedValue
            }
        });
        result.push(entryObject)
    });
    return result;
}`
  // eslint-disable-next-line no-eval
  eval(funcStr2)
  // eslint-disable-next-line no-undef
  let result2 = add(nginxLog)
  console.log('result2: ', result2)

// 使用eval()函数执行函数字符串
  // eslint-disable-next-line no-eval
  // eval(funcStr)

  // eslint-disable-next-line no-undef
// 调用动态生成的函数，并传递参数
  // eslint-disable-next-line no-undef
  // let result = parseLog(lines)
}

export function convertAllLog2(nginxLog) {
  nginxLog = `# Time: 2023-05-02T20:07:41.658728Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 975945
# Query_time: 1.715076  Lock_time: 0.000024 Rows_sent: 278686  Rows_examined: 336258
SET timestamp=1683058061;
SELECT uuid, team_uuid, org_uuid, context_type, context_param_1, context_param_2, user_domain_type, user_domain_param, permission, create_time, status, read_only, position FROM permission_rule WHERE team_uuid='RZxvwUZ8' AND permission IN (1202) AND status=1;
# Time: 2023-05-02T21:00:01.084358Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 975990
# Query_time: 1.064522  Lock_time: 0.000029 Rows_sent: 0  Rows_examined: 62561
SET timestamp=1683061201;
SELECT team_uuid,COUNT(DISTINCT owner) AS count FROM \`task\` WHERE LEFT(create_time, 10) >= 1682956800 AND LEFT(create_time, 10) <= 1683043199 GROUP BY \`team_uuid\`;
`
  const lines = nginxLog.split('\n')

  // let funcStr = `function parseLog(log){const result=[];let state='start';let entryObject={};for(let i=0;i<log.length;i++){const char=log[i];switch(state){case'start':if(char==='#'){state='time'}break;case'time':if(char==='\\n'){state='user@host'}else{entryObject['time']=entryObject['time']||'';entryObject['time']+=char}break;case'user@host':if(char==='\\n'){state='query_time'}else{entryObject['user@host']=entryObject['user@host']||'';entryObject['user@host']+=char}break;case'query_time':if(char===' '){state='query_time_value'}break;case'query_time_value':if(char==='L'){state='lock_time'}else if(char==='R'){state='rows_sent'}else{entryObject['query_time']=entryObject['query_time']||'';entryObject['query_time']+=char}break;case'lock_time':if(char===' '){state='lock_time_value'}break;case'lock_time_value':if(char==='R'){state='rows_sent'}else{entryObject['lock_time']=entryObject['lock_time']||'';entryObject['lock_time']+=char}break;case'rows_sent':if(char===' '){state='rows_sent_value'}break;case'rows_sent_value':if(char==='R'){state='rows_examined'}else{entryObject['rows_sent']=entryObject['rows_sent']||'';entryObject['rows_sent']+=char}break;case'rows_examined':if(char===' '){state='rows_examined_value'}break;case'rows_examined_value':if(char==='\\n'){state='set_timestamp'}else{entryObject['rows_examined']=entryObject['rows_examined']||'';entryObject['rows_examined']+=char}break;case'set_timestamp':if(char===';'){state='select'}break;case'select':if(char==='#'){result.push(entryObject);entryObject={};state='time'}else{entryObject['select']=entryObject['select']||'';entryObject['select']+=char}break}}if(Object.keys(entryObject).length>0){result.push(entryObject)}return result}`
  // funcStr = `function parseLog(log){const logEntries=log.split('# Time:');const result=[];logEntries.forEach((entry)=>{if(entry.trim()===''){return}const lines=entry.split('\\n');const entryObject={};lines.forEach((line)=>{const[key,value]=line.split(': ');if(key===undefined||value===undefined){return}const trimmedKey=key.trim();const trimmedValue=value.trim();if(trimmedKey==='Query_time'||trimmedKey==='Lock_time'){entryObject[trimmedKey]=parseFloat(trimmedValue)}else if(trimmedKey==='Rows_sent'||trimmedKey==='Rows_examined'){entryObject[trimmedKey]=parseInt(trimmedValue)}else if(trimmedKey==='SET timestamp'){entryObject['timestamp']=new Date(parseInt(trimmedValue)*1000)}else{entryObject[trimmedKey.toLowerCase()]=trimmedValue}});result.push(entryObject)});return result}`
  // funcStr = 'function parseLog(log) { console.log(log); return log; }'

  // let funcStr2 = `function add(log) {const logEntries=log.split('# Time:');const result=[];logEntries.forEach((entry)=>{if(entry.trim()===''){return}const lines=entry.split('\\n');const entryObject={};lines.forEach((line)=>{const[key,value]=line.split(': ');if(key===undefined||value===undefined){return}const trimmedKey=key.trim();const trimmedValue=value.trim();if(trimmedKey==='Query_time'||trimmedKey==='Lock_time'){entryObject[trimmedKey]=parseFloat(trimmedValue)}else if(trimmedKey==='Rows_sent'||trimmedKey==='Rows_examined'){entryObject[trimmedKey]=parseInt(trimmedValue)}else if(trimmedKey==='SET timestamp'){entryObject['timestamp']=new Date(parseInt(trimmedValue)*1000)}else{entryObject[trimmedKey.toLowerCase()]=trimmedValue}});result.push(entryObject)}); return 3; }`
  let funcStr2 = `function add(log) {const logEntries=log.split('# Time:'); return logEntries; }`
  // eslint-disable-next-line no-eval
  eval(funcStr2)
  // eslint-disable-next-line no-undef
  let result2 = add(lines)
  console.log('result2: ', result2)

// 使用eval()函数执行函数字符串
  // eslint-disable-next-line no-eval
  // eval(funcStr)

  // eslint-disable-next-line no-undef
// 调用动态生成的函数，并传递参数
  // eslint-disable-next-line no-undef
  // let result = parseLog(lines)
}

// function extracted(result) {
//   let methodCount = {}
//   result.forEach((item) => {
//     if (methodCount[item.method]) {
//       methodCount[item.method]++
//     } else {
//       methodCount[item.method] = 1
//     }
//   })
//   // 对methodCount按数量排序
//   let methodCountArr = []
//   for (let key in methodCount) {
//     methodCountArr.push({
//       method: key,
//       count: methodCount[key]
//     })
//   }
//   methodCountArr.sort((a, b) => {
//     return a.count > b.count ? -1 : 1
//   })
//   // 把 methodCountArr 输出到文件
//   let methodCountStr = ''
//   methodCountArr.forEach((item) => {
//     methodCountStr += item.method + ' ' + item.count + '\n'
//   })
//   return methodCountStr
// }
