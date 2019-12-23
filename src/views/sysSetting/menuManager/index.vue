<template>
  <div class="menu-manager">
    <SearchForm @searchForm="searchForm"></SearchForm>
    <TableComponent :tableData="tableData" :loading="loading"></TableComponent>
    <!-- 分页Start -->
    <div class="pagination-bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50,100]"
        :page-size="pageSize"
        :total="recordCount || 0"
        layout="total,sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <!-- 分页End -->
  </div>
</template>

<script lang="ts">
import Api from '@/api/menu'
import { Vue, Component } from 'vue-property-decorator'
import SearchForm from './components/searchForm.vue'
import TableComponent from './components/tableComponent.vue'

@Component({
  components: {
    SearchForm,
    TableComponent
  }
})
export default class MenuManager extends Vue {
  tableData: Array<any> = [{}]
  recordCount: number = 0
  currentPage: number = 1
  pageSize: number = 15
  loading: boolean = false

  mounted() {
    this.getMenuList()
  }
  searchForm(form: object) {}

  handleSizeChange(pageSize: any) {}

  handleCurrentChange(currentPage: any) {}
  async getMenuList() {
    try {
      let params: object = {
        userName: 'admin'
      }
      let data: any = await Api.getMenuList(params)
      this.tableData = data.menuList
      console.log(data)
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.menu-manager {
  display: flex;
  flex-direction: column;
  .table-content {
    flex: 1;
    overflow: hidden;
  }
  .pagination-bottom {
    overflow: hidden;
    height: 56px;
    line-height: 56px;
    text-align: right;
  }
}
</style>
