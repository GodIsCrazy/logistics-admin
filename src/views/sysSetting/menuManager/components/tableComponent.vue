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
          <span type="text" @click="update(scope.row,'send')" v-if="scope.row.parent_id !== ''">修改</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import data from './data'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TableComponent extends Vue {
  @Prop({ default: [] })
  tableData: any

  loading: boolean = false
  tableH: any = data
  update(row: object, type: string) {}
  get table() {
    return this.tableData || []
  }
}
</script>
