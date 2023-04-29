/*
# Time: 2023-02-22T07:19:21.668222Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 170105
# Query_time: 1.094074  Lock_time: 0.000262 Rows_sent: 100  Rows_examined: 200
SET timestamp=1677050361;
SELECT * FROM message WHERE uuid IN('Uo7LqBDU' ,'7inHWMqf' ,'FUZ2EygO' ,'5yeL8FoU' ,'TDioM1KS' ,'17oJo7rT' ,'JQ1vqy2p' ,'lP6vpCjt' ,'VDyuXLvM' ,'VZtXqLi2' ,'KUuVTANc' ,'LAjuHzaj' ,'JiyyHiev' ,'3SdcyQbh' ,'Y6U3KusW' ,'NEXMA5mT' ,'JqRDjkAa' ,'HmPwuHmD' ,'8sqLBgkX' ,'SNRjGClr' ,'RffbtF7p' ,'8H7P5Tfd' ,'7m9PSkox' ,'RoaKme8o' ,'XfwfbUqG' ,'bPgCnaqL' ,'GdVmhmzu' ,'CRmpsLwV' ,'ESB6dUIP' ,'wQqGcWng' ,'51FKSFdA' ,'2XnSAwP9' ,'PdbLLY8U' ,'AAmmYFHm' ,'GdMLBNKS' ,'78x13uRc' ,'59NydhiB' ,'H9KJfH3g' ,'4LQ5jhct' ,'XJmZXPLo' ,'RcgrhAhR' ,'C7nUBLxw' ,'XxHHAF1s' ,'sdwCAfZl' ,'GmGwyhBD' ,'RqvZSgcF' ,'A1kMtr6h' ,'9EyU5B3q' ,'K647msPJ' ,'C7D3oM6m' ,'S3VDd8Dj' ,'KgoKHCbj' ,'Y4Cps6PH' ,'RsFXijDB' ,'RZp8CkAE' ,'CJFktwoS' ,'HJJM9UuF' ,'SRQGvQd9' ,'GGbG2QkL' ,'W5xzVchL' ,'R5HkPOdq' ,'HWsZ92vB' ,'612h3j6E' ,'E6WBBPut' ,'Y6o2BQCw' ,'BUbsBfcE' ,'7CfV9TAn' ,'gWgYJ9hJ' ,'VCegPNnq' ,'h1sllewB' ,'3yGWTnEs' ,'39Mnwzh4' ,'VhwsHoJM' ,'MQzZS1n7' ,'Hvadvd5P' ,'JXl6I9dI' ,'L8x886oo' ,'23XbFbmN' ,'PTQQ2Nx5' ,'A2easKSn' ,'u9xXQwxh' ,'GoJshaWL' ,'M6KfGgCB' ,'9iRhXTJv' ,'GWtRT7sd' ,'SbaGvzdT' ,'GLtHyLFP' ,'Yrmo1XBN' ,'QNfKf58w' ,'6wNhqUN3' ,'LmwANQ8T' ,'M4XHr39L' ,'21SVo76K' ,'TPdMtXhK' ,'PZSk4kiR' ,'vDeJEoOf' ,'RUJSVcMx' ,'JE8F1Fez' ,'MLdQ36A8' ,'f6HZguqX') ORDER BY send_time DESC;
# Time: 2023-02-22T07:24:01.941900Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 170793
# Query_time: 5.021253  Lock_time: 0.000035 Rows_sent: 210606  Rows_examined: 504455
SET timestamp=1677050641;
SELECT `uuid` FROM task WHERE (team_uuid = '2vtyv8Uu' AND status IN (1));
# Time: 2023-02-22T07:24:01.941902Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 170774
# Query_time: 5.023407  Lock_time: 0.000041 Rows_sent: 210606  Rows_examined: 504455
SET timestamp=1677050641;
SELECT `uuid` FROM task WHERE (team_uuid = '2vtyv8Uu' AND status IN (1));
# Time: 2023-02-22T07:24:34.056467Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 171247
# Query_time: 2.811775  Lock_time: 0.000028 Rows_sent: 210606  Rows_examined: 504455
SET timestamp=1677050674;
SELECT `uuid` FROM task WHERE (team_uuid = '2vtyv8Uu' AND status IN (1));
# Time: 2023-02-22T07:24:34.056467Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 171253
# Query_time: 2.778238  Lock_time: 0.000045 Rows_sent: 210606  Rows_examined: 504455
SET timestamp=1677050674;
SELECT `uuid` FROM task WHERE (team_uuid = '2vtyv8Uu' AND status IN (1));
# Time: 2023-02-22T07:26:38.816553Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 172050
# Query_time: 5.555492  Lock_time: 0.000055 Rows_sent: 954  Rows_examined: 505409
SET timestamp=1677050798;
SELECT `uuid`, `owner`, `create_time`, `path` FROM task WHERE (team_uuid = '2vtyv8Uu' AND status IN (1) AND `owner` IN ('EbfBfXoV')) ORDER BY (CASE WHEN parent_uuid='' THEN 0 ELSE `position` END) ASC, create_time DESC;
# Time: 2023-02-22T07:48:46.936746Z
# User@Host: ones[ones] @  [127.0.0.1]  Id: 174221
# Query_time: 1.150451  Lock_time: 0.000038 Rows_sent: 7  Rows_examined: 63392
SET timestamp=1677052126;
select t.project_uuid as _1, t.uuid as _2 from task as t left join field_value as f on t.uuid=f.task_uuid where t.team_uuid ='2vtyv8Uu' and t.project_uuid IN ('auSB7QAeSE2z7dLb') and t.status=1 and f.status=1 and f.field_uuid='field027' and f.number_value is not null;

*/

// 解析mysql慢查询日志，写一个状态机, 得到查询时间、锁时间、返回行数、扫描行数、sql语句
export function parseMysqlSlowLog(log) {
  const lines = log.split('\n')
  let result = {}
  let state = 'start'
  let sql = ''
  // 把result返回数组，再继续解析
  let results = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (state === 'start') {
      if (line.startsWith('# Time:')) {
        result.time = line.replace('# Time:', '').trim()
        // Time需要转换为本地时间，加8个小时
        result.time = new Date(result.time).toLocaleString()
        state = 'time'
      }
    } else if (state === 'time') {
      if (line.startsWith('# User@Host:')) {
        result.user = line.replace('# User@Host:', '').trim()
        state = 'user'
      }
    } else if (state === 'user') {
      if (line.startsWith('# Query_time:')) {
        result.queryTime = line.replace('# Query_time:', '').trim()
        state = 'queryTime'
        // Lock_time, Rows_sent, Rows_examined是在同一行，所以这里直接解析
        const arr = result.queryTime.split(' ')
        result.lockTime = arr[1].replace('Lock_time:', '').trim()
        result.rowsSent = arr[2].replace('Rows_sent:', '').trim()
        result.rowsExamined = arr[3].replace('Rows_examined:', '').trim()
      }
    } else if (state === 'queryTime') {
      if (line.startsWith('SET timestamp=')) {
        result.timestamp = line.replace('SET timestamp=', '').trim()
        state = 'timestamp'
      }
    } else if (state === 'timestamp') {
      if (line.startsWith('SELECT') || line.startsWith('select')) {
        sql = line
        state = 'sql'
      } else {
        // 有些sql语句是CREATE TABLE,回到start状态
        state = 'start'
      }
    } else if (state === 'sql') {
      if (line.startsWith('# Time:')) {
        // 一条sql语句解析完，把sql语句加入result
        result.sql = sql
        results.push(result)
        // 重新开始
        result = {}
        result.time = line.replace('# Time:', '').trim()
        result.time = new Date(result.time).toLocaleString()
        state = 'time'
      } else {
        // sql语句可能有多行
        sql += line
      }
    }
  }
  // 按roseSent排序
  results.sort((a, b) => {
    return b.rowsSent - a.rowsSent
  })
  // 把results转换为字符串，一行一个对象
  let str = ''
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    // 对象属性用逗号分割，不要属性名
    // str += `${result.time},${result.user},${result.queryTime},${result.lockTime},${result.rowsSent},${result.rowsExamined},${result.sql}` + '\n'
    str += `${result.time},${result.rowsSent},${result.rowsExamined},${result.sql}` + '\n'
  }
  return str
}
