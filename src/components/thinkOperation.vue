<template>
  <div class="memo">
    <div class="safari normal">
      <div class="display no_fold">
        <div class="header" style="
    display: flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
"><a class="time"><span>{{ think.create_time }}</span></a>
          <div @click="deleteThink(think)" class="tools" style="
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
<!--              <svg width="16px" height="16px" viewBox="0 0 16 16" fill="currentColor"-->
              <!--                   xmlns="http://www.w3.org/2000/svg">-->
              <!--                    <path fill-rule="evenodd"-->
              <!--                          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">-->
              <!--                    </path>-->
              <!--            </svg>-->
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6"
                                                                                                          x2="6"
                                                                                                          y2="18"></line><line
                x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </span>
          </span>
          </div>
        </div>
        <div v-if="think.type === 'text'" class="content">
          <div class="richText" style="max-height: none;"><p>{{ think.content }}</p></div>
        </div>
        <div v-if="think.type === 'image'" class="content">
          <div class="images" v-viewer="{movable: false}">
            <img :src="'http://task.xiaohuasheng.cc/api/media?id=' + think.media_id" width="100" height="100">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thinkOperation',
  props: {
    think: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    deleteThink(think) {
      // 截取 think.content 的前 10 个字符
      let content = think.content.substring(0, 10)
      let r = confirm('确定要删除' + content + '吗?')
      if (r) {
        let authID = this.$route.query.id
        this.axios.delete('http://task.xiaohuasheng.cc/api/think?id=' +
          authID + '&think_id=' + think.id).then(data => {
          if (data.data.data) {
            this.$message('删除成功')
          } else {
            this.$message('删除失败')
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
