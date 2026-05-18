<template>
  <div class="think-login">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>Think 登录</span>
      </div>
      <el-form @submit.native.prevent="submitLogin">
        <el-form-item>
          <el-input
            v-model.trim="form.username"
            autocomplete="username"
            placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            autocomplete="current-password"
            placeholder="密码"
            show-password
            type="password">
          </el-input>
        </el-form-item>
        <el-button :loading="loading" type="primary" @click="submitLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'thinkLogin',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin() {
      if (!this.form.username || !this.form.password) {
        this.$message.warning('请输入用户名和密码')
        return
      }
      this.loading = true
      this.axios.post(process.env.BACKEND_HOST + '/api/think/auth', this.form).then((response) => {
        if (response.data.code !== 0) {
          this.$message.error(response.data.msg || '登录失败')
          return
        }
        const redirect = this.$route.query.redirect || '/think'
        this.$router.replace(redirect)
      }).catch((error) => {
        const message = error.response && error.response.data && error.response.data.msg
        this.$message.error(message || '登录失败')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.think-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #f3f7ff 0%, #eefaf3 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
}

.el-button {
  width: 100%;
}
</style>
