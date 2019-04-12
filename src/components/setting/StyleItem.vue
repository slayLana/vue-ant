<template>
  <div class="style">
    <img :src="img" />
    <div v-if="selected"
         class="select-item">
      <a-icon type="check" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Icon } from "ant-design-vue";

@Component({
  name: "StyleItem",
  props: ["selected", "img"],
  components: {
    [Icon.name]: Icon
  }
})
export default class StyleItem extends Vue {}
</script>

<style lang="less" scoped>
.style {
  margin-right: 16px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  .select-item {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding-top: 15px;
    padding-left: 24px;
    height: 100%;
    color: #1890ff;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
