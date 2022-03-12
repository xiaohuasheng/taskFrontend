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
    convert2UpperCase(str) {
      let arr = ['is', 'are', 'of', 'a', 'above', 'an', 'an', 'and', 'and', 'at', 'before', 'behind', 'but', 'but', 'for', 'from', 'in', 'in', 'on', 'on', 'or', 'the', 'the']
      let ss = str.toLowerCase().split(/\s+/)
      for (let i = 0; i < ss.length; i++) {
        let word = ss[i].toLowerCase()
        if (arr.includes(word)) {
          continue
        }
        ss[i] = ss[i].slice(0, 1).toUpperCase() + ss[i].slice(1)
      }
      return ss.join(' ')
    },
    onSubmit() {
      if (this.form.words.length <= 0) {
        return
      }
      let s = this.form.words
      let ss = s.split('\n')
      let res = []
      for (let i = 0; i < ss.length; i++) {
        ss[i] = this.convert2UpperCase(ss[i].trim())
        res.push(ss[i])
      }
      this.form.wordsResult = res.join('\n')
    }
  }
}
</script>
