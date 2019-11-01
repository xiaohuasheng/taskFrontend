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
    border: 1px dashed darkgrey;
    height: 50px;
    padding: 2px 10px;
  }

  .el-row {
    margin-bottom: 10px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .demo-block .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
</style>
<template>
  <div class="hello">
    <div>
      <el-row>
        <el-col :span="12">
          <div class="trash">
            删除区域
            <vuedraggable class="wrapper" v-model="trash" :options="{group:'people',}">
            </vuedraggable>
          </div>
          <el-button type="primary" @click="dialogFormVisible = true">新增任务</el-button>
        </el-col>
      </el-row>
      <el-row v-for="(block, index) in [[2,1], [3,4]]" :key="index">
        <el-col v-for="i in block" :key="i" :span="12">
          <el-card class="box-card">
            <div>
              <vuedraggable v-bind:id="i" v-model="note[i]" :options="{group:'people',}" @end="end">
                <div v-for="item in note[i]" :key="item.id" v-bind:id="item.id" class="item" @dblclick="updateStatus(item)">
                  <span>{{item.name}}</span>
                  <el-divider></el-divider>
                </div>
              </vuedraggable>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="新增任务" :visible.sync="dialogFormVisible">
      <el-form :model="form_data">
        <el-form-item label="紧急重要程度" :label-width="formLabelWidth">
          <el-select v-model="form_data.type" placeholder="请选择">
            <el-option :label="coupon.name" :value="coupon.id" v-for="coupon in type_list"
                       v-bind:key="coupon.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form_data.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
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
        dialogFormVisible: false,
        formLabelWidth: '120px',
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
        this.$message('服务端出错')
        console.log(error)
      })
    },
    methods: {
      deleteTask (item) {
        let r = confirm('确定要删除' + item.name + '吗?')
        if (r) {
          this.axios.delete('http://task.xiaohuasheng.cc/api/task/' + item.id).then(data => {
            if (data.data.data) {
              this.$message('删除成功')
            } else {
              this.$message('删除失败')
              console.log(data)
            }
          }).catch(function (error) {
            // 请求失败处理
            console.log(error)
          })
        }
      },
      showDetail (item) {
        let content = '<div>' + item.name + '</div>'
        this.$layer.alert(content)
      },
      updateStatus (item) {
        item.status = 1
        this.axios.put('http://task.xiaohuasheng.cc/api/task/' + item.id, item).then(data => {
          if (data.data.data) {
            this.$message('更新成功')
            let itemList = this.note[item.type]
            let itemPos = itemList.indexOf(item)
            this.note[item.type].splice(itemPos, 1)
          } else {
            this.$message('更新失败')
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
            this.$message('移动成功')
          } else {
            this.$message('移动失败')
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
            this.$message('添加成功')
            const type = this.form_data.type
            const name = this.form_data.name
            this.form_data.name = ''
            let insertData = {'id': data.data.data, 'name': name, 'type': type}
            if (this.note.hasOwnProperty(type)) {
              this.note[type].push(insertData)
            } else {
              this.note[type] = insertData
            }
            this.dialogFormVisible = false
          } else {
            this.$message('添加失败')
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
