<template>
  <span class="nut-cd-timer">
    <template v-if="showPlainText">
      <span class="nut-cd-block">{{plainText}}</span>
    </template>
    <template v-else>
      <template v-if="resttime.d > 0 && showDays">
        <span class="nut-cd-block">{{resttime.d}}</span>
        <span class="nut-cd-dot">天</span>
      </template>
      <span class="nut-cd-block">{{resttime.h}}</span><span class="nut-cd-dot">:</span><span class="nut-cd-block">{{resttime.m}}</span><span class="nut-cd-dot">:</span><span class="nut-cd-block">{{resttime.s}}</span>
    </template>
  </span>
</template>
<script lang='ts'>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

function restTime(t: number) {
  const ts = t;
  let rest = {
    d: "-",
    h: "--",
    m: "--",
    s: "--"
  };
  if (ts === 0) {
    rest = {
      d: "0",
      h: "00",
      m: "00",
      s: "00"
    };
  }
  if (ts) {
    const ds = 24 * 60 * 60 * 1000;
    const hs = 60 * 60 * 1000;
    const ms = 60 * 1000;

    const d = ts >= ds ? ts / ds : 0;
    const h = ts - d * ds >= hs ? (ts - d * ds) / hs : 0;
    const m = ts - d * ds - h * hs >= ms ? (ts - d * ds - h * hs) / ms : 0;
    const s = (ts - d * ds - h * hs - m * ms) / 1000;

    if (d >= 0) rest.d = d + "";
    if (h >= 0) rest.h = fill2(h);
    if (m >= 0) rest.m = fill2(m);
    if (s >= 0) rest.s = fill2(s);
  }
  return rest;
}

function fill2(v: number) {
  let v1 = v.toString();
  while (v1.length < 2) {
    v1 = "0" + v1;
  }
  return v1;
}

@Component({
  name: "countDown"
})
export default class CountDown extends Vue {
  protected restTime: number = 0;
  protected p: number = 0;
  protected _curr: number = 0;

  @Prop({
    default: false,
    type: Boolean
  })
  protected paused!: boolean;

  @Prop({
    default: false,
    type: Boolean
  })
  protected showDays!: boolean;

  @Prop({
    default: false,
    type: Boolean
  })
  protected showPlainText!: boolean;

  @Prop({
    default: 1000,
    type: Number
  })
  protected interval!: number;

  @Prop({
    // 可以是服务器当前时间
    default: Date.now(),
    type: [Number, String]
  })
  protected startTime!: number | string;

  @Prop({
    default: Date.now(),
    type: [Number, String]
  })
  protected endTime!: number | string;

  get resttime() {
    const rest = restTime(this.restTime);
    const { d, h, m, s } = rest;
    if (!this.showDays && Number(d) > 0) {
      rest.h = (Number(rest.h) + Number(d) * 24).toString();
      rest.d = "0";
    }
    return rest;
  }

  get plainText() {
    const { d, h, m, s } = this.resttime;

    return `${
      Number(d) > 0 && this.showDays ? d + "天" + h : h
    }小时${m}分${s}秒`;
  }

  @Watch("paused")
  pausedWatch(v: boolean, ov: boolean) {
    if (!ov) {
      this._curr = Date.now();
    } else {
      this.p += Date.now() - this._curr;
    }
  }

  protected created() {
    if (this.interval > 0) {
      let _start = 0;
      const curr = Date.now();
      const start = new Date(+this.startTime).getTime();
      const end = new Date(+this.endTime).getTime();
      const diffTime = curr - start;
      this.restTime = end - (start + diffTime);
      let timer = setInterval(() => {
        if (!this.paused) {
          let restTime = end - (new Date().getTime() - this.p + diffTime);
          restTime -= 1000;
          this.restTime = restTime;
          if (restTime < 0) {
            this.restTime = 0;
            clearInterval(timer);
          }
        } else {
          // 暂停
        }
      }, this.interval);
    }
  }
}
</script>


