<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="crazyId" label="CrazyId" width="100" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="email" label="用户邮箱"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template #default="scope">
                        <el-image class="table-td-thumb" :src="scope.row.viaUrl" :preview-src-list="[scope.row.viaUrl]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column label="权限" align="center">
                    <template #default="scope">
                        <el-tag :type="
                                scope.row.__v === 1
                                    ? 'success'
                                    : scope.row.__v === 0
                                    ? ''
                                    : ''
                            ">{{ scope.row.__v == 1?'管理员':'用户' }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="regTime" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="editData.username"></el-input>
                </el-form-item>
                <el-form-item label="头像地址">
                    <el-input v-model="editData.viaUrl" ></el-input>
                </el-form-item>
                <el-form-item  label="电话">
                  <el-input v-model="editData.tel"></el-input>
                </el-form-item>
                <el-form-item  label="权限">
                  <el-select v-model="editData.__v" placeholder="请选择"  style="width: 40%;">
                    <el-option :value="0" label="用户"></el-option>
                    <el-option :value="1" label="管理员"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveUser()">保存</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import {changeUser, findAllUser} from "../api";

export default {
  name: "basetable",
  data(){
    return {
      tableData:[],
      editVisible:false,
      editData:{},
      nowId:''
    }
  },
  methods:{
    updataTable(){
      findAllUser().then(result=>{
        if(result.code === '200') {
          // console.log(result)
          this.tableData = result.data
        } else {
          alert(`${result.msg}`)
        }
      })
    },
    handleEdit(row) {
      this.nowId = row.crazyId
      let {username,viaUrl,__v,tel} = row
      this.editData = {username,viaUrl,__v,tel}
      // console.log(this.editData)
      this.editVisible = true
      // console.log(id)
    },
    saveUser(){
      changeUser(this.nowId,this.editData).then(result =>{
        // console.log(result)
        if(result.code === '200') {
          ElMessage({
            type:'success',
            message:'修改成功'
          })
          this.editVisible = false
          this.updataTable()
        } else {
          ElMessage({
            type:'error',
            message:`${result.msg}`
          })
        }
      })
    }
  },
  mounted() {
    this.updataTable()
  }

};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
