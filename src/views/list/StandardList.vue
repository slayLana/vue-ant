<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8"
               :xs="24">
          <head-info title="我的待办"
                     content="8个任务"
                     :bordered="true" />
        </a-col>
        <a-col :sm="8"
               :xs="24">
          <head-info title="本周任务平均处理时间"
                     content="32分钟"
                     :bordered="true" />
        </a-col>
        <a-col :sm="8"
               :xs="24">
          <head-info title="本周完成任务数"
                     content="24个" />
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top: 24px"
            :bordered="false"
            title="标准列表">
      <div slot="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>进行中</a-radio-button>
          <a-radio-button>等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      <a-button type="dashed"
                style="width: 100%"
                icon="plus">添加</a-button>
      <a-list size="large"
              :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="i"
                     v-for="i in 5">
          <a-list-item-meta description="那是一种内在的东西， 他们到达不了，也无法触及的">
            <a-avatar slot="avatar"
                      size="large"
                      shape="square"
                      src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" />
            <a slot="title">Alipay</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多
                <a-icon type="down" /></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>付晓晓</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>2018-07-26 22:44</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="80"
                          style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import HeadInfo from "@/components/tool/HeadInfo.vue";
import {
  Radio,
  Row,
  Col,
  Card,
  List,
  Input,
  Progress,
  Menu,
  Dropdown,
  Button,
  Avatar,
  Icon
} from "ant-design-vue";

@Component({
  name: "StandardList",
  components: {
    [HeadInfo.name]: HeadInfo,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
    [Input.Search.name]: Input.Search,
    [Button.name]: Button,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [List.Item.Meta.name]: List.Item.Meta,
    [Avatar.name]: Avatar,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Dropdown.name]: Dropdown,
    [Progress.name]: Progress,
    [Icon.name]: Icon
  }
})
export default class StandardList extends Vue {}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
