<template>
  <div class="chart-trend">
    {{term}}
    <span>{{rate}}%</span>
    <span :class="['chart-trend-icon', trend]"
          style="">
      <a-icon :type="'caret-' + trend" /></span>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Icon } from "ant-design-vue";

@Component({
  name: "Trend",
  components: {
    [Icon.name]: Icon
  }
})
export default class Trend extends Vue {
  @Prop({
    type: String,
    required: true,
    default: null
  })
  private term!: string;

  @Prop({
    type: Number,
    required: false,
    default: 0
  })
  private target!: number;

  @Prop({
    type: Number,
    required: false,
    default: 0
  })
  private value!: number;

  @Prop({
    type: Boolean,
    required: false,
    default: null
  })
  private isIncrease!: boolean;

  @Prop({
    type: Number,
    required: false,
    default: null
  })
  private percent!: number;

  @Prop({
    type: Number,
    required: false,
    default: 2
  })
  private scale!: number;

  private trend: string = this.isIncrease ? "up" : "down";
  private rate: number = this.percent;

  public created() {
    this.trend = this.caulateTrend();
    this.rate = Number.parseFloat(this.caulateRate());
  }
  public caulateRate() {
    return (this.percent === null
      ? (Math.abs(this.value - this.target) * 100) / this.target
      : this.percent
    ).toFixed(this.scale);
  }
  public caulateTrend() {
    const isIncrease =
      this.isIncrease === null ? this.value >= this.target : this.isIncrease;
    return isIncrease ? "up" : "down";
  }
}
</script>

<style lang="less" scoped>
.chart-trend {
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  .chart-trend-icon {
    font-size: 12px;
    &.up {
      color: #f5222d;
    }
    &.down {
      color: #52c41a;
    }
  }
}
</style>
