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
  result.sort((a, b) => {
    if (a.requestTime === b.requestTime) {
      return a.time > b.time ? 1 : -1
    } else {
      return a.requestTime > b.requestTime ? -1 : 1
    }
  })
  // 对result按path排序，path相同按请求时间排序
  // result.sort((a, b) => {
  //   if (a.requestTime === b.requestTime) {
  //     return a.time > b.time ? 1 : -1
  //   } else {
  //     return a.requestTime > b.requestTime ? -1 : 1
  //   }
  // })
  // 对result按path排序，path相同按请求时间排序
  // console.log('pathCount', pathCount)
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
