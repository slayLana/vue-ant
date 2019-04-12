<template>
  <div class="task-group">
    <div class="task-head">
      <h3 class="title"><span v-if="count">{{count}}</span>{{title}}</h3>
      <div class="actions"
           style="float: right">
        <a-icon class="add"
                type="plus"
                draggable="true" />
        <a-icon class="more"
                style="margin-left: 8px"
                type="ellipsis" />
      </div>
    </div>
    <div class="task-content">
      <draggable :options="dragOptions">
        <slot></slot>
      </draggable>
    </div>
  </div>
</template>

<script lang='ts'>
import Draggable from "vuedraggable";
import { Icon } from "ant-design-vue";
import { Vue, Component, Prop } from "vue-property-decorator";

const dragOptions = {
  sort: true,
  scroll: true,
  scrollSpeed: 2,
  animation: 150,
  ghostClass: "dragable-ghost",
  chosenClass: "dragable-chose",
  dragClass: "dragable-drag"
};

@Component({
  name: "TaskGroup",
  components: {
    [Icon.name]: Icon,
    ["Draggable"]: Draggable
  }
})
export default class TaskGroup extends Vue {
  @Prop()
  private group!: any;
  @Prop()
  private title!: string;

  private dragOptions: any = { ...dragOptions, group: this.group };

  get count() {
    return (this.$slots as any).default.length;
  }
}
</script>

<style lang="less">
.task-group {
  width: 33.33%;
  padding: 8px 8px;
  background-color: #e1e4e8;
  border-radius: 6px;
  border: 1px solid #d1d4d8;
  .task-head {
    margin-bottom: 8px;
    .title {
      display: inline-block;
      span {
        display: inline-block;
        border-radius: 10px;
        margin: 0 8px;
        font-size: 12px;
        padding: 2px 6px;
        background-color: rgba(27, 31, 35, 0.15);
      }
    }
    .actions {
      display: inline-block;
      float: right;
      font-size: 18px;
      font-weight: bold;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
