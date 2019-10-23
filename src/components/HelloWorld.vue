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

  .a_table td {
    border: 1px solid #d6d6d6;
  }

  .a_table td div {
    margin: 5px;
    padding: 5px;
    border: 1px solid #ffecec;
  }
</style>
<template>
  <div class="hello">
    <table class="a_table">
      <tr>
        <td>
          <div>
            <div v-for="task in note2" v-bind:key="task.id">
              {{ task.name }}
            </div>
          </div>
        </td>
        <td>
          <div>
            <div v-for="task in note1" v-bind:key="task.id">
              {{ task.name }}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <div v-for="task in note3" v-bind:key="task.id">
              {{ task.name }}
            </div>
          </div>
        </td>
        <td>
          <div>
            <div v-for="task in note4" v-bind:key="task.id">
              {{ task.name }}
            </div>
          </div>
        </td>
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
            name: 'boss迁OA'
          },
          {
            id: 2,
            name: '目标计划'
          }
        ],
        note2: [
          {
            id: 1,
            name: '学习mybatis'
          },
          {
            id: 2,
            name: '学习vue,go'
          },
          {
            id: 3,
            name: '跑步'
          }
        ],
        note3: [
          {
            id: 2,
            name: '玩游戏'
          },
          {
            id: 3,
            name: '弹琴'
          }
        ],
        note4: [
          {
            id: 1,
            name: '吃午饭'
          },
          {
            id: 2,
            name: '告警'
          }
        ]
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
