<template>
  <page-layout title="单号：234231029431"
               logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list size="small"
                 :col="2"
                 slot="headerContent"
                 style="margin-left: 44px;">
      <detail-list-item term="创建人">曲丽丽</detail-list-item>
      <detail-list-item term="订购产品">XX服务</detail-list-item>
      <detail-list-item term="创建时间">2018-08-07</detail-list-item>
      <detail-list-item term="关联单据"><a>12421</a></detail-list-item>
      <detail-list-item term="生效日期">2018-08-07 ~ 2018-12-11</detail-list-item>
      <detail-list-item term="备注">请于两个工作日内确认</detail-list-item>
    </detail-list>
    <a-row slot="extra">
      <a-col :xs="24"
             :sm="12">
        <div class="text">状态</div>
        <div class="heading">待审批</div>
      </a-col>
      <a-col :xs="24"
             :sm="12">
        <div class="text">订单金额</div>
        <div class="heading">¥ 568.08</div>
      </a-col>
    </a-row>
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button>
          <a-icon type="ellipsis" />
        </a-button>
      </a-button-group>
      <a-button type="primary">主操作</a-button>
    </template>
    <a-card :bordered="false"
            title="流程进度">
      <a-steps :current="1"
               progressDot>
        <a-step title="创建项目">
          <a-step-item-group slot="description">
            <a-step-item link="/dashboard/workplace"
                         title="曲丽丽"
                         icon="dingding-o" />
            <a-step-item title="2016-12-12 12:32" />
          </a-step-item-group>
        </a-step>
        <a-step title="部门初审">
          <a-step-item-group slot="description">
            <a-step-item link="/form/step"
                         title="周毛毛"
                         icon="dingding-o" />
            <a-step-item link="/result/success"
                         title="催一下"
                         icon="bell" />
          </a-step-item-group>
        </a-step>
        <a-step title="财务复核">
        </a-step>
        <a-step title="完成">
        </a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top: 24px"
            :bordered="false"
            title="用户信息">
      <detail-list>
        <detail-list-item term="用户姓名">付晓晓</detail-list-item>
        <detail-list-item term="会员卡号">32943898021309809423</detail-list-item>
        <detail-list-item term="身份证">3321944288191034921</detail-list-item>
        <detail-list-item term="联系方式">18112345678</detail-list-item>
        <detail-list-item term="联系地址">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
      <detail-list title="信息组">
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item>&nbsp;</detail-list-item>
        <detail-list-item term="某某数据">725</detail-list-item>
        <detail-list-item term="该数据更新时间">2018-08-08</detail-list-item>
        <detail-list-item>&nbsp;</detail-list-item>
      </detail-list>
      <a-card type="inner"
              title="多层信息组">
        <detail-list title="组名称"
                     size="small">
          <detail-list-item term="负责人">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称"
                     size="small"
                     :col="1">
          <detail-list-item term="学名">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item>
        </detail-list>
        <a-divider style="margin: 16px 0" />
        <detail-list title="组名称"
                     size="small"
                     :col="2">
          <detail-list-item term="学名">林东东</detail-list-item>
          <detail-list-item term="角色码">1234567</detail-list-item>
          <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
          <detail-list-item term="过期时间">2018-08-08</detail-list-item>
          <detail-list-item term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item>
        </detail-list>
      </a-card>
    </a-card>
    <a-card style="margin-top: 24px"
            :bordered="false"
            title="用户近半年来电记录">
      <div class="nodata">
        <a-icon type="frown-o" />暂无数据</div>
    </a-card>
    <a-card style="margin-top: 24px"
            :bordered="false"
            :tabList="tabList"
            :activeTabKey="activeTabKey"
            @tabChange="(key) => {this.activeTabKey = key}">
      <a-table v-if="activeTabKey === '1'"
               :columns="operationColumns"
               :dataSource="operation1"
               :pagination="false" />
      <a-table v-if="activeTabKey === '2'"
               :columns="operationColumns"
               :dataSource="operation2"
               :pagination="false" />
      <a-table v-if="activeTabKey === '3'"
               :columns="operationColumns"
               :dataSource="operation3"
               :pagination="false" />
    </a-card>
  </page-layout>
</template>

<script lang='ts'>
import PageLayout from "@/layouts/PageLayout.vue";
import DetailList, { DetailListItem } from "@/components/tool/DetailList.vue";
import AStepItem, { AStepItemGroup } from "@/components/tool/AStepItem.vue";
import { Vue, Component } from "vue-property-decorator";
import {
  Col,
  Row,
  Button,
  Table,
  Card,
  Icon,
  Divider,
  Steps
} from "ant-design-vue";

import {
  operation1,
  operation2,
  operation3,
  operationColumns
} from "@/mock/common/tableData";

const tabList = [
  {
    key: "1",
    tab: "操作日志一"
  },
  {
    key: "2",
    tab: "操作日志二"
  },
  {
    key: "3",
    tab: "操作日志三"
  }
];

@Component({
  name: "AdvancedDetail",
  components: {
    [AStepItemGroup.name]: AStepItemGroup,
    [AStepItem.name]: AStepItem,
    [DetailListItem.name]: DetailListItem,
    [DetailList.name]: DetailList,
    [PageLayout.name]: PageLayout,
    [Col.name]: Col,
    [Row.name]: Row,
    [Card.name]: Card,
    [Button.name]: Button,
    [Button.Group.name]: Button.Group,
    [Icon.name]: Icon,
    [Steps.name]: Steps,
    [Steps.Step.name]: Steps.Step,
    [Divider.name]: Divider,
    [Table.name]: Table
  }
})
export default class AdvancedDetail extends Vue {
  private tabList: any[] = [];
  private operationColumns: any = operationColumns;
  private operation1: any = operation1;
  private operation2: any = operation2;
  private operation3: any = operation3;
  private activeTabKey: string = "2";

  private onTabChange(key: any) {
    window.console.log(key);
  }
}
</script>

<style lang="less" scoped>
.text {
  color: rgba(0, 0, 0, 0.45);
}
.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}
.nodata {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;
  & :global {
    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }
}
</style>
