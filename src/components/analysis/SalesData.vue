<template>
  <div style="">
    <a-radio-group>
      <a-radio-button value="a">全渠道</a-radio-button>
      <a-radio-button value="b">线上</a-radio-button>
      <a-radio-button value="c">门店</a-radio-button>
    </a-radio-group>
    <v-chart :forceFit="true"
             :height="height"
             :data="data"
             :scale="scale">
      <v-tooltip :showTitle="false"
                 dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item"
                position="right"
                :offsetX="-140" />
      <v-pie position="percent"
             color="item"
             :vStyle="pieStyle"
             :label="labelConfig" />
      <v-coord type="theta"
               :radius="0.75"
               :innerRadius="0.6" />
    </v-chart>
  </div>
</template>

<script lang='ts'>
import { Radio } from "ant-design-vue";
import { DataSet } from "@antv/data-set";
import { Vue, Component } from "vue-property-decorator";

const sourceData = [
  { item: "事例一", count: 40 },
  { item: "事例二", count: 21 },
  { item: "事例三", count: 17 },
  { item: "事例四", count: 13 },
  { item: "事例五", count: 9 }
];

const scale = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%"
  }
];

// const dv = new View().source(sourceData);
const ds = new DataSet();
const dv = ds.createView().source(sourceData);

dv.transform({
  type: "percent",
  field: "count",
  dimension: "item",
  as: "percent"
});
const data = dv.rows;

@Component({
  name: "SalesData",
  components: {
    [Radio.name]: Radio
  }
})
export default class SalesData extends Vue {
  private data: any[] = data;
  private scale: any[] = scale;
  private height: number = 356;
  private pieStyle: any = {
    stroke: "#fff",
    lineWidth: 1
  };
  private labelConfig: any[] = [
    "percent",
    {
      formatter: (val: any, item: any) => {
        return item.point.item + ": " + val;
      }
    }
  ];
}
</script>

<style scoped>
</style>
