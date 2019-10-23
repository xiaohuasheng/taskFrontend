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
            <vuedraggable class="wrapper" v-model="note2" :options="{group:'people',}" @end="end">
              <div v-for="item in note2" :key="item.id" class="item">
                <p>{{item.name}}</p>
              </div>
            </vuedraggable>
          </div>
        </td>
        <td>
          <div>
            <vuedraggable class="wrapper" v-model="note1" :options="{group:'people',}" @end="end">
              <div v-for="item in note1" :key="item.id" class="item">
                <p>{{item.name}}</p>
              </div>
            </vuedraggable>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <vuedraggable class="wrapper" v-model="note3" :options="{group:'people',}" @end="end">
              <div v-for="item in note3" :key="item.id" class="item">
                <p>{{item.name}}</p>
              </div>
            </vuedraggable>
          </div>
        </td>
        <td>
          <div>
            <vuedraggable class="wrapper" v-model="note4" :options="{group:'people',}" @end="end">
              <div v-for="item in note4" :key="item.id" class="item">
                <p>{{item.name}}</p>
              </div>
            </vuedraggable>
          </div>
        </td>
      </tr>
    </table>
    <div>
      删除区域
      <vuedraggable class="wrapper" v-model="trash" :options="{group:'people',}" @end="end">
      </vuedraggable>
    </div>
  </div>
</template>

<script>
  import vuedraggable from 'vuedraggable'

  export default {
    components: {vuedraggable},
    name: 'hello',
    data () {
      return {
        info: null,
        trash: [],
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
            id: 3,
            name: '学习mybatis'
          },
          {
            id: 4,
            name: '学习vue,go'
          },
          {
            id: 5,
            name: '跑步'
          }
        ],
        note3: [
          {
            id: 6,
            name: '玩游戏'
          },
          {
            id: 7,
            name: '弹琴'
          }
        ],
        note4: [
          {
            id: 8,
            name: '吃午饭'
          },
          {
            id: 9,
            name: '告警'
          }
        ]
      }
    },
    mounted () {
      // this.axios.post('http://192.168.3.97:9999/form', {
      //   username: 'Fred',
      //   password: 'Flintstone'
      // }).then(response => (this.info = response.data))
      //   .catch(function (error) { // 请求失败处理
      //     console.log(error)
      //   })
    },
    updated () {
      console.log('note1', this.note1)
      // console.log('list:', this.list)
      // console.log('list2:', this.list2)
    },
    methods: {
      end (ev) {
        console.log(ev.to.className)
      }
    }
  }
</script>
