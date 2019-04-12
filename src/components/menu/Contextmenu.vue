<template>
  <a-menu :style="style"
          class="contextmenu"
          v-show="visible"
          @click="handleClick"
          :selectedKeys="selectedKeys">
    <a-menu-item :key="item.key"
                 v-for="item in itemList">
      <a-icon role="menuitemicon"
              v-if="item.icon"
              :type="item.icon" />{{item.text}}
    </a-menu-item>
  </a-menu>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Menu, Icon } from "ant-design-vue";

@Component({
  name: "Contextmenu",
  components: {
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Icon.name]: Icon
  }
})
export default class Contextmenu extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private visible!: boolean;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private itemList!: any[];

  private left: number = 0;

  private top: number = 0;

  private target: any = null;

  private selectedKeys: any[] = [];

  get style() {
    return {
      left: this.left + "px",
      top: this.top + "px"
    };
  }

  public created() {
    window.addEventListener("mousedown", e => this.closeMenu(e));
    window.addEventListener("contextmenu", e => this.setPosition(e));
  }
  public closeMenu(e: any) {
    if (
      ["menuitemicon", "menuitem"].indexOf(e.target.getAttribute("role")) < 0
    ) {
      this.$emit("update:visible", false);
    }
  }
  public setPosition(e: any) {
    this.left = e.clientX;
    this.top = e.clientY;
    this.target = e.target;
  }
  public handleClick(key: any) {
    this.$emit("select", key, this.target);
    this.$emit("update:visible", false);
  }
}
</script>

<style lang="less" scoped>
.contextmenu {
  position: fixed;
  z-index: 1;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  box-shadow: 2px 2px 10px #aaaaaa !important;
}
</style>
