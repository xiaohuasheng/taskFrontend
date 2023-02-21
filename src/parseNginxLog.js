/*
10.33.110.113 - - [20/Feb/2023:11:27:58 +0800] "GET /project/api/project/team/5BXYuw3B/notices/info?type=1 HTTP/1.1" 200 930 "https://ones.jtexpress.com.cn/project/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36" "10.66.101.107" "0.146"
10.33.110.113 - - [20/Feb/2023:11:27:58 +0800] "GET /project/api/project/team/5BXYuw3B/notices/info?type=1 HTTP/1.1" 200 547 "https://ones.jtexpress.com.cn/project/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36" "10.66.101.33" "0.296"
* */

// 读取本地的nginx日志文件，解析出请求路径、请求状态码、请求耗时，输出到文件
export function parseNginxLog(filepath) {
  // 读取文件
  const fs = require('fs')
  const data = fs.readFileSync(filepath, 'utf8')
  // 解析文件
  const lines = data.split('\n')

  const result = []
  // 解析每一行
  lines.forEach((line) => {
    const lineArr = line.split(' ')
    if (lineArr.length === 9) {
      const [ip, , , time, , method, path, httpVersion, statusCode, responseLength, referer, userAgent, clientIp, requestTime] = lineArr
      result.push({
        ip,
        time,
        method,
        path,
        httpVersion,
        statusCode,
        responseLength,
        referer,
        userAgent,
        clientIp,
        requestTime
      })
    }
  })
  // 输出到文件，和输入文件在同一个目录，加个后缀parsed，一行一条记录
  const parsedFilepath = filepath + '.parsed'
  // item 用空格连接成一行
  const parsedData = result.map((item) => item.join(' ')).join('\n')
  console.log('parsedData', parsedData)
  // 写入 parsedFilepath
}

// https://blog.csdn.net/weixin_42776111/article/details/124320511
// https://www.cnblogs.com/FHC1994/p/12104170.html
