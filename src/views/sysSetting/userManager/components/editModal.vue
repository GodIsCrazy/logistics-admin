<template>
  <el-dialog
    :title="modalTitle"
    :visible.sync="dialogVisible"
    :before-close="handleModalClose"
    :close-on-click-modal="false"
    v-if="dialogVisible"
    v-dialogDrag
    width="460px"
  >
    <!-- 新增和编辑 start -->
    <div class="form-content">
      <el-form class="form" ref="form" :model="FormData" label-width="100px" :rules="rules">
        <el-form-item label="用户名称：" prop="name">
          <el-input
            style="width:100%;"
            maxlength="30"
            placeholder="请输入用户名称"
            v-model="FormData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录名称：" prop="loginName">
          <el-input
            style="width:100%;"
            maxlength="30"
            placeholder="请输入登录名称"
            v-model="FormData.loginName"
          ></el-input>
        </el-form-item>
         <el-form-item label="邮箱：">
          <el-input
            :rows="3"
            style="width:100%;"
            maxlength="30"
            placeholder="请填写邮箱"
            v-model="FormData.remark"
          ></el-input>
        </el-form-item>
        <el-form-item label="配置角色：" prop="roleId">
          <el-select v-model="FormData.roleId" placeholder="请选择" style="width:100%">
            <el-option label="请选择" value></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in roleList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增和编辑 end -->
    <!-- 模态框按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="handleModalClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Api from '@/api/user'
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class EditModal extends Vue {
  @Prop({ default: '' })
  type: any
  @Prop()
  ModalVisible: any
  @Prop()
  rowData: any

  dialogVisible: boolean = true
  FormData: object = {}
  roleList: any = []
  rules: object = {
    roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
    name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
    loginName: [{ required: true, message: '请输入登录名称', trigger: 'change' }]
    // parentId: [{ required: true, message: '请选择父菜单', trigger: 'change' }]
  }
  titleMap: any = {
    add: '新增用户',
    edit: '修改用户'
  }
  @Watch('ModalVisible')
  modalVisivleChange(newV: any, oldV: any) {
    this.dialogVisible = newV
  }
  @Emit('modalClose')
  modalChange(val?: any) {}

  mounted() {
    this.getUserRole()
    if (this.type === 'edit') {
      this.getUserDetailById()
    }
  }
  save(): void {
    let form: any = this.$refs['form']
    form.validate((val: any) => {
      if (val) {
        this.saveMenu()
      }
    })
  }

  handleModalClose(): void {
    this.modalChange()
  }

  async saveMenu(): Promise<any> {
    try {
      let params: any = {}
      params = { ...this.FormData }
      if (this.type === 'edit') {
        params.id = this.rowData.id
      }
      await Api.saveUser(params)
      this.modalChange()
    } catch (error) {}
  }
  async getUserRole(): Promise<any> {
    try {
      let data = await Api.getRoleList()
      this.roleList = data
    } catch (error) {}
  }
  async getUserDetailById(): Promise<any> {
    try {
      let params = {
        id: this.rowData.id
      }
      let data = await Api.getUserDetailById(params)
      debugger
      this.FormData = data
    } catch (error) {}
  }

  get modalTitle() {
    return this.titleMap[this.type]
  }
}
</script>
