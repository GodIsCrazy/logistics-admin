<template>
  <el-dialog
    title="配置菜单"
    :visible.sync="dialogVisible"
    :before-close="handleModalClose"
    :close-on-click-modal="false"
    append-to-body
    v-if="dialogVisible"
    v-dialogDrag
    width="460px"
  >
    <!-- 新增和编辑 start -->
    <div class="form-content">
      <el-tree
        ref="menuTree"
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
        default-expand-all
      ></el-tree>
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
  @Prop()
  ModalVisible: any

  dialogVisible: boolean = true
  FormData: object = {}
  defaultProps: any = {
    children: 'children',
    label: 'name'
  }
  treeData: any = []
  @Watch('ModalVisible')
  modalVisivleChange(newV: any, oldV: any) {
    this.dialogVisible = newV
  }
  @Emit('modalClose')
  modalChange(val?: any) {}

  mounted() {
    this.getAllMenuList()
  }

  handleModalClose(): void {
    this.modalChange()
  }
  handleNodeClick(data: any) {
    console.log(data)
  }
  handleCheckChange(data: any) {}
  save(): void {
    let tree: any = this.$refs['menuTree']
    console.log(tree)
    let sel = tree.getCheckedNodes(false, true)
    console.log(sel)
    this.modalChange(sel)
  }
  async getAllMenuList(): Promise<any> {
    try {
      let data = await Api.getAllMenuList()
      this.treeData = data
    } catch (error) {}
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
.form-content {
  max-height: 500px;
  overflow: auto;
}
</style>
