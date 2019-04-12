<template>
  <global-layout>
    <contextmenu :itemList="menuItemList"
                 :visible.sync="menuVisible"
                 @select="onMenuSelect" />
    <a-tabs @contextmenu.native="e => onContextmenu(e)"
            v-if="multipage"
            :active-key="activePage"
            style="margin-top: -8px; margin-bottom: 8px"
            :hide-add="true"
            type="editable-card"
            @change="changePage"
            @edit="editPage">
      <a-tab-pane :id="page.fullPath"
                  :key="page.fullPath"
                  v-for="page in pageList">
        <span slot="tab"
              :pagekey="page.fullPath">{{page.name}}</span>
      </a-tab-pane>
    </a-tabs>
    <transition name="page-toggle">
      <keep-alive v-if="multipage">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </transition>
  </global-layout>
</template>

<script lang='ts'>
import { Icon, Layout, Divider, Menu, Tooltip, Tabs } from "ant-design-vue";
import { Vue, Component, Watch } from "vue-property-decorator";
import GlobalLayout from "./GlobalLayout.vue";
import Contextmenu from "../components/menu/Contextmenu.vue";
import { TooltipCommon } from "ant-design-vue/types/tootip/common";

@Component({
  name: "MenuView",
  components: {
    [Contextmenu.name]: Contextmenu,
    [GlobalLayout.name]: GlobalLayout,
    [Icon.name]: Icon,
    [Layout.name]: Layout,
    [Divider.name]: Divider,
    [Menu.name]: Menu,
    [Tooltip.name]: Tooltip,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane
  }
})
export default class MenuView extends Vue {
  private pageList: any[] = [];
  private linkList: any[] = [];
  private activePage: string = "";
  private menuVisible: boolean = false;
  private menuItemList: any[] = [
    { key: "1", icon: "arrow-left", text: "关闭左侧" },
    { key: "2", icon: "arrow-right", text: "关闭右侧" },
    { key: "3", icon: "close", text: "关闭其它" }
  ];

  get multipage() {
    return this.$store.state.setting.multipage;
  }

  public created() {
    this.pageList.push(this.$route);
    this.linkList.push(this.$route.fullPath);
    this.activePage = this.$route.fullPath;
  }

  @Watch("$route")
  public routeWatch(newRoute: any, oldRoute: any) {
    this.activePage = newRoute.fullPath;
    if (!this.multipage) {
      this.linkList = [newRoute.fullPath];
      this.pageList = [newRoute];
    } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
      this.linkList.push(newRoute.fullPath);
      this.pageList.push(newRoute);
    }
  }

  @Watch("activePage")
  public activePageWatch(key: any) {
    this.$router.push(key);
  }

  @Watch("multipage")
  public multipageWatch(newVal: any, oldVal: any) {
    if (!newVal) {
      this.linkList = [this.$route.fullPath];
      this.pageList = [this.$route];
    }
  }

  public changePage(key: any) {
    this.activePage = key;
  }

  public editPage(key: any, action: any) {
    (this as any)[action](key);
  }

  public remove(key: any) {
    if (this.pageList.length === 1) {
      this.$message.warning("这是最后一页，不能再关闭了啦");
      return;
    }
    this.pageList = this.pageList.filter(item => item.fullPath !== key);
    let index = this.linkList.indexOf(key);
    this.linkList = this.linkList.filter(item => item !== key);
    index = index >= this.linkList.length ? this.linkList.length - 1 : index;
    this.activePage = this.linkList[index];
  }

  public onContextmenu(e: any) {
    const pagekey = this.getPageKey(e.target);
    if (pagekey !== null) {
      e.preventDefault();
      this.menuVisible = true;
    }
  }

  /**
   * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
   * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
   * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
   * @param target 查询开始目标
   * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
   * @returns {String}
   */
  public getPageKey(target: any, depth?: any): any {
    depth = depth || 0;
    if (depth > 2) {
      return null;
    }
    let pageKey = target.getAttribute("pagekey");
    pageKey =
      pageKey ||
      (target.previousElementSibling
        ? target.previousElementSibling.getAttribute("pagekey")
        : null);
    return (
      pageKey ||
      (target.firstElementChild
        ? this.getPageKey(target.firstElementChild, ++depth)
        : null)
    );
  }

  public onMenuSelect(key: any, target: any) {
    const pageKey = this.getPageKey(target);
    switch (key) {
      case "1":
        this.closeLeft(pageKey);
        break;
      case "2":
        this.closeRight(pageKey);
        break;
      case "3":
        this.closeOthers(pageKey);
        break;
      default:
        break;
    }
  }

  public closeOthers(pageKey: any) {
    const index = this.linkList.indexOf(pageKey);
    this.linkList = this.linkList.slice(index, index + 1);
    this.pageList = this.pageList.slice(index, index + 1);
    this.activePage = this.linkList[0];
  }

  public closeLeft(pageKey: any) {
    const index = this.linkList.indexOf(pageKey);
    this.linkList = this.linkList.slice(index);
    this.pageList = this.pageList.slice(index);
    if (this.linkList.indexOf(this.activePage) < 0) {
      this.activePage = this.linkList[0];
    }
  }

  public closeRight(pageKey: any) {
    const index = this.linkList.indexOf(pageKey);
    this.linkList = this.linkList.slice(0, index + 1);
    this.pageList = this.pageList.slice(0, index + 1);
    if (this.linkList.indexOf(Number.parseInt(this.activePage, 10) < 0)) {
      this.activePage = this.linkList[this.linkList.length - 1];
    }
  }
}
</script>

<style scoped>
</style>
