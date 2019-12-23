<template>
  <div id="app">
    <!-- 主路由 -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
}
</style>
