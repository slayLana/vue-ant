<template>
  <div :class="['step-item', link ? 'linkable' : null]"
       @click="go">
    <span :style="titleStyle">{{title}}</span>
    <a-icon :style="iconStyle"
            :type="icon" />
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { CreateElement, VNode } from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Icon } from "ant-design-vue";

@Component({
  name: "AStepItemGroup"
})
export class AStepItemGroup extends Vue {
  public render(h: CreateElement): VNode {
    return h(
      "div",
      { attrs: { style: "text-align: center; margin-top: 8px" } },
      [
        h(
          "div",
          { attrs: { style: "text-align: left; display: inline-block;" } },
          [this.$slots.default]
        )
      ]
    );
  }
}

@Component({
  name: "AStepItem",
  components: {
    [Icon.name]: Icon
  }
})
export default class AStepItem extends Vue {
  @Prop()
  private link!: string;
  @Prop()
  private title!: string;
  @Prop()
  private icon!: string;
  @Prop()
  private titleStyle!: string;
  @Prop()
  private iconStyle!: string;

  public go() {
    const link = this.link;
    if (link) {
      this.$router.push(link);
    }
  }
}
</script>

<style lang="less" scoped>
.step-item {
  cursor: pointer;
}
:global {
  .ant-steps-item-process {
    .linkable {
      color: #40a9ff;
    }
  }
}
</style>
