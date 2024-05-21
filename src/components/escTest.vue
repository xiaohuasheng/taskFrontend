<template>
  <div id="app">
    <el-radio-group v-model="direction">
      <el-radio label='ltr'>左边</el-radio>
      <el-radio label='rtl'>右边</el-radio>
      <el-radio label='ttb'>上边</el-radio>
      <el-radio label="btt">下边</el-radio>
    </el-radio-group>
    <el-button @click='showTable'>显示抽屉表格</el-button>
    <el-drawer title="抽屉表格" :visible.sync="visible" :direction="direction"
      :before-close="handleClose"
    >
      <el-image
        style="width: 100px; height: 100px"
        class="image-container"
        :src="image.src"
        :preview-src-list="image.srcList"
      ></el-image>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'escTest',
  data() {
    return {
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
