<template>
  <div class="header" style="text-align: right; font-size: 12px">
    <span>王小虎</span>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  async logout() {
    try {
      await this.$store.dispatch('LOGOUT')
      this.$router.push({
        name: 'login'
      })
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
}
</style>
