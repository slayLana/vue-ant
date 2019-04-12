
<script lang="ts">
// 该插件可根据菜单配置自动生成 ANTD menu组件
// menuData示例：
// [
//  {
//    title: '菜单标题',
//    icon: '菜单图标',
//    path: '菜单路由',
//    invisible: 'boolean, 是否不可见',
//    children: [子菜单配置]
//  },
//  {
//    title: '菜单标题',
//    icon: '菜单图标',
//    path: '菜单路由',
//    invisible: 'boolean, 是否不可见',
//    children: [子菜单配置]
//  }
// ]

interface MenuData {
  title: string;
  icon: string;
  path: string;
  invisible: string;
  children: MenuData;
}

import { Icon, Menu } from "ant-design-vue";
import { CreateElement, VNode } from "vue";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

const { Item, SubMenu } = Menu;

// 默认菜单图标数组，如果菜单没配置图标，则会设置从该数组随机取一个图标配置
const iconArr = [
  "dashboard",
  "user",
  "form",
  "setting",
  "message",
  "safety",
  "bell",
  "delete",
  "code-o",
  "poweroff",
  "eye-o",
  "hourglass"
];

@Component({
  name: "IMenu"
})
export default class IMenu extends Vue {
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private menuData!: MenuData[];

  @Prop({
    type: String,
    required: false,
    default: "dark"
  })
  private theme!: string;

  @Prop({
    type: String,
    required: false,
    default: "inline"
  })
  private mode!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private collapsed!: boolean;

  private openKeys: any[] = [];
  private selectedKeys: any[] = [];
  private cachedOpenKeys: any[] = [];

  public created() {
    this.updateMenu();
  }

  get rootSubmenuKeys() {
    const keys: any[] = [];
    this.menuData.forEach((item: any) => {
      keys.push(item.path);
    });
    return keys;
  }

  public updateMenu() {
    const routes = this.$route.matched.concat();
    const routesPop = routes.pop();
    if (routesPop) {
      this.selectedKeys = [routesPop.path];
    }
    const openKeys: any[] = [];
    routes.forEach((item: any) => {
      openKeys.push(item.path);
    });
    this.collapsed || this.mode === "horizontal"
      ? (this.cachedOpenKeys = openKeys)
      : (this.openKeys = openKeys);
  }

  @Watch("collapsed")
  public collapsedWatch() {
    if (this.collapsed) {
      this.cachedOpenKeys = this.openKeys;
      this.openKeys = [];
    } else {
      this.openKeys = this.cachedOpenKeys;
    }
  }

  @Watch("$route")
  public routeWatch() {
    this.updateMenu();
  }

  public renderIcon(h: CreateElement, icon: string) {
    return icon === "none"
      ? null
      : h(Icon, {
          props: {
            type:
              icon !== undefined
                ? icon
                : iconArr[Math.floor(Math.random() * iconArr.length)]
          }
        });
  }

  public renderMenuItem(h: CreateElement, menu: any, pIndex: any, index: any) {
    return h(
      Item,
      {
        key: menu.path ? menu.path : "item_" + pIndex + "_" + index
      },
      [
        h("a", { attrs: { href: "#" + menu.path } }, [
          this.renderIcon(h, menu.icon),
          h("span", [menu.name])
        ])
      ]
    );
  }

  public renderItem(h: CreateElement, menu: any, pIndex: any, index: any) {
    if (!menu.invisible) {
      return menu.children
        ? this.renderSubMenu(h, menu, pIndex, index)
        : this.renderMenuItem(h, menu, pIndex, index);
    }
  }

  public renderSubMenu(h: CreateElement, menu: any, pIndex: any, index: any) {
    const subItem = [
      h("span", { slot: "title" }, [
        this.renderIcon(h, menu.icon),
        h("span", [menu.name])
      ])
    ];
    const itemArr: any[] = [];
    const pIndexIndex = pIndex + "_" + index;
    menu.children.forEach((item: any, i: any) => {
      itemArr.push(this.renderItem(h, item, pIndexIndex, i));
    });
    return h(
      SubMenu,
      { key: menu.path ? menu.path : "submenu_" + pIndex + "_" + index },
      subItem.concat(itemArr)
    );
  }

  public renderMenu(h: any, menuTree: any) {
    const menuArr: any[] = [];
    menuTree.forEach((menu: any, i: any) => {
      menuArr.push(this.renderItem(h, menu, "0", i));
    });
    return menuArr;
  }

  public onOpenChange(openKeys: any) {
    const latestOpenKey = openKeys.find(
      (key: any) => this.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys;
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    }
  }

  public render(h: CreateElement): VNode {
    return h(
      Menu,
      {
        props: {
          theme: this.$props.theme,
          mode: this.$props.mode,
          openKeys: this.openKeys,
          selectedKeys: this.selectedKeys
        },
        on: {
          openChange: this.onOpenChange,
          select: (obj: any) => {
            this.selectedKeys = obj.selectedKeys;
            this.$emit("select", obj);
          }
        }
      },
      this.renderMenu(h, this.menuData)
    );
  }
}
</script>
