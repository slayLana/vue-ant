<template>
  <div class="tag-select">
    <tag-select-option @click="toggleCheck">全部</tag-select-option>
    <slot></slot>
    <a @click="toggle"
       v-show="showTrigger"
       ref="trigger"
       class="trigger">展开
      <a-icon style="margin-left: 5px"
              :type="collapsed ? 'down' : 'up'" /></a>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
import { Icon } from "ant-design-vue";
import TagSelectOption from "./TagSelectOption.vue";

@Component({
  name: "TagSelect",
  components: {
    [TagSelectOption.name]: TagSelectOption,
    [Icon.name]: Icon
  }
})
export default class TagSelect extends Vue {
  private showTrigger: boolean = false;
  private collapsed: boolean = true;
  private screenWidth: number = document.body.clientWidth;
  private checkAll: boolean = false;

  @Watch("screenWidth")
  public screenWidthWatch() {
    this.showTrigger = this.needTrigger();
  }
  @Watch("collapsed")
  public collapsedWatch(val: any) {
    (this.$el as any).style.maxHeight = val ? "39px" : "78px";
  }

  public mounted() {
    // 此处延迟执行，是为解决mouted未完全完成情况下引发的trigger显示bug
    setTimeout(() => {
      this.showTrigger = this.needTrigger();
      (this.$refs.trigger as any).style.display = this.showTrigger
        ? "inline"
        : "none";
    }, 1);
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
  }
  public needTrigger() {
    return (
      this.$el.clientHeight < this.$el.scrollHeight ||
      this.$el.scrollHeight > 39
    );
  }
  public toggle() {
    this.collapsed = !this.collapsed;
  }
  public getAllTags() {
    const tagList = this.$children.filter((item: any) => {
      return item.isTagSelectOption;
    });
    return tagList;
  }
  public toggleCheck() {
    this.checkAll = !this.checkAll;
    const tagList = this.getAllTags();
    tagList.forEach((item: any) => {
      item.checked = this.checkAll;
    });
  }
}
</script>

<style lang="less" scoped>
.tag-select {
  user-select: none;
  position: relative;
  overflow: hidden;
  max-height: 39px;
  padding-right: 50px;
  display: inline-block;
}
.trigger {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
