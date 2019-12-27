<template>
  <div class="table-content">
    <el-table
      :data="table"
      v-loading="loading"
      highlight-current-row
      tooltip-effect="light"
      default-expand-all
      height="100%"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <div slot="empty">
        <div v-if="!loading" class="diyNoData">暂无匹配数据</div>
      </div>
      <el-table-column label="序号" width="80" align="left" type="index" show-overflow-tooltip></el-table-column>
      <template v-for="(col,index1) in tableH">
        <el-table-column
          :key="index1"
          :label="col.label"
          :prop="col.prop"
          :align="col.Align"
          :min-width="col.minWidth"
          width="180"
          show-overflow-tooltip
          v-if="col.type==='date'"
        >
          <template slot-scope="scope">
            <span v-if="!scope.row[col.prop]">\</span>
            <span v-else>{{formatTime(scope.row[col.prop])}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index1"
          :label="col.label"
          :prop="col.prop"
          :width="col.width"
          :align="col.Align||'left'"
          :min-width="col.minWidth"
          show-overflow-tooltip
          v-else-if="col.type==='enum'"
        >
          <template slot-scope="scope">
            <i
              class="icon-base iconfont iconsuccess"
              v-if="col.icon && scope.row[col.prop] === 'ENABLED'"
            ></i>
            <i
              class="icon-base iconfont icondanger"
              v-if="col.icon && scope.row[col.prop] === 'DISABLED'"
            ></i>
            <span>{{!col.value[scope.row[col.prop]]?'\\':col.value[scope.row[col.prop]]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :key="index1"
          :label="col.label"
          :prop="col.prop"
          :width="col.width"
          show-overflow-tooltip
          align="right"
          :min-width="col.minWidth"
          v-else-if="col.type==='money'"
        >
          <template slot-scope="scope">
            <span class="money-strong" v-if="!scope.row[col.prop]">\</span>
            <span v-else>{{scope.row[col.prop] | toThousands}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index1"
          :label="col.label"
          :prop="col.prop"
          :width="col.width"
          :align="col.Align||'left'"
          :min-width="col.minWidth"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{!scope.row[col.prop]?(scope.row[col.prop] === 0 ? '0':"\\"):scope.row[col.prop]}}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        class-name="table-operate-btn"
        align="left"
        label="操作"
        width="90"
        fixed="right"
      >
        <template slot-scope="scope">
          <span type="text" @click="update(scope.row,'send')" v-if="scope.row.parentId">修改</span>
          <span type="text" @click="update(scope.row,'remove')">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <EditModal
      :type="modalType"
      :ModalVisible="ModalVisible"
      :rowData="rowData"
      @modalClose="modalClose"
      v-if="ModalVisible"
    ></EditModal>
  </div>
</template>

<script lang="ts">
import data from './data'
import EditModal from './editModal.vue'
import Api from '@/api/menu'
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({
  components: {
    EditModal
  }
})
export default class TableComponent extends Vue {
  @Prop({ default: [] })
  tableData: any

  rowData: any = {}
  modalType: string = 'edit'
  ModalVisible: boolean = false

  loading: boolean = false
  tableH: any = data

  @Emit('refresh')
  refreshTable() {}

  update(row: object, type: string) {
    if (type === 'remove') {
      this.removeRow(row)
      return
    }
    this.ModalVisible = true
    this.rowData = row
  }

  async removeRow(row: any) {
    try {
      await this.$confirm('删除此菜单，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: 'canel-btn',
        type: 'warning'
      })
      let params = {
        id: row.id
      }
      await Api.deleteMenu(params)
      this.refreshTable()
    } catch (error) {
      console.log(error)
    }
  }

  get table() {
    return this.tableData || []
  }
  modalClose() {
    // 模态框关闭
    this.ModalVisible = false
    this.refreshTable()
  }
}
</script>
