<template>
  <div style="margin: -24px -24px 0px">
    <page-header :breadcrumb="breadcrumb"
                 :title="title"
                 :logo="logo"
                 :avatar="avatar">
      <slot name="action"
            slot="action"></slot>
      <slot slot="content"
            name="headerContent"></slot>
      <div slot="content"
           v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)">{{desc}}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index"
               :href="link.href">
              <a-icon :type="link.icon" />{{link.title}}</a>
          </template>
        </div>
      </div>
      <slot slot="extra"
            name="extra"></slot>
    </page-header>
    <div ref="page"
         :class="['page-content', layout]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import PageHeader from "@/components/page/PageHeader.vue";
import { Icon } from "ant-design-vue";

@Component({
  name: "PageLayout",
  components: {
    [PageHeader.name]: PageHeader,
    [Icon.name]: Icon
  },
  props: ["desc", "logo", "title", "avatar", "linkList", "extraImage"]
})
export default class PageLayout extends Vue {
  private breadcrumb: any[] = [];

  private layout() {
    return this.$store.state.setting.layout;
  }

  private mounted() {
    this.getBreadcrumb();
  }
  private updated() {
    this.getBreadcrumb();
  }

  private getBreadcrumb() {
    this.breadcrumb = this.$route.matched;
  }
}
</script>

<style lang="less" scoped>
.link {
  margin-top: 16px;
  line-height: 24px;
  a {
    font-size: 14px;
    margin-right: 32px;
    i {
      font-size: 22px;
      margin-right: 8px;
    }
  }
}
.page-content {
  &.side {
    margin: 24px 24px 0px;
  }
  &.head {
    margin: 24px auto 0;
    max-width: 1400px;
  }
}
</style>
