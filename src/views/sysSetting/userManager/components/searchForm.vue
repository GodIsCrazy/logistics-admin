<template>
  <div class="search-form">
    <!-- 搜索框START -->
    <el-input v-model.trim="queryForm.name" class="width-240 mar-r-10" placeholder="用户名称/登录名称"></el-input>
    <!--搜索框END -->

    <div class="operator-btn">
      <el-button type="primary" @click="search" class="el-hlc-search">查 询</el-button>
      <el-button type="default" @click="reset" class="el-hlc-reset">清 空</el-button>
    </div>
    <!-- 操作按钮END -->
    <div class="action">
      <el-button type="primary" @click="add" class="rf">+新增</el-button>
    </div>
    <EditModal
      :type="modalType"
      :ModalVisible="ModalVisible"
      @modalClose="modalClose"
      v-if="ModalVisible"
    ></EditModal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'
import EditModal from './editModal.vue'

@Component({
  components: {
    EditModal
  }
})
export default class searchForm extends Vue {
  queryForm: any = {
    name: ''
  }
  modalType: string = ''
  ModalVisible: boolean = false

  @Emit('searchForm')
  refreshTable(form?: object) {}

  search() {
    this.refreshTable(this.queryForm)
  }
  add() {
    this.modalType = 'add'
    this.ModalVisible = true
  }
  reset() {
    let $options = this.$options
    let data: any = $options
    Object.assign(this.$data.queryForm, data.data().queryForm)
  }
  modalClose(val: any) {
    this.ModalVisible = false
    this.refreshTable()
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  min-height: 42px;
  line-height: 42px;
  .mar-r-10 {
    margin-right: 10px;
  }
  .operator-btn {
    margin-bottom: 10px;
    display: inline-block;
  }
  .action {
    float: right;
  }
}
</style>
