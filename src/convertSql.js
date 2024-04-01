export function sqlConvert2(data) {
  if (data.length <= 0) {
    return
  }
  // 切割日志，分离 SQL 模板和参数
  const parts = data.split('|')
  const sqlTemplate = parts[0].trim()
  const params = parts[1]

  // 提取参数列表
  const paramList = params.slice(1, -1).split(' ')

  // 填充 SQL 模板中的参数
  return sqlTemplate.replace(/\?/g, () => {
    const param = paramList.shift()
    return isNaN(param) ? `'${param}'` : param
  })
}
