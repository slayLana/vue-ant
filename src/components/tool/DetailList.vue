<template>
  <div :class="['detail-list', size === 'small' ? 'small' : 'large', layout === 'vertical' ? 'vertical': 'horizontal']">
    <div v-if="title"
         class="title">{{title}}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Inject, Provide } from "vue-property-decorator";
import { CreateElement, VNode } from "vue";
import { Col, Row } from "ant-design-vue";

const responsive = [
  { xs: 24 },
  { xs: 24, sm: 12 },
  { xs: 24, sm: 12, md: 8 },
  { xs: 24, sm: 12, md: 6 }
];

@Component({
  name: "DetailListItem"
})
export class DetailListItem extends Vue {
  @Prop({
    type: String,
    required: false
  })
  private term!: string;

  @Inject()
  private col!: number;

  private renderTerm(h: CreateElement, term: any) {
    return term
      ? h(
          "div",
          {
            attrs: {
              class: "term"
            }
          },
          [term]
        )
      : null;
  }
  private renderContent(h: CreateElement, content: any) {
    return h(
      "div",
      {
        attrs: {
          class: "content"
        }
      },
      [content]
    );
  }
  private render(h: CreateElement) {
    const term = this.renderTerm(h, this.$props.term);
    const content = this.renderContent(h, this.$slots.default);
    return h(
      Col,
      {
        props: responsive[this.col]
      },
      [term, content]
    );
  }
}

@Component({
  name: "DetailList",
  components: {
    [Row.name]: Row
  }
})
export default class DetailList extends Vue {
  @Prop({
    type: String,
    required: false
  })
  private title!: string;

  @Prop({
    type: Number,
    required: false,
    default: 3
  })
  @Provide()
  private col: number = this.col > 4 ? 4 : this.col;

  @Prop({
    type: String,
    required: false,
    default: "large"
  })
  private size!: string;

  @Prop({
    type: String,
    required: false,
    default: "horizontal"
  })
  private layout!: string;
}
</script>

<style lang="less">
.detail-list {
  .title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bolder;
    margin-bottom: 16px;
  }
  .term {
    // Line-height is 22px IE dom height will calculate error
    line-height: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    display: table-cell;
    &:after {
      content: ":";
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .content {
    line-height: 22px;
    width: 100%;
    padding-bottom: 16px;
    color: rgba(0, 0, 0, 0.65);
    display: table-cell;
  }
  &.small {
    .title {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: normal;
      margin-bottom: 12px;
    }
    .term,
    .content {
      padding-bottom: 8px;
    }
  }
  &.large {
    .term,
    .content {
      padding-bottom: 16px;
    }
  }
  &.vertical {
    .term {
      padding-bottom: 8px;
    }
    .term,
    .content {
      display: block;
    }
  }
}
</style>
