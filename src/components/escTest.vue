<template>
  <div id="app">
    <div class="chat-container">
      <div v-for="(message, index) in messages" :key="index" class="message-text-container">
        <div class="message-text"  :class="[message.type]">
          {{ message.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'escTest',
  data() {
    return {
      messages: [
        { text: 'Hello!(Optional) We are always working on improving our offerings. Please take this quick survey to tell us about your needs to create a successful Azure OpenAI Service: AOAI (qualtrics.com)', type: 'received' },
        { text: 'Arenas \nallocate large chunks of memory for Go values, so theyre likely to\n' +
            'be inefficient for allocating only small amounts of small Go values.',
          type: 'sent' },
        { text: 'How are you?', type: 'received' },
        { text: "I'm good, thanks!", type: 'sent' },
        { text: 'What about you?', type: 'sent' },
        { text: "I'm fine too.", type: 'received' }
      ],
      drawerVisible: true,
      currentImage: {
        url: 'https://www.baidu.com/img/flexible/logo/pc/result.png'
      },
      direction: 'rtl',
      visible: false,
      innervisible: false,
      tableData: [
        {userName: '张三', password: 'zhangsan'},
        {userName: '李四', password: 'lisi'}
      ],
      formData: {},
      image: {
        src: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
        srcList: [
          'https://www.baidu.com/img/flexible/logo/pc/result.png',
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.visible = false
      // this.$confirm('确定退出吗？').then(_ => {
      //   this.visible = false
      //   done()
      // }).catch(_ => {
      // })
    },
    showDetail(row) {
      this.innervisible = true
      this.formData = row
    },
    showTable() {
      this.visible = true
    },
    showDrawer() {
      console.log('showDrawer')
      this.drawerVisible = true
    },
    closeDrawer(done) {
      // 阻止默认的关闭行为
      done(false)
    },
    onClose() {
      // 处理自定义关闭逻辑
      console.log('drawer onClose')
    },
    closeImage() {
      console.log('image onClose')
    }
  }
}
</script>

<style>
.message-text-container {
  width: 300px;
  background-color: #5daf34;
  margin: 5px;
}
.message-text {
  width: 70%;
  max-width: 100%;
  text-align: left;
  margin-top: 5px;
}
.chat-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: yellow;
}
.received {
  background-color: #e5e5ea;
  float: left;
}
.sent {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
  float: right;
}
</style>
