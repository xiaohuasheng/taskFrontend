<template>
  <el-container>
    <el-main>
      <div class="execution-area">
        <el-button type="primary" @click="executeCommand" :disabled="isLoading">执行指令</el-button>
        <div class="result-area">
          <template v-if="!isLoading && result !== null">
            <el-input autosize type="textarea" size="medium" v-model="result"></el-input>
          </template>
          <template v-if="isLoading">
            <p>正在加载结果...</p>
          </template>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'exec',
  data() {
    return {
      isLoading: false,
      result: null,
      intervalId: null
    }
  },
  methods: {
    executeCommand() {
      // 调用执行指令的接口
      this.isLoading = true
      this.result = null
      // 模拟执行指令的接口调用
      this.axios.post(process.env.BACKEND_HOST + '/api/exec').then(data => {
        if (data.data.output_file) {
          // 启动轮询
          this.startPolling(data.data.output_file)
        } else {
          this.$message('运行失败')
          this.isLoading = false
          console.log(data)
        }
      }).catch(function (error) {
        // 请求失败处理
        this.isLoading = false
        console.log(error)
      })
    },
    fetchResult(filePath) {
      // 调用读取结果的接口
      console.log('fetchResult')
      this.axios.get(process.env.BACKEND_HOST + '/api/exec?file_path=' + filePath).then(data => {
        if (data.data.error === '') {
          this.isLoading = false
          if (data.data.content !== '') {
            this.result = data.data.content
          }
        } else if (data.data.error === 'finish') {
          this.stopPolling()
        } else {
          this.$message('读取结果失败')
          this.stopPolling()
        }
      }).catch(function (error) {
        // 请求失败处理
        this.stopPolling()
        console.log(error)
      })
    },
    startPolling(filePath) {
      // 开始轮询
      this.intervalId = setInterval(() => {
        this.fetchResult(filePath)
      }, 1000)
    },
    stopPolling() {
      // 停止轮询
      clearInterval(this.intervalId)
    }
  },
  beforeDestroy() {
    // 在组件销毁前停止轮询
    this.stopPolling()
  }
}
</script>

<style scoped>
.execution-area {
  margin-top: 20px;
}

.result-area {
  margin-top: 10px;
}
</style>
