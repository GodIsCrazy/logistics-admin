<template>
  <div class="menu">
    <el-scrollbar class="scroll-view">
      <el-collapse-transition>
        <el-menu
          :collapse="isCollapse"
          :default-active="activeRoute"
          class="my-menu"
          unique-opened
          @select="handleSelectMenu"
          ref="elMenu"
        >
          <template>
            <el-submenu
              v-for="(item, index) in menuList"
              :index="index+'1'"
              :key="index"
              class="sidebar-item"
            >
              <template slot="title">
                <i
                  class="iconfont"
                  :class="item.iconUrl"
                  style="font-size: 16px; color: #fff;"
                  v-if="!isCollapse"
                ></i>
                <i
                  class="iconfont"
                  v-else
                  :class="item.iconUrl"
                  style="font-size: 20px; color: #fff;margin-left: 6px"
                ></i>
                <span>{{ (item.meta&&item.meta.title) || item.name }}</span>
              </template>
              <el-menu-item
                v-for="(child, order) in item.children"
                :index="child.url"
                :key="order"
                @click="chooseItem(child)"
              >{{ (child.meta&&item.meta.title) || child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-collapse-transition>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
  isCollapse: Boolean = false
  activeRoute: String = '/home'
  handleSelectMenu() {}
  chooseItem() {}
  get menuList() {
    console.log(this.$router)
    let $router: any = this.$router
    return $router.options.routes[0].children
  }
  @Watch('$route')
  routeChange(oldV: any, newV: any) {
    this.activeRoute = oldV.path
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
/deep/ .el-submenu__title {
  color: #fff;
}
/deep/ .el-submenu__title i {
  color: #fff;
}
/deep/ .el-submenu__title:hover {
  background: #0079ff;
}
.menu {
  height: 100%;
  .my-menu {
    background: #0092ff;
    color: #fff;
    border-right: solid 1px #0092ff;
  }
  .scroll-view {
    height: 100%;
    width: 100%;
  }
}
</style>
