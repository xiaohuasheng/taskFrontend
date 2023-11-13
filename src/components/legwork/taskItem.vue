<template>
  <div class="memo">
    <div class="safari normal">
      <div class="display no_fold">
        <div class="header" style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
"><a class="time"><span>{{ think.createTime }}</span></a>
          <div style="margin-right: 1rem">
            <el-button round size="mini" @click="acceptTask(think)">领取</el-button>
          </div>
        </div>
        <div class="content">
          <div class="richText" style="max-height: none;"><p>{{ think.description }}</p></div>
          <div class="richText" style="max-height: none;"><p>ID: {{ think.taskID}}</p></div>
          <div class="richText" style="max-height: none;"><p>起点: {{ think.startingPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>终点: {{ think.endPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>奖励: {{ think.reward }} <i class="el-icon-coin"></i></p></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskItem',
  props: {
    think: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      playRec: null,
      voiceActive: null
    }
  },
  methods: {
    acceptTask(think) {
      // 截取 think.content 的前 10 个字符
      let content = think.description.substring(0, 10)
      let r = confirm('确定要领取任务' + content + '吗?')
      if (r) {
        let userID = this.$route.query.id
        this.axios.post(process.env.BACKEND_HOST + '/api/legwork/accept_task/' + think.taskID + '?id=' + userID)
          .then(data => {
          if (data.data.code === 0) {
            this.$message(data.data.msg)
          } else {
            this.$message('领取失败，' + data.data.msg)
            console.log(data)
          }
        }).catch(function (error) {
          // 请求失败处理
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
