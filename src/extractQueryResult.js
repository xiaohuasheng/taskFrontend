/**
│ CAGTz7QLHWjkhaEr │
└──────────────────┘
┌─uuid─────────────┐
│ CAGTz7QL57xbgye5 │
│ CAGTz7QL8WoXXgqi │
│ CAGTz7QLN5wrMxGn │
│ GRGmKAhwqMT3Vqlw │
 * */
// extract sql query result to array, like above, the result is string that length is 16, some row have but some row not have
export function extractQueryResult(queryResult) {
  const result = [];
  queryResult.forEach((row) => {
    const rowKeys = Object.keys(row)
    rowKeys.forEach((key) => {
      if (row[key] && row[key].length === 16) {
        result.push(row[key])
      }
    })
  })
  return result
}
