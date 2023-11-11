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
          <div @click="acceptTask(think)" class="tools" style="
    width: 16px;
    height: 16px;
    fill: currentcolor;
"><span><span class="el-popover__reference-wrapper">
            <button aria-describedby="el-popover-2646"
                    tabindex="0"
                    class="el-popover__reference" style="
    cursor: pointer;
    border: none;
    background: transparent;
    color: #7d7d7d;
    font-size: 14px;
">
<!--              https://iconsvg.xyz/-->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25c911" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
            </button>
          </span>
          </span>
          </div>
        </div>
        <div class="content">
          <div class="richText" style="max-height: none;"><p>{{ think.description }}</p></div>
          <div class="richText" style="max-height: none;"><p>ID: {{ think.taskID}}</p></div>
          <div class="richText" style="max-height: none;"><p>起点: {{ think.startingPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>终点: {{ think.endPoint }}</p></div>
          <div class="richText" style="max-height: none;"><p>奖励: {{ think.reward }}<svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 24 24" fill="none" stroke="#f5e505" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></p></div>
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
