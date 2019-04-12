<template>
  <div class="img-check-box"
       @click="toggle">
    <img :src="img" />
    <div v-if="sChecked"
         class="check-item">
      <a-icon type="check" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Icon, Progress } from "ant-design-vue";
import {
  Vue,
  Component,
  Prop,
  Watch,
  Inject,
  Provide
} from "vue-property-decorator";
import { CreateElement, VNode } from "vue";

@Component({
  name: "ImgCheckbox",
  components: {
    [Icon.name]: Icon
  }
})
export default class ImgCheckbox extends Vue {
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private checked!: boolean;
  @Prop({
    type: String,
    required: true
  })
  private img!: string;
  @Prop({
    required: true
  })
  private value!: any;

  private sChecked: boolean = this.checked;

  @Inject()
  private groupContext!: ImgCheckboxGroup;

  @Watch("sChecked")
  public sCheckedWatch() {
    const option = {
      value: this.value,
      checked: this.sChecked
    };
    this.$emit("change", option);
    const groupContext = this.groupContext;
    if (groupContext) {
      groupContext.handleChange(option);
    }
  }

  public created() {
    const groupContext = this.groupContext;
    if (groupContext) {
      this.sChecked =
        groupContext.defaultValues.length > 0
          ? groupContext.defaultValues.indexOf(this.value) >= 0
          : this.sChecked;
      groupContext.options.push(this);
    }
  }

  public toggle() {
    this.sChecked = !this.sChecked;
  }
}

@Component({
  name: "ImgCheckboxGroup"
})
export class ImgCheckboxGroup extends Vue {
  @Provide()
  public groupContext: ImgCheckboxGroup = this;

  public options: any[] = [];

  @Prop({
    type: Array,
    required: false,
    default: () => []
  })
  public defaultValues!: any[];

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private multiple!: boolean;

  private values: any[] = [];

  public provide() {
    return {
      groupContext: this
    };
  }

  @Watch("values")
  public valuesWatch(newVal: any, oldVal: any) {
    // 此条件是为解决单选时，触发两次chang事件问题
    if (
      !(newVal.length === 1 && oldVal.length === 1 && newVal[0] === oldVal[0])
    ) {
      this.$emit("change", this.values);
    }
  }

  public handleChange(option: any) {
    if (!option.checked) {
      this.values = this.values.filter(item => item !== option.value);
    } else {
      if (!this.multiple) {
        this.values = [option.value];
        this.options.forEach(item => {
          if (item.value !== option.value) {
            item.sChecked = false;
          }
        });
      } else {
        this.values.push(option.value);
      }
    }
  }

  public render(h: CreateElement): VNode {
    return h(
      "div",
      {
        attrs: { style: "display: flex" }
      },
      [this.$slots.default]
    );
  }
}
</script>

<style lang="less" scoped>
.img-check-box {
  margin-right: 16px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  .check-item {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding-top: 15px;
    padding-left: 24px;
    height: 100%;
    color: #1890ff;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
