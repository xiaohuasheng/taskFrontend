/* eslint-disable no-extra-semi */

// 输入：创建工作项的模板、团队的状态、要求哪天的工作项的状态是什么
// 输出，创建工作项的json、流转状态的SQL

/* 比如, 输入是
2021-08-25 待处理
2021-08-27 处理中
 */

/* 分两个函数处理，函数generateTask输出创建工作项的json
函数generateStatusHistory输出流转状态的SQL

 */
export function generateTask(template, dateStatus, teamUUID, teamStatus) {
  // 把dateStatus转换成map，格式如下，先按行分割，再按空格分割
  /*
2021-08-25 待处理
2021-08-25 待处理
2021-08-26 待处理
2021-08-26 待处理
2021-08-27 处理中
2021-08-27 处理中
  * */
  // 同一天的状态，会被覆盖，用数组存储
  let dates = []
  let statuses = []
  // dateStatus 前后去掉空行、空格
  dateStatus = dateStatus.trim()
  dateStatus.split('\n').forEach((line) => {
    // console.log(line)
    let arr = line.split(' ')
    if (arr.length === 0) {
      return
    }
    let date = ''
    let statusArr = []
    if (arr.length >= 2) {
      // 2021-08-25 待处理 2021-08-27 处理中 2021-08-29 处理中 2021-08-31 已解决
      date = arr[0]
      statusArr = arr
      console.log('here1')
      // 去掉状态前后的空格
    } else {
      date = arr[0]
    }
    // date 转换成时间戳
    date = new Date(date).getTime() / 1000
    dates.push(date)
    statuses.push(statusArr)
  })
  // dateStatusMap 取出所有的key，即时间戳
  console.log(getLastWeekend())
  let input = JSON.parse(template)

  let taskTemplate = input.tasks[0]
  const owner = input.tasks[0].owner
  let tasks = []
  dates.forEach((createTime, i) => {
    let newTask = Object.assign({}, taskTemplate)
    newTask.uuid = owner + generateUUID()
    newTask.summary = getSummary(createTime)
    newTask.create_time = createTime
    tasks.push(newTask)
  })
  input.tasks = tasks
  // 遍历tasks，生成SQL
  let jsonString = JSON.stringify(input)
  console.log(jsonString)
  let sql = generateStatusHistory(tasks, dates, statuses, teamUUID, teamStatus)
  // 包装一下，返回json和sql
  return {
    json: jsonString,
    sql: sql
  }
}

function generateStatusHistory(tasks, dates, statues, teamUUID, teamStatus) {
  if (tasks.length === 0 || dates.length === 0 || statues.length === 0 || teamUUID === '' || teamStatus === '') {
    return ''
  }
  let input = JSON.parse(teamStatus)
  let teamStatusMap = new Map()
  input.task_status.task_statuses.forEach((status) => {
    // console.log(status)
    teamStatusMap.set(status.name, status.uuid)
  })
  console.log(teamStatusMap)
  // 遍历tasks，生成SQL
  let sql = ''
  tasks.forEach((task, i) => {
    // let createTime = task.create_time
    if (statues[i].length === 0) {
      console.log('here?')
      return
    }
    let tempSql = generateHistorySql(teamUUID, task.uuid, convertTo2DArray(statues[i]), teamStatusMap)
    sql += tempSql + '\n'
  })
  return sql
}

// 获取最近一个周末的时间戳
function getLastWeekend() {
  const now = new Date()
  const today = now.getDay()
  const lastSunday = new Date(now)
  lastSunday.setDate(now.getDate() - today)
  const lastSundayTimestamp = lastSunday.getTime()

  // 如果上个周日在今天之后，说明今天就是周日，返回今天的时间戳
  if (lastSundayTimestamp > now.getTime()) {
    return now.getTime()
  }

  // 上个周日在今天之前，则返回上个周日的时间戳
  return lastSundayTimestamp
}

// 根据 create_time 返回相应的 summary
function getSummary(createTime) {
  const today = Math.floor(Date.now() / 1000)
  const days = Math.floor((today - createTime) / (24 * 60 * 60))
  if (days === 0) {
    return 'today'
  } else if (days === 3) {
    return 'three days ago'
  } else if (days <= 7) {
    return 'last week'
  } else if (days <= 40) {
    return '40 days ago'
  } else {
    let d = new Date(createTime * 1000)
    // 转换成日期字符串
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }
}

// 生成uuid, 8个字符，每个字符是 A-Z 或 a-z 或 0-9
function generateUUID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let uuid = ''
  for (let i = 0; i < 8; i++) {
    uuid += chars[Math.floor(Math.random() * chars.length)]
  }
  return uuid
}

/*
生成状态变化记录的SQL
输入：
[2021-08-25 待处理 2021-08-27 处理中 2021-08-29 已解决 2021-08-31 已关单]
输出：
insert into field_value_history(team_uuid, task_uuid, field_uuid, type, value, valid_from, valid_to) values('team_uuid1', 'task_uuid1', 'field005', 12, '待处理', '2021-08-25', '2021-08-27');
insert into field_value_history(team_uuid, task_uuid, field_uuid, type, value, valid_from, valid_to) values('team_uuid1', 'task_uuid1', 'field005', 12, '处理中', '2021-08-27', '2021-08-29');
insert into field_value_history(team_uuid, task_uuid, field_uuid, type, value, valid_from, valid_to) values('team_uuid1', 'task_uuid1', 'field005', 12, '已解决', '2021-08-29', '2021-08-31');
insert into field_value_history(team_uuid, task_uuid, field_uuid, type, value, valid_from, valid_to) values('team_uuid1', 'task_uuid1', 'field005', 12, '已关单', '2021-08-29', null);
其中, valid_from 是状态开始的时间，valid_to 是状态结束的时间，如果是最后一个状态，则 valid_to 为 null
* */

function generateHistorySql(teamUUID, taskUUID, statusList, teamStatusMap) {
  // statusList = [['2021-08-25', '待处理'], ['2021-08-27', '处理中'], ['2021-08-29', '已解决'], ['2021-08-31', '已关单']]
  let sql = ''
  let validTo = null
  for (let i = 0; i < statusList.length; i++) {
    let status = statusList[i]
    let validFrom = status[0]
    let statusName = status[1]
    validTo = i === statusList.length - 1 ? 'null' : `'${statusList[i + 1][0]}'`
    console.log(statusName, validFrom, validTo)
    if (statusName === '') {
      continue
    }
    let statusUUID = teamStatusMap.get(statusName.trim())
    let validFromTime = new Date(validFrom).getTime() / 1000
    let validToTime = validTo === 'null' ? null : new Date(validTo).getTime() / 1000
    sql += `insert into field_value_history values('${teamUUID}', '${taskUUID}', 'field005', 12, '${statusUUID}', ${validFromTime}, ${validToTime});\n`
  }
  if (statusList.length > 0) {
    // 取最后一个状态，作为当前状态
    let lastStatus = statusList[statusList.length - 1]
    let lastStatusName = lastStatus[1]
    let lastStatusUUID = teamStatusMap.get(lastStatusName.trim())
    // update task set status_uuid='7no98B4k' where uuid='H43q7Zh5a5tAOjue';
    sql += `update task set status_uuid='${lastStatusUUID}' where uuid='${taskUUID}';\n`
  }
  if (sql.length > 0) {
    sql = `delete from field_value_history where team_uuid = '${teamUUID}' and task_uuid = '${taskUUID}' and field_uuid = 'field005';\n${sql}`
  }
  return sql
}

/*
转换成二维数组
输入：[2021-08-25, 待处理, 2021-08-27, 处理中, 2021-08-31, 已解决]
输出：[['2021-08-25', '待处理'], ['2021-08-27', '处理中'], ['2021-08-31', '已解决']]
* */
function convertTo2DArray(arr) {
  let result = []
  for (let i = 0; i < arr.length; i += 2) {
    result.push([arr[i], arr[i + 1]])
  }
  return result
}
