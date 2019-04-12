<template>
  <div class="theme-color"
       :style="{backgroundColor: color}"
       @click="toggle">
    <a-icon v-if="sChecked"
            type="check" />
  </div>
</template>

<script lang='ts'>
import { Icon } from "ant-design-vue";
import {
  Vue,
  Component,
  Watch,
  Prop,
  Inject,
  Provide
} from "vue-property-decorator";
import { CreateElement, VNode } from "vue";

@Component({
  name: "ColorCheckbox",
  components: {
    [Icon.name]: Icon
  }
})
export default class ColorCheckbox extends Vue {
  @Prop({
    type: String,
    required: true
  })
  private color!: string;
  @Prop({
    type: String,
    required: true
  })
  private value!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private checked!: boolean;
  private sChecked: boolean = this.checked;

  @Inject()
  private groupContext!: ColorCheckboxGroup;

  @Watch("sChecked")
  public sCheckedWatch() {
    const value = {
      value: this.value,
      color: this.color,
      checked: this.sChecked
    };
    this.$emit("change", value);
    const groupContext = this.groupContext;
    if (groupContext) {
      groupContext.handleChange(value);
    }
  }

  public created() {
    const groupContext = this.groupContext;
    if (groupContext) {
      this.sChecked = groupContext.defaultValues.indexOf(this.value) >= 0;
      groupContext.options.push(this);
    }
  }

  public toggle() {
    this.sChecked = !this.sChecked;
  }
}

@Component({
  name: "ColorCheckboxGroup"
})
export class ColorCheckboxGroup extends Vue {
  @Provide()
  public groupContext: ColorCheckboxGroup = this;

  @Prop({
    type: Array,
    required: false,
    default: () => []
  })
  public defaultValues!: any[];

  public options: any[] = [];

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private multiple!: boolean;

  private values: any[] = [];

  get colors() {
    const colors: any[] = [];
    this.options.forEach(item => {
      if (item.sChecked) {
        colors.push(item.color);
      }
    });
    return colors;
  }

  @Watch("values")
  public valuesWatch(newVal: any, oldVal: any) {
    // 此条件是为解决单选时，触发两次chang事件问题
    if (
      !(
        newVal.length === 1 &&
        oldVal.length === 1 &&
        newVal[0] === oldVal[0]
      ) ||
      this.multiple
    ) {
      this.$emit("change", this.values, this.colors);
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
    const clear = h("div", { attrs: { style: "clear: both" } });
    return h("div", {}, [this.$slots.default, clear]);
  }
}
</script>

<style lang="less" scoped>
.theme-color {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 8px;
  text-align: center;
  color: #fff;
  font-weight: bold;
}
</style>
