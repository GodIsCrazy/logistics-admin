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
        <el-form-item label="角色名称：" prop="name">
          <el-input
            style="width:100%;"
            maxlength="30"
            placeholder="请输入角色名称"
            v-model="FormData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码：" prop="role">
          <el-input
            style="width:100%;"
            maxlength="30"
            placeholder="请输入角色编码"
            v-model="FormData.role"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级菜单：" prop="names">
          <el-input
            disabled
            style="width:100%;"
            maxlength="30"
            placeholder="请配置权限菜单"
            v-model="FormData.names"
          ></el-input>
          <div class="select-btn" @click="openSelect">选择</div>
        </el-form-item>
        <!-- <el-form-item label="状态：" prop="state">
          <el-select v-model="FormData.state" placeholder="请选择状态" style="width:100%">
            <el-option label="启用" value="ENABLED"></el-option>
            <el-option label="禁用" value="DISABLED"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="备注：">
          <el-input
            :rows="3"
            style="width:100%;"
            type="textarea"
            maxlength="200"
            resize="none"
            placeholder="请填写备注"
            v-model="FormData.describe"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新增和编辑 end -->
    <selectMenu
      :ModalVisible="SelectModalVisible"
      :treeData="treeData"
      :menuIds="FormData.menuIds"
      @modalClose="SelectmodalClose"
      v-if="SelectModalVisible"
    ></selectMenu>
    <!-- 模态框按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="handleModalClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Api from '@/api/role'
import menuApi from '@/api/menu'
import selectMenu from './selectMenu.vue'
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component({
  components: {
    selectMenu
  }
})
export default class EditModal extends Vue {
  @Prop({ default: '' })
  type: any
  @Prop()
  ModalVisible: any
  @Prop()
  rowData: any

  dialogVisible: boolean = true
  SelectModalVisible: boolean = false
  FormData: object = {}
  parentMenu: any = []
  menus: any = []
  treeData: any = []
  rules: object = {
    role: [{ required: true, message: '请输入角色编码', trigger: 'change' }],
    name: [{ required: true, message: '请填写角色名称', trigger: 'change' }],
    path: [{ required: true, message: '请填写菜单路径', trigger: 'change' }],
    names: [{ required: true, message: '请选择菜单', trigger: 'change' }]
    // parentId: [{ required: true, message: '请选择父菜单', trigger: 'change' }]
  }
  titleMap: any = {
    add: '新增菜单',
    edit: '修改菜单'
  }
  @Watch('ModalVisible')
  modalVisivleChange(newV: any, oldV: any) {
    this.dialogVisible = newV
  }
  @Emit('modalClose')
  modalChange(val?: any) {}

  mounted() {
    this.getAllMenuList()
  }
  save(): void {
    let form: any = this.$refs['form']
    form.validate((val: any) => {
      if (val) {
        this.saveRole()
      }
    })
  }

  handleModalClose(): void {
    this.modalChange()
  }

  SelectmodalClose(val: any): void {
    if (val) {
      this.menus = val
      let names = this.menus.map((res: any) => res.name)
      let ids = this.menus.map((res: any) => res.id)
      this.$set(this.FormData, 'names', names.join(','))
      this.$set(this.FormData, 'menuIds', ids)
    }
    this.SelectModalVisible = false
  }

  openSelect(): void {
    this.SelectModalVisible = true
  }

  async saveRole(): Promise<any> {
    try {
      let params: any = {}
      params = { ...this.FormData }
      if (this.type === 'edit') {
        params.roleId = this.rowData.id
      }
      await Api.saveRole(params)
      this.modalChange()
    } catch (error) {}
  }
  async getRoleDetailById(): Promise<any> {
    try {
      let params: any = {
        id: this.rowData.id
      }
      let data = await Api.getRoleDetailById(params)
      this.FormData = { ...this.FormData, ...data }
      console.log(this.FormData)
    } catch (error) {
      console.log(error)
    }
  }
  async getAllMenuList(): Promise<any> {
    try {
      if (this.type === 'edit') {
        await this.getRoleDetailById()
      }
      let data = await menuApi.getAllMenuList()
      this.treeData = data
      this.$nextTick(() => {
        let FormData: any = this.FormData
        let menuIds = FormData.menus.map((res: any) => res.sysMenuId)
        let names = []
        for (let i = 0; i < this.treeData.length; i++) {
          let trees = this.treeData[i]
          if (menuIds.indexOf(trees.id) !== -1) {
            names.push(trees.name)
          }
          if (trees.children.length > 0) {
            for (let j = 0; j < trees.children.length; j++) {
              let tree1 = trees.children[j]
              if (menuIds.indexOf(tree1.id) !== -1) {
                names.push(tree1.name)
              }
            }
          }
        }
        this.$set(this.FormData, 'names', names.join(','))
        this.$set(this.FormData, 'menuIds', menuIds)
      })
    } catch (error) {}
  }
  get modalTitle() {
    return this.titleMap[this.type]
  }
}
</script>

<style lang="scss" scoped>
.select-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
  color: #0092ff;
  cursor: pointer;
}
</style>
