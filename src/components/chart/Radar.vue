<template>
  <v-chart :forceFit="true"
           height="400"
           :data="data"
           :padding="[20, 20, 95, 20]"
           :scale="scale">
    <v-tooltip />
    <v-axis :dataKey="axis1Opts.dataKey"
            :line="axis1Opts.line"
            :tickLine="axis1Opts.tickLine"
            :grid="axis1Opts.grid" />
    <v-axis :dataKey="axis2Opts.dataKey"
            :line="axis2Opts.line"
            :tickLine="axis2Opts.tickLine"
            :grid="axis2Opts.grid" />
    <v-legend dataKey="user"
              marker="circle"
              :offset="30" />
    <v-coord type="polar"
             radius="0.8" />
    <v-line position="item*score"
            color="user"
            :size="2" />
    <v-point position="item*score"
             color="user"
             :size="4"
             shape="circle" />
  </v-chart>
</template>

<script lang='ts'>
import { DataSet } from "@antv/data-set";
import { Vue, Component } from "vue-property-decorator";

const sourceData = [
  { item: "引用", a: 70, b: 30, c: 40 },
  { item: "口碑", a: 60, b: 70, c: 40 },
  { item: "产量", a: 50, b: 60, c: 40 },
  { item: "贡献", a: 40, b: 50, c: 40 },
  { item: "热度", a: 60, b: 70, c: 40 },
  { item: "引用", a: 70, b: 50, c: 40 }
];

const ds = new DataSet();
const dv = ds.createView().source(sourceData);

dv.transform({
  type: "fold",
  fields: ["a", "b", "c"],
  key: "user",
  value: "score"
});

const scale = [
  {
    dataKey: "score",
    min: 0,
    max: 80
  }
];

const data = dv.rows;

const axis1Opts = {
  dataKey: "item",
  line: null,
  tickLine: null,
  grid: {
    lineStyle: {
      lineDash: null
    },
    hideFirstLine: false
  }
};
const axis2Opts = {
  dataKey: "score",
  line: null,
  tickLine: null,
  grid: {
    type: "polygon",
    lineStyle: {
      lineDash: null
    }
  }
};

@Component({
  name: "Radar"
})
export default class Radar extends Vue {
  private sourceData: any = sourceData;
  private data: any = data;
  private axis1Opts: any = axis1Opts;
  private axis2Opts: any = axis2Opts;
  private scale: any = scale;
}
</script>

<style scoped>
</style>
