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
</style>
<template>
  <div class="hello">
    <div class="hello">
      <ul>
        <form @submit.prevent="submit">
          <select class="big-select" name="public-choice" v-model="form_data.type">
            <option :value="coupon.id" v-for="coupon in type_list" v-bind:key="coupon.id">{{coupon.name}}</option>
          </select>
          <input class="big-input" type="text" name="name" v-model="form_data.name">
          <input class="btn-primary" type="submit" value="提交">
        </form>
      </ul>
    </div>
    <div>
      <table class="a_table">
        <tr>
          <td>
            <div>
              <vuedraggable class="wrapper" v-model="note[2]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[2]" :key="item.id" class="item">
                  <p>{{item.name}}</p>
                </div>
              </vuedraggable>
            </div>
          </td>
          <td>
            <div>
              <vuedraggable class="wrapper" v-model="note[1]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[1]" :key="item.id" class="item">
                  <p>{{item.name}}</p>
                </div>
              </vuedraggable>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <vuedraggable class="wrapper" v-model="note[3]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[3]" :key="item.id" class="item">
                  <p>{{item.name}}</p>
                </div>
              </vuedraggable>
            </div>
          </td>
          <td>
            <div>
              <vuedraggable class="wrapper" v-model="note[4]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[4]" :key="item.id" class="item">
                  <p>{{item.name}}</p>
                </div>
              </vuedraggable>
            </div>
          </td>
        </tr>
      </table>
    </div>
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
        type_list: [
          {'id': 1, 'name': '重紧'},
          {'id': 2, 'name': '重不紧'},
          {'id': 3, 'name': '不重不紧'},
          {'id': 4, 'name': '不重紧'}
        ],
        form_data: {
          type: '',
          name: ''
        },
        trash: [],
        note: {}
      }
    },
    mounted () {
      // 多一个斜线就不一样了，会301， http://192.168.3.97:9999/tasks/
      this.axios.get('http://192.168.3.97:9999/tasks').then(response => (this.note = response.data))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    },
    updated () {
      console.log(this.note)
    },
    methods: {
      end (ev) {
        console.log(ev.to.className)
      },
      submit: function () {
        console.log(this.form_data)
        console.log(this.form_data)
        this.axios.post('http://192.168.3.97:9999/task', this.form_data).then(function (res) {
          // TODO 如何在这里引用data的数据？
        }).catch(function (error) { // 请求失败处理
          console.log(error)
        })
        this.note[this.form_data.type].push({'id': '', 'name': this.form_data.name})
        this.form_data.name = ''
      }
    }
  }
</script>
