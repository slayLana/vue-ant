<template>
  <div>
    <h4>{{title}}</h4>
    <v-chart :force-fit="true"
             height="251"
             :data="data">
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

const data: any[] = [];
for (let i = 0; i < 12; i += 1) {
  data.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  });
}
const tooltip = [
  "x*y",
  (x: any, y: any) => ({
    name: x,
    value: y
  })
];

const scale = [
  {
    dataKey: "x",
    min: 2
  },
  {
    dataKey: "y",
    title: "时间",
    min: 1,
    max: 22
  }
];

@Component({
  name: "Bar",
  props: ["title"]
})
export default class Bar extends Vue {
  private data: any[] = data;
  private scale: any[] = scale;
  private tooltip: any[] = tooltip;
}
</script>

<style scoped>
</style>
