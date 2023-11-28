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
            <el-button v-if="!scene" round size="mini" @click="acceptTask(think)">领取</el-button>
            <el-button v-if="scene==='accepted' || scene==='issued'" round size="mini" disabled>{{think.status}}</el-button>
          </div>
        </div>
        <div class="content">
          <div class="richText" style="max-height: none;">
            <el-link  v-if="scene==='issued' && think.status==='已发布'" type="primary" :href="'/#/legwork/task/detail?task_id='+ think.taskID +'&id=' + $route.query.id">点击修改</el-link>
          </div>
          <div class="richText" style="max-height: none;"><p>描述：{{ think.description }}</p></div>
          <div class="richText" style="max-height: none;"><p>起点: {{ think.startingPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>终点: {{ think.endPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>奖励: {{ think.reward }} <i class="el-icon-coin"></i></p></div>
          <div v-if="scene==='accepted' || scene==='issued'" class="richText" style="max-height: none;"><p>联系方式: {{ think.contact }}</p></div>
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
    },
    scene: ''
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
