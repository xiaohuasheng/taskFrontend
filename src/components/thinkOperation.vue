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
<!--              https://iconsvg.xyz/-->
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
        <div v-if="think.type === 'text' || think.type === 'voice'" class="content">
          <div class="richText" style="max-height: none;"><p>{{ think.content }}</p></div>
        </div>
        <div v-if="think.type === 'image'" class="content">
          <div class="images" v-viewer="{movable: false}">
            <img :src="process.env.BACKEND_HOST + '/api/media?id=' + think.media_id" width="100" height="100">
          </div>
        </div>
        <div class="content" v-if="think.type === 'voice'" @click="openRecording(think.media_id)"
             style="cursor: pointer">
          <div class="voice">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var BenzAMRRecorder = require('benz-amr-recorder')
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
      playRec: null,
      voiceActive: null
    }
  },
  methods: {
    openRecording(mediaID) {
      let url = process.env.BACKEND_HOST + '/api/media?type=voice&id=' + mediaID
      let vm = this
      console.log('open recording')
      if (vm.playRec !== null && vm.playRec.isPlaying()) {
        console.log('enter stop play')
        vm.stopPlayVoice()
        return
      }
      vm.playRec = new BenzAMRRecorder()
      vm.playRec.initWithUrl(url).then(function () {
        vm.playRec.play()
        vm.playRec.onEnded(function () {
          vm.voiceActive = null
        })
      }).catch((e) => {
        console.log(e)
        vm.$message.error('播放录音失败')
      })
    },
    stopPlayVoice() {
      if (this.playRec.isPlaying()) {
        console.log('stop play')
        this.playRec.stop()
      }
      this.playRec = null
    },
    deleteThink(think) {
      // 截取 think.content 的前 10 个字符
      let content = think.content.substring(0, 10)
      let r = confirm('确定要删除' + content + '吗?')
      if (r) {
        let authID = this.$route.query.id
        this.axios.delete(process.env.BACKEND_HOST + '/api/think?id=' +
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
