<template>
  <div class="setting-item">
    <h3 class="title">{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "SettingItem",
  props: ["title"]
})
export default class SettingItem extends Vue {}
</script>

<style lang="less" scoped>
.setting-item {
  margin-bottom: 24px;
  .title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
    margin-bottom: 12px;
  }
}
</style>
