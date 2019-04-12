<template>
  <a-layout-sider :class="[theme, 'sider', isMobile ? null : 'shadow']"
                  width="256px"
                  :collapsible="collapsible"
                  v-model="collapsed"
                  :trigger="null">
    <div :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <img src="@/assets/img/vue-antd-logo.png">
        <h1>{{systemName}}</h1>
      </router-link>
    </div>
    <i-menu :theme="theme"
            :collapsed="collapsed"
            :menuData="menuData"
            @select="onSelect" />
  </a-layout-sider>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Icon, Layout, Menu } from "ant-design-vue";
import IMenu from "./menu.vue";

@Component({
  name: "SiderMenu",
  components: {
    [IMenu.name]: IMenu,
    [Menu.name]: Menu,
    [Layout.name]: Layout,
    [Layout.Sider.name]: Layout.Sider
  }
})
export default class SiderMenu extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private collapsible!: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private collapsed!: boolean;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private menuData!: any[];

  @Prop({
    type: String,
    required: false,
    default: "dark"
  })
  private theme!: string;

  get isMobile() {
    return this.$store.state.setting.isMobile;
  }
  get systemName() {
    return this.$store.state.setting.systemName;
  }

  private onSelect(obj: any) {
    this.$emit("menuSelect", obj);
  }
}
</script>

<style lang="less" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.sider {
  z-index: 10;
  &.light {
    background-color: #fff;
  }
  &.dark {
    background-color: #001529;
  }
  .logo {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;
    &.light {
      background-color: #fff;
      h1 {
        color: #1890ff;
      }
    }
    &.dark {
      background-color: #002140;
      h1 {
        color: #fff;
      }
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
    img {
      width: 32px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>