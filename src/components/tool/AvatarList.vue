<template>
  <div class="avatar-list">
    <ul>
      <slot>
      </slot>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Avatar, Tooltip } from "ant-design-vue";
import { CreateElement, VNode } from "vue";

@Component({
  name: "AvatarListItem"
})
export class AvatarListItem extends Vue {
  @Prop({
    type: String,
    required: false,
    default: "small"
  })
  private size!: string;
  @Prop({
    type: String,
    required: true
  })
  private src!: string;

  @Prop({
    type: String,
    required: false
  })
  private tips!: string;

  private renderAvatar(h: CreateElement, size: any, src: any) {
    return h(Avatar, { props: { size: size, src: src } }, []);
  }

  private render(h: CreateElement) {
    const avatar = this.renderAvatar(h, this.$props.size, this.$props.src);
    return h("li", { class: "avatar-item" }, [
      !this.$props.tips
        ? h(Tooltip, { props: { title: this.$props.tips } }, [avatar])
        : avatar
    ]);
  }
}

@Component({
  name: "AvatarList"
})
export default class AvatarList extends Vue {}
</script>

<style lang="less">
.avatar-list {
  display: inline-block;
  ul {
    display: inline-block;
    margin-left: 8px;
    font-size: 0;
    .avatar-item {
      display: inline-block;
      font-size: 14px;
      margin-left: -8px;
      width: 20px;
      height: 20px;
      :global {
        .ant-avatar {
          border: 1px solid #fff;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
