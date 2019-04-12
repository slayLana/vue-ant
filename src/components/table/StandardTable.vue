<template>
  <div class="standard-table">
    <div class="alert">
      <a-alert type="info"
               :show-icon="true">
        <div slot="message">
          已选择&nbsp;<a style="font-weight: 600">{{selectedRows.length}}</a>&nbsp;项&nbsp;&nbsp;
          <template v-for="(item, index) in needTotalList"
                    v-if="item.needTotal">
            {{item.title}}总计&nbsp;
            <a :key="index"
               style="font-weight: 600">
              {{item.customRender ? item.customRender(item.total) : item.total}}
            </a>&nbsp;&nbsp;
          </template>
          <a style="margin-left: 24px">清空</a>
        </div>
      </a-alert>
    </div>
    <a-table :bordered="bordered"
             :loading="loading"
             :columns="columns"
             :dataSource="dataSource"
             :rowKey="rowKey"
             :pagination="pagination"
             :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: updateSelect}">
    </a-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Table, Alert } from "ant-design-vue";

@Component({
  name: "StandardTable",
  components: {
    [Table.name]: Table,
    [Alert.name]: Alert
  }
})
export default class StandardTable extends Vue {
  private needTotalList: any[] = [];
  private selectedRowKeys: any[] = [];

  @Prop({
    type: Boolean,
    required: false,
    default: true
  })
  private pagination!: boolean;

  @Prop({
    type: String,
    required: false,
    default: "key"
  })
  private rowKey!: string;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private loading!: boolean;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private bordered!: boolean;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private dataSource!: any[];

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private selectedRows!: any[];

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  private columns!: any[];

  public updateSelect(selectedRowKeys: any, selectedRows: any) {
    this.selectedRowKeys = selectedRowKeys;
    const list = this.needTotalList;
    this.needTotalList = list.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum: any, val: any) => {
          return sum + val[item.dataIndex];
        }, 0)
      };
    });
    this.$emit("change", selectedRowKeys, selectedRows);
  }

  public initTotalList(columns: any) {
    const totalList: any[] = [];
    columns.forEach((column: any) => {
      if (column.needTotal) {
        totalList.push({ ...column, total: 0 });
      }
    });
    return totalList;
  }
  public created() {
    this.needTotalList = this.initTotalList(this.columns);
  }

  @Watch("selectedRows")
  public selectedRowsWatch(selectedRows: any) {
    this.needTotalList = this.needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum: any, val: any) => {
          return sum + val[item.dataIndex];
        }, 0)
      };
    });
  }
}
</script>

<style scoped>
.alert {
  margin-bottom: 16px;
}
</style>
