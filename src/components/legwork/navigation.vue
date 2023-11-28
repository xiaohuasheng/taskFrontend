<template>
  <div class="memos">
    <div>
      <el-link type="primary" :href="'/#/legwork/mine?id=' + $route.query.id">我的主页</el-link>
      <el-link type="primary" :href="'/#/legwork/task?id=' + $route.query.id">待领取的</el-link>
      <el-link type="primary" :href="'/#/legwork/accepted-task?id=' + $route.query.id">我领取的</el-link>
      <el-link type="primary" :href="'/#/legwork/issued-task?id=' + $route.query.id">我发布的</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
