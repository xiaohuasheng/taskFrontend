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
    width: 90%;
    margin: 0 auto;
    height: auto;
  }

  .a_table td {
    border: 1px solid #d6d6d6;
    width: 1%;
  }

  .a_table td div.item {
    margin: 5px;
    padding: 5px;
    border: 1px solid #ffecec;
  }

  .btn-primary {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }

  .big-input {
    width: 30%;
    height: 26px;
  }

  .big-select {
    height: 32px;
  }

  .trash {
    display: inline-block;
    border: 1px solid darkgrey;
    height: 50px;
    padding: 2px 10px;
  }
</style>
<template>
  <div class="hello">
    <div class="hello">
      <ul>
        <form @submit.prevent="submit">
          <div class="trash">
            删除区域
            <vuedraggable class="wrapper" v-model="trash" :options="{group:'people',}">
            </vuedraggable>
          </div>
          <select class="big-select" name="public-choice" v-model="form_data.type">
            <option :value="coupon.id" v-for="coupon in type_list" v-bind:key="coupon.id">{{coupon.name}}</option>
          </select>
          <input class="big-input" type="text" name="name" v-model="form_data.name">
          <input class="btn-primary" type="submit" value="提交" v-bind:disabled="forbid_submit">
        </form>
      </ul>
    </div>
    <div>
      <table class="a_table">
        <tr v-for="(block, index) in [[2,1], [3,4]]" :key="index">
          <td v-for="i in block" :key="i">
            <div>
              <vuedraggable v-bind:id="i" v-model="note[i]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[i]" :key="item.id" v-bind:id="item.id" class="item"
                     @dblclick="updateStatus(item)">
                  <p>{{item.name}}</p>
                </div>
              </vuedraggable>
            </div>
          </td>
        </tr>
      </table>
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
        forbid_submit: false,
        type_list: [
          {'id': 1, 'name': '重要紧急'},
          {'id': 2, 'name': '重要不紧急'},
          {'id': 3, 'name': '不重要不紧急'},
          {'id': 4, 'name': '紧急不重要'}
        ],
        form_data: {
          id: 0,
          type: '',
          name: ''
        },
        trash: [],
        note: {}
      }
    },
    mounted () {
      // 多一个斜线就不一样了，会301， http://task.xiaohuasheng.cc/api/tasks/
      this.axios.get('http://task.xiaohuasheng.cc/api/tasks').then(response => {
        this.note = response.data
        for (let i = 1; i < 5; i++) {
          if (!this.note.hasOwnProperty(i)) {
            this.note[i] = []
          }
        }
      }).catch(function (error) { // 请求失败处理
        this.$layer.msg('服务端出错')
        console.log(error)
      })
    },
    methods: {
      deleteTask (item) {
        let r = confirm('确定要删除' + item.name + '吗?')
        if (r) {
          this.axios.delete('http://task.xiaohuasheng.cc/api/task/' + item.id).then(data => {
            if (data.data.data) {
              this.$layer.msg('删除成功')
            } else {
              this.$layer.msg('删除失败')
              console.log(data)
            }
          }).catch(function (error) {
            // 请求失败处理
            console.log(error)
          })
        }
      },
      updateStatus (item) {
        item.status = 1
        this.axios.put('http://task.xiaohuasheng.cc/api/task/' + item.id, item).then(data => {
          if (data.data.data) {
            this.$layer.msg('更新成功')
            let itemList = this.note[item.type]
            let itemPos = itemList.indexOf(item)
            this.note[item.type].splice(itemPos, 1)
          } else {
            this.$layer.msg('更新失败')
            console.log(data)
          }
        }).catch(function (error) {
          // 请求失败处理
          console.log(error)
        })
      },
      updateType (item) {
        this.axios.put('http://task.xiaohuasheng.cc/api/task/' + item.id, item).then(data => {
          if (data.data.data) {
            this.$layer.msg('移动成功')
          } else {
            this.$layer.msg('移动失败')
            console.log(data)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      end (ev) {
        console.log(ev)
        if (ev.from.id === ev.to.id && ev.oldIndex === ev.newIndex) {
          return
        }
        let item = {
          'id': ev.item.id,
          'type': ev.to.id,
          'name': ev.item.innerText
        }
        if (item.type) {
          this.updateType(item)
        } else {
          this.deleteTask(item)
        }
      },
      submit: function () {
        this.forbid_submit = true
        this.axios.post('http://task.xiaohuasheng.cc/api/task', this.form_data).then(data => {
          if (data.data.data) {
            this.$layer.msg('添加成功')
            const type = this.form_data.type
            const name = this.form_data.name
            this.form_data.name = ''
            let insertData = {'id': data.data.data, 'name': name, 'type': type}
            if (this.note.hasOwnProperty(type)) {
              this.note[type].push(insertData)
            } else {
              this.note[type] = insertData
            }
          } else {
            this.$layer.msg('添加失败')
          }
          this.forbid_submit = false
        }).catch(error => {
          console.log(error)
          this.forbid_submit = false
        })
      }
    }
  }
</script>
