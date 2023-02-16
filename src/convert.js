/**
[INFO] 2023-02-16 18:55:09 /app/models/db/es.go:32 POST /ones_project/task/_search HTTP/1.1
Host: 127.0.0.1:9200
User-Agent: elastic/3.0.56 (linux-amd64)
Transfer-Encoding: chunked
Accept: application/json
Authorization: Basic b25lc2VzOkVzUGFzc3dk
Content-Type: application/json
Accept-Encoding: gzip

700
{"aggregations":{"0-0":{"aggregations":{"0-1":{"aggregations":{"0-2":{"aggregations":{"1-0":{"aggregations":{"1-1":{"reverse_nested":{}}},"filters":{"filters":[{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1675872000,"t":1675958399}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1675958400,"t":1676044799}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676044800,"t":1676131199}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676131200,"t":1676217599}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676217600,"t":1676303999}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676304000,"t":1676390399}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676390400,"t":1676476799}}}},{"script":{"script":{"file":"field_trend_report_filter","params":{"fuuid":"field005","start":1676476800,"t":1676563199}}}}]}}},"terms":{"field":"field_value_history.value","min_doc_count":1,"order":{"_term":"asc"},"size":0}}},"filter":{"bool":{"must":{"term":{"field_value_history.field_uuid":"field005"}}}}}},"nested":{"path":"field_value_history"}}},"query":{"bool":{"filter":[{"term":{"project_uuid":"CAGTz7QLKMCnjFZk"}},{"bool":{"must":[{"bool":{"must":{"terms":{"project_uuid":["CAGTz7QLKMCnjFZk"]}}}},{"bool":{"minimum_should_match":"1","should":{"bool":{"must":[{"terms":{"issue_type_uuid":["8HwRmgbH"]}},{"bool":{"must_not":{"terms":{"sub_issue_type_uuid":["KBYRYdUN","HgtqcbZN"]}}}}]}}}}]}},{"term":{"team_uuid":"Lf621zTU"}},{"terms":{"status":[1]}}]}},"size":0}
0

[INFO] 2023-02-16 18:55:09 /app/models/db/es.go:32 HTTP/1.1 200 OK
Content-Length: 973
Content-Type: application/json charset=UTF-8

{"took":6,"timed_out":false,"_shards":{"total":6,"successful":6,"failed":0},"hits":{"total":5,"max_score":0.0,"hits":[]},"aggregations":{"0-0":{"doc_count":86,"0-1":{"doc_count":6,"0-2":{"doc_count_error_upper_bound":0,"sum_other_doc_count":0,"buckets":[{"key":"AVwc1sBb","doc_count":5,"1-0":{"buckets":[{"doc_count":3,"1-1":{"doc_count":3}},{"doc_count":3,"1-1":{"doc_count":3}},{"doc_count":3,"1-1":{"doc_count":3}},{"doc_count":3,"1-1":{"doc_count":3}},{"doc_count":3,"1-1":{"doc_count":3}},{"doc_count":4,"1-1":{"doc_count":4}},{"doc_count":4,"1-1":{"doc_count":4}},{"doc_count":4,"1-1":{"doc_count":4}}]}},{"key":"Li7Rszze","doc_count":1,"1-0":{"buckets":[{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}},{"doc_count":1,"1-1":{"doc_count":1}}]}}]}}}}}

*/

export function convertLogToCurlCommand(log) {
  // generate curl command
  const curlCommand = []
  curlCommand.push('curl')
  curlCommand.push('-X')

  let method = findMethod(log)
  console.log(method)
  curlCommand.push(method)
  curlCommand.push('http://' + findHost(log) + findEsIndex(log) + '?pretty')
  curlCommand.push('-H')
  curlCommand.push('"Content-Type: application/json"')
  curlCommand.push('-d')
  curlCommand.push("'" + findEsQuery(log) + "'")
  return curlCommand.join(' ')
}

function findMethod(log) {
  const lines = log.split('\n')
  const methodLine = lines.find(line => line.indexOf('POST') > -1)
  console.log(methodLine)
  if (!methodLine) {
    return ''
  }
  return methodLine.split(' ')[4]
}

function findHost(log) {
  const lines = log.split('\n')
  const hostLine = lines.find(line => line.startsWith('Host:'))
  if (!hostLine) {
    return ''
  }
  return hostLine.split(' ')[1]
}

function findEsIndex(log) {
  const lines = log.split('\n')
  const indexLine = lines.find(line => line.indexOf('POST'))
  if (!indexLine) {
    return ''
  }
  console.log('indexLine', indexLine)
  return indexLine.split(' ')[5]
}

function findEsQuery(log) {
  const lines = log.split('\n')
  const queryLine = lines.find(line => line.startsWith('{'))
  if (!queryLine) {
    return ''
  }
  return queryLine
}
