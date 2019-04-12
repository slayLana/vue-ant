<template>
  <transition name="page-toggle">
    <keep-alive v-if="multipage">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </transition>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "RouteView"
})
export default class RouteView extends Vue {
  get multipage() {
    return this.$store.state.setting.multipage;
  }
}
</script>

<style scoped>
</style>
