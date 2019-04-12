<template>
  <div>
    <div :class="['mask', openDrawer ? 'open' : 'close']"
         @click="close"></div>
    <div :class="['drawer', placement, openDrawer ? 'open' : 'close']">
      <div ref="drawer"
           style="position: relative; height: 100%;">
        <slot></slot>
      </div>
      <div v-if="showHandler"
           :class="['handler-container', placement]"
           ref="handler"
           @click="handle">
        <slot v-if="$slots.handler"
              name="handler"></slot>
        <div v-else
             class="handler">
          <a-icon :type="openDrawer ? 'close'  : 'bars'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { Icon } from "ant-design-vue";

@Component({
  name: "Drawer",
  components: {
    [Icon.name]: Icon
  }
})
export default class Drawer extends Vue {
  private drawerWidth: number = 0;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private openDrawer!: boolean;

  @Prop({
    type: String,
    required: false,
    default: "left"
  })
  private placement!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: true
  })
  private showHandler!: boolean;

  protected mounted() {
    this.drawerWidth = this.getDrawerWidth();
  }

  protected open() {
    this.$emit("change", true);
  }
  protected close() {
    this.$emit("change", false);
  }
  protected handle() {
    this.$emit("change", !this.openDrawer);
  }
  protected getDrawerWidth() {
    return (this.$refs.drawer as any).clientWidth;
  }

  @Watch("drawerWidth")
  protected function(val: any) {
    if (this.placement === "left") {
      (this.$refs.handler as any).style.left = val + "px";
    } else {
      (this.$refs.handler as any).style.right = val + "px";
    }
  }
}
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s;
  z-index: 100;
  &.open {
    display: inline-block;
  }
  &.close {
    display: none;
  }
}
.drawer {
  position: fixed;
  height: 100%;
  transition: all 0.5s;
  z-index: 100;
  &.left {
    left: 0px;
    &.open {
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    }
    &.close {
      transform: translateX(-100%);
    }
  }
  &.right {
    right: 0px;
    &.open {
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    }
    &.close {
      transform: translateX(100%);
    }
  }
  .sider {
    height: 100%;
  }
}
.handler-container {
  position: fixed;
  top: 200px;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
  .handler {
    height: 40px;
    width: 40px;
    background-color: #fff;
    z-index: 100;
    font-size: 26px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    line-height: 40px;
  }
  &.left {
    .handler {
      border-radius: 0 5px 5px 0;
    }
  }
  &.right {
    .handler {
      border-radius: 5px 0 0 5px;
    }
  }
}
</style>
