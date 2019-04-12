<template>
  <a-checkable-tag @change="$emit('click')"
                   class="tag-default"
                   v-model="checked">
    <slot></slot>
  </a-checkable-tag>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Tag } from "ant-design-vue";

@Component({
  name: "TagSelectOption",
  components: {
    [Tag.CheckableTag.name]: Tag.CheckableTag
  }
})
export default class TagSelectOption extends Vue {
  @Prop({
    type: String,
    required: false,
    default: "default"
  })
  private size!: string;

  private checked: boolean = false;

  private isTagSelectOption: boolean = true;
}
</script>

<style lang="less" scoped>
.tag-default {
  font-size: 14px;
  padding: 0 8px;
  height: auto;
  margin-right: 24px;
}
</style>
