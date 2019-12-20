<template>
  <el-container class="warp">
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-container class="content">
      <el-aside class="menu">
        <Menu></Menu>
      </el-aside>
      <el-main class="warp-content">
        <keep-alive>
          <router-view class="main-view"></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from './Header.vue'
import Menu from './Menu.vue'

@Component({
  components: {
    Header,
    Menu
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.warp {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 60px;
    flex-shrink: 0;
  }
  .content {
    flex: 1;
    .menu {
      width: 180px !important;
      background: #0092ff;
    }
    .warp-content {
      background: rgb(240, 242, 245);
    }
  }
}
</style>
