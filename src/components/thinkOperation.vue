<template>
  <div class="memo">
    <div class="safari normal">
      <div class="display no_fold">
        <div class="header" style="
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
"><a class="time"><span>{{ think.create_time }}</span></a>
          <div>
              <!--          编辑-->
              <div @click="openDialog(think)" class="tools" style="
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                                            </button>
                </span>
                </span>
              </div>
              <!--          删除-->
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
        </div>
        <div>
          <!-- 点击编辑按钮触发 openDialog 方法 -->
          <el-dialog :visible.sync="dialogVisible" title="编辑笔记" @close="closeDialog" width="80%">
            <el-input autosize type="textarea" size="medium" v-model="editedThink.content" placeholder="请输入笔记内容"></el-input>
            <!-- 保存和取消按钮 -->
            <span slot="footer" class="dialog-footer">
                  <el-button @click="closeDialog">取消</el-button>
                  <el-button @click="saveNote" type="primary">保存</el-button>
                </span>
          </el-dialog>
        </div>
<!--        内容-->
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
      voiceActive: null,
      dialogVisible: false, // 控制弹窗显示/隐藏
      editedThink: {
        content: ''
      }
    }
  },
  methods: {
    openDialog(think) {
      this.editedThink = { ...think }
      this.dialogVisible = true
    },
    closeDialog() {
      // 关闭弹窗时重置编辑内容
      this.editedThink = {
        content: ''
      }
      this.dialogVisible = false
    },
    saveNote() {
      this.updateThink(this.editedThink)
    },
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
    updateThink(think) {
      console.log(think)
      let authID = this.$route.query.id
      this.axios.post(process.env.BACKEND_HOST + '/api/think?id=' +
        authID + '&think_id=' + think.id, {
        content: think.content
      }).then(data => {
        if (data.data.data) {
          this.$message('更新成功')
          // 关闭弹窗
          this.closeDialog()
          this.think.content = think.content
        } else {
          this.$message('更新失败')
          console.log(data)
        }
      }).catch(function (error) {
        // 请求失败处理
        console.log(error)
      })
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
.tools {
  float: left;
  margin-right: 0.5rem;
}
</style>
