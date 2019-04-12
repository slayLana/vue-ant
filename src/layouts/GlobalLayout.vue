<template>
  <a-layout>
    <drawer v-if="isMobile"
            :openDrawer="collapsed"
            @change="onDrawerChange">
      <sider-menu :theme="theme"
                  :menuData="menuData"
                  :collapsed="false"
                  :collapsible="false"
                  @menuSelect="onMenuSelect" />
    </drawer>
    <sider-menu :theme="theme"
                v-else-if="layout === 'side'"
                :menuData="menuData"
                :collapsed="collapsed"
                :collapsible="true" />
    <drawer :open-drawer="showSetting"
            placement="right"
            @change="onSettingDrawerChange">
      <div class="setting"
           slot="handler">
        <a-icon :type="showSetting ? 'close' : 'setting'" />
      </div>
      <setting />
    </drawer>
    <a-layout>
      <global-header :menuData="menuData"
                     :collapsed="collapsed"
                     @toggleCollapse="toggleCollapse" />
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <a-layout-footer style="padding: 0px">
        <global-footer :link-list="linkList"
                       :copyright="copyright" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import GlobalHeader from "./GlobalHeader.vue";
import GlobalFooter from "./GlobalFooter.vue";
import Drawer from "@/components/tool/Drawer.vue";
import SiderMenu from "@/components/menu/SiderMenu.vue";
import Setting from "@/components/setting/Setting.vue";
import { Icon, Layout } from "ant-design-vue";

@Component({
  name: "GlobalLayout",
  components: {
    [GlobalHeader.name]: GlobalHeader,
    [GlobalFooter.name]: GlobalFooter,
    [Drawer.name]: Drawer,
    [SiderMenu.name]: SiderMenu,
    [Setting.name]: Setting,
    [Icon.name]: Icon,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Footer.name]: Layout.Footer
  }
})
export default class GlobalLayout extends Vue {
  private minHeight: string;
  private collapsed: boolean;
  private menuData!: any[];
  private showSetting: boolean;

  constructor() {
    super();
    const minHeight = window.innerHeight - 64 - 24 - 122;
    this.minHeight = minHeight.toString();
    this.collapsed = false;
    this.showSetting = false;
  }

  protected beforeCreate() {
    this.menuData = (this.$router as any).options.routes.find(
      (item: any) => item.path === "/"
    ).children;
  }

  get isMobile() {
    return this.$store.state.setting.isMobile;
  }

  get theme() {
    return this.$store.state.setting.theme;
  }

  get layout() {
    return this.$store.state.setting.layout;
  }

  get linkList() {
    return this.$store.state.setting.footerLinks;
  }
  get copyright() {
    return this.$store.state.setting.copyright;
  }

  private toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
  private onDrawerChange(show: boolean) {
    this.collapsed = show;
  }
  private onMenuSelect() {
    this.toggleCollapse();
  }
  private onSettingDrawerChange(val: boolean) {
    this.showSetting = val;
  }
}
</script>

<style lang="less" scoped>
.setting {
  background-color: #1890ff;
  color: #fff;
  border-radius: 5px 0 0 5px;
  line-height: 40px;
  font-size: 22px;
  width: 40px;
  height: 40px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}
</style>
