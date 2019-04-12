<template>
  <div class="head-info">
    <span>{{title}}</span>
    <p>{{content}}</p>
    <em v-if="bordered" />
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "HeadInfo",
  props: ["title", "content", "bordered"]
})
export default class HeadInfo extends Vue {}
</script>

<style lang="less" scoped>
.head-info {
  position: relative;
  text-align: center;
  padding: 0 32px;
  span {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 4px;
  }
  p {
    color: rgba(0, 0, 0, 0.85);
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }
  em {
    background-color: #e8e8e8;
    position: absolute;
    height: 56px;
    width: 1px;
    top: 0;
    right: 0;
  }
}
</style>
