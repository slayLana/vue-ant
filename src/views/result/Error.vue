<template>
  <a-card :bordered="false">
    <result style="margin-bottom: 16px; margin-top: 48px"
            :is-success="false"
            :title="title"
            :description="description">
      <template slot="action">
        <a-button type="primary">返回修改</a-button>
      </template>
      <div>
        <div style="fontSize: 16px; color: rgba(0, 0, 0, 0.85); fontWeight: 500; marginBottom: 16px">
          您提交的内容有如下错误：
        </div>
        <div style="margin-bottom: 16px">
          <a-icon type="close-circle-o"
                  style="color: #f5222d; margin-right: 8px" />
          您的账户已被冻结
          <a style="margin-left: 16px">立即解冻
            <a-icon type="right" /></a>
        </div>
        <div>
          <a-icon type="close-circle-o"
                  style="color: #f5222d; margin-right: 8px" />
          您的账户还不具备申请资格
          <a style="margin-left: 16px">立即升级
            <a-icon type="right" /></a>
        </div>
      </div>
    </result>
  </a-card>
</template>

<script lang='ts'>
import Result from "@/components/result/Result.vue";
import { Vue, Component } from "vue-property-decorator";
import { Card, Button, Icon } from "ant-design-vue";

@Component({
  name: "Error",
  components: {
    [Result.name]: Result,
    [Card.name]: Card,
    [Button.name]: Button,
    [Icon.name]: Icon
  }
})
export default class Error extends Vue {
  private title: string = "提交失败";
  private description: string = "请核对并修改以下信息后，再重新提交。";
}
</script>

<style scoped>
</style>
