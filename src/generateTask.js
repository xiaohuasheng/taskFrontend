/* eslint-disable no-extra-semi */

export function generateTask(template) {
  let input = JSON.parse(template)

  let taskTemplate = input.tasks[0]
  const uuidBase = input.tasks[0].uuid
  const createTimes = [
    // Math.floor(Date.now() / 1000), // 今天
    Math.floor((Date.now() - 3 * 24 * 60 * 60 * 1000) / 1000), // 3天前
    Math.floor(getLastWeekend() / 1000), // 最近一个周末
    Math.floor((Date.now() - 40 * 24 * 60 * 60 * 1000) / 1000), // 40天前
    Math.floor((Date.now() - 100 * 24 * 60 * 60 * 1000) / 1000) // 100天前
  ]

  let tasks = []
  createTimes.forEach((createTime, i) => {
    let newTask = Object.assign({}, taskTemplate)
    let lastChar = uuidBase.charCodeAt(uuidBase.length - 1)
    // 如果 lastChar 是 'B', newLastChar就变成了], 如何解决？期望是 'C'
    // 先判断是大写还是小写，然后再进行计算
    let newLastChar = String.fromCharCode((lastChar - 65 + i + 1) % 26 + 65)
    if (lastChar >= 97) {
      // 小写
      newLastChar = String.fromCharCode((lastChar - 97 + i + 1) % 26 + 97)
    }
    newTask.uuid = uuidBase.substring(0, uuidBase.length - 1) + newLastChar
    newTask.summary = getSummary(createTime)
    newTask.create_time = createTime
    tasks.push(newTask)
  })
  input.tasks = tasks
  let jsonString = JSON.stringify(input)
  return jsonString
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
    return '100 days ago'
  }
}
