<template>
  <el-container>
    <el-main>
      <html>
      <body>
      <header>
        <div class="logo">
          <!--          <h2>我的任务</h2>-->
        </div>
      </header>
      <navigation></navigation>
      <el-divider></el-divider>
      <div class="memos">
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="名字">
            <el-input placeholder="" size="medium" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input type="input" v-model="user.contact"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input placeholder="" autosize type="textarea" size="medium" v-model="user.address"></el-input>
          </el-form-item>
          <el-form-item label="金币数">
            <div class="my-coin" style="max-height: none;"><p>{{ user.coins }} <i class="el-icon-coin"></i></p></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateMyInfo()">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
      </body>
      </html>

    </el-main>
  </el-container>
</template>
<script>
import navigation from './navigation.vue'

export default {
  name: 'mine',
  components: {navigation},
  data() {
    return {
      user: {
        name: '',
        avatar: '',
        address: '',
        contact: '',
        coins: 0
      }
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    loadPage() {
      let userID = this.$route.query.id
      this.axios.get(process.env.BACKEND_HOST + '/api/legwork/mine?id=' + userID).then(response => {
        if (response.data.code !== 0) {
          this.$message(response.data.msg)
        } else {
          this.user = response.data.data
        }
      }).catch(function (error) { // 请求失败处理
        this.$message('服务端出错')
        console.log(error)
      })
    },
    updateMyInfo() {
      let userID = this.$route.query.id
      this.axios.post(process.env.BACKEND_HOST + '/api/legwork/mine?id=' + userID,
        this.user).then(data => {
        if (data.data.code === 0) {
          console.log(data)
          this.$message('修改成功')
        } else {
          console.log(data)
          this.$message('修改失败: ' + data.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>
<style type="text/css">
.my-coin {
  width: 4rem;
}
* {
  margin: 0;
  padding: 0;
}

body {
  background: #fafafa;
}

/*header .logo {*/
/*  text-align: center;*/
/*  border-bottom: 1px solid #efefef;*/
/*}*/

header .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .logo,
header .top .user {
  /*padding: 40px 0;*/
}

header .top .user .name {
  color: #454545;
  font-size: 16px;
}

header .top .user .date {
  font-size: 12px;
  color: #9d9d9d;
}

header .top .filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header .top .filter button {
  padding: 9px 10px;
  background: #30cf79;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  border: none;
  cursor: pointer;
}

header,
html {
  font-size: 16px;
}

.memos {
  width: 23rem;
  margin: 0 auto;
}

.memos h1 {
  margin-top: 30px;
}

.memo {
  margin: 20px 0;
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  word-wrap: break-word;
}

.memo:hover {
  box-shadow: 0px 2px 10px #dddddd;
}

.memo div {
  text-align: left;
}

.memo .time {
  color: #8d8d8d;
  font-size: 12px;
}

.memo .content {
  color: #323232;
  font-size: 14px;
}

.memo .content p {
  line-height: 1.8;
  min-height: 20px;
  margin: 0;
  white-space: pre-line;
}

.memo .content ul,
.memo .content ol {
  padding-inline-start: 20px;
  margin: 0;
}

.memo .content li {
  line-height: 1.8;
}

.memo .files img {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin: 6px 0;
}
</style>
<style>
.custom-select {
  position: relative;
  font-size: 14px;
  color: #9d9d9d;
  background: #efefef;
  border-radius: 3px;
  border: none;
  margin-right: 10px;
}

.custom-select select {
  display: none;
}

.select-selected {
  /* background-color: DodgerBlue; */
  background: #efefef;
  color: #9d9d9d;
}

.select-selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #7d7d7d transparent transparent transparent;
}

.select-selected.select-arrow-active:after {
  border-color: transparent transparent #7d7d7d transparent;
  top: 7px;
}

.select-items div,
.select-selected {
  color: rgba(157, 157, 157, 1);
  padding: 9px 12px;
  font-size: 14px;
  color: #9d9d9d;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  width: 120px;
  user-select: none;
}

.select-items {
  position: absolute;
  background-color: white;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0px 4px 2px #dddddd;
}

.select-items::-webkit-scrollbar {
  width: 5px;
}

.select-items::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.select-items::-webkit-scrollbar-thumb {
  background: #888;
}

.select-hide {
  display: none;
}

.select-items div:hover,
.same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
