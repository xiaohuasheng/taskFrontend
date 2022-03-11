<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="单词列表">
      <el-input autosize type="textarea" size="medium" v-model="form.words"></el-input>
      <el-input autosize type="textarea" size="medium" v-model="form.wordsResult"></el-input>
      <el-button type="primary" @click="onSubmit()">转换</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'WorkUtils',
  data() {
    return {
      form: {
        words: '',
        wordsResult: ''
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.form.words.length <= 0) {
        return
      }
      let s = this.form.words
      let ss = s.split('\n')
      let sWithPrefix = []
      for (let i = 0; i < ss.length; i++) {
        ss[i] = ss[i].trim()
        ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1)
        sWithPrefix.push(ss[i])
      }
      this.form.wordsResult = sWithPrefix.join('\n')
    }
  }
}
</script>
