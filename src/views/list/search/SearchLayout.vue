<template>
  <div>
    <div class="search-head">
      <div class="search-input">
        <a-input-search style="width: 522px"
                        placeholder="请输入..."
                        size="large"
                        enterButton="搜索" />
      </div>
      <div style="padding: 0 24px">
        <a-tabs :tabBarStyle="{margin: 0}"
                @change="navigate"
                :activeKey="activeKey">
          <a-tab-pane tab="文章"
                      key="1"></a-tab-pane>
          <a-tab-pane tab="应用"
                      key="2"></a-tab-pane>
          <a-tab-pane tab="项目"
                      key="3"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="search-content">
      <router-view />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Input, Tabs } from "ant-design-vue";
@Component({
  name: "SearchLayout",
  components: {
    [Input.Search.name]: Input.Search,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane
  }
})
export default class SearchLayout extends Vue {
  get activeKey() {
    switch (this.$route.path) {
      case "/list/search/article":
        return "1";
      case "/list/search/application":
        return "2";
      case "/list/search/project":
        return "3";
      default:
        return "1";
    }
  }

  private navigate(key: string) {
    switch (key) {
      case "1":
        this.$router.push("/list/search/article");
        break;
      case "2":
        this.$router.push("/list/search/application");
        break;
      case "3":
        this.$router.push("/list/search/project");
        break;
      default:
        this.$router.push("/workplace");
    }
  }
}
</script>

<style lang="less" scoped>
.search-head {
  background-color: #fff;
  margin: -25px -24px -24px;
  .search-input {
    text-align: center;
  }
}
.search-content {
  margin-top: 48px;
}
</style>
