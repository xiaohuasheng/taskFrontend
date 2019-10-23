<style>
  .class1 {
    background: #444;
    color: #eee;
  }

  .row {
    width: 100%;
    margin-bottom: 5px;
  }

  .block {
    display: inline-block;
    margin-right: 5px;
  }

  .row > .block:last-child {
    border-left: 1px #444444 solid;
  }

  .a_table {
    width: 98%;
    margin: 0 auto;
    height: auto;
  }
</style>
<template>
  <div class="hello">
    <table border="1" class="a_table">
      <tr>
        <td>
          <div>
            <div v-for="task in note1" v-bind:key="task.id">
              {{ task.name }}
            </div>
          </div>
        </td>
        <td>row 1, cell 2</td>
      </tr>
      <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        info: null,
        note1: [
          {
            id: 1,
            name: '吃饭'
          },
          {
            id: 2,
            name: '玩游戏'
          },
          {
            id: 3,
            name: '睡觉'
          },
          {
            id: 4,
            name: '学习'
          }
        ],
        note2: 'two',
        note3: 'three',
        note4: 'four'
      }
    },
    mounted () {
      this.axios.post('http://192.168.3.97:9999/form', {
        username: 'Fred',
        password: 'Flintstone'
      }).then(response => (this.info = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  }
</script>
