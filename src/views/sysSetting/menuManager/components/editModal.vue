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
        <el-form-item label="菜单名称：" prop="riskViewCode">
          <el-input
            :disabled="this.type !== 'add'"
            style="width:100%;"
            maxlength="30"
            placeholder="请输入菜单名称"
            v-model="FormData.riskViewCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单路径：" prop="riskViewName">
          <el-input
            style="width:100%;"
            maxlength="30"
            placeholder="请输入菜单路径"
            v-model="FormData.riskViewName"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级菜单：" prop="resultType">
          <el-select v-model="FormData.resultType" placeholder="请选择" style="width:100%">
            <el-option label="请选择" value></el-option>
            <el-option label="单条" value="SINGLE"></el-option>
            <el-option label="多条" value="MULTIPLE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="state">
          <el-select v-model="FormData.state" placeholder="请选择状态" style="width:100%">
            <el-option label="启用" value="ENABLED"></el-option>
            <el-option label="禁用" value="DISABLED"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="queryParams">
          <el-input
            :rows="3"
            style="width:100%;"
            type="textarea"
            maxlength="200"
            resize="none"
            placeholder="请填写备注"
            v-model="FormData.queryParams"
          ></el-input>
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
import Api from '@/api/menu'
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class EditModal extends Vue {
  @Prop({ default: '' })
  type: any
  @Prop()
  ModalVisible: any

  dialogVisible: boolean = true
  FormData: object = {}
  rules: object = {
    state: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
      let params = {}
      await Api.addMenu(params)
      this.modalChange()
    } catch (error) {}
  }
  get modalTitle() {
    return this.titleMap[this.type]
  }
}
</script>
