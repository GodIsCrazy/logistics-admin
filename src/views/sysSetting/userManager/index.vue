<template>
  <div class="user-manager">
    <SearchForm @searchForm="searchForm"></SearchForm>
    <TableComponent :tableData="tableData" :loading="loading" @refresh="refreshTable"></TableComponent>
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
import Api from '@/api/user'
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
  formData: any = {}

  mounted() {
    this.getUserList()
  }
  searchForm(form: object) {
    if (form) {
      this.formData = form
    }
    this.pageSize = 15
    this.currentPage = 1
    this.getUserList()
  }

  handleSizeChange(pageSize: any) {
    this.pageSize = pageSize
    this.getUserList()
  }

  handleCurrentChange(currentPage: any) {
    this.currentPage = currentPage
    this.getUserList()
  }
  refreshTable() {
    this.pageSize = 15
    this.currentPage = 1
    this.getUserList()
  }
  async getUserList() {
    try {
      let params: object = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      params = { ...params, ...this.formData }
      let data: any = await Api.getUserList(params)
      this.tableData = data.items
      this.recordCount = data.recordCount
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-manager {
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
