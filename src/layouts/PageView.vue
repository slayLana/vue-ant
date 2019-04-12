<template>
  <page-layout :desc="desc"
               :title="title"
               :linkList="linkList">
    <div slot="extra"
         class="extraImg">
      <img :src="extraImage" />
    </div>
    <transition name="page-toggle">
      <keep-alive v-if="multipage">
        <router-view ref="page" />
      </keep-alive>
      <router-view ref="page"
                   v-else />
    </transition>
  </page-layout>
</template>

<script lang='ts'>
import PageHeader from "@/components/page/PageHeader.vue";
import PageLayout from "./PageLayout.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "PageView",
  components: {
    [PageLayout.name]: PageLayout,
    [PageHeader.name]: PageHeader
  }
})
export default class PageView extends Vue {
  private title: string | undefined = "";
  private desc: string = "";
  private linkList: any[] = [];
  private extraImage: string = "";

  get multipage() {
    return this.$store.state.setting.multipage;
  }

  private mounted() {
    this.getPageHeaderInfo();
  }
  private updated() {
    this.getPageHeaderInfo();
  }
  private getPageHeaderInfo() {
    this.title = this.$route.name;
    const page: any = this.$refs.page;
    if (page) {
      this.desc = page.desc;
      this.linkList = page.linkList;
      this.extraImage = page.extraImage;
    }
  }
}
</script>

<style lang="less" scoped>
.extraImg {
  margin-top: -60px;
  text-align: center;
  width: 195px;
  img {
    width: 100%;
  }
}
</style>
