<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-alert :closable="true"
               message="确认转账后，资金将直接打入对方账户，无法退回。"
               style="margin-bottom: 24px;" />
      <a-form-item label="付款账户"
                   :labelCol="{span: 5}"
                   :wrapperCol="{span: 19}"
                   class="stepFormText">
        ant-design@alipay.com
      </a-form-item>
      <a-form-item label="收款账户"
                   :labelCol="{span: 5}"
                   :wrapperCol="{span: 19}"
                   class="stepFormText">
        test@example.com
      </a-form-item>
      <a-form-item label="收款人姓名"
                   :labelCol="{span: 5}"
                   :wrapperCol="{span: 19}"
                   class="stepFormText">
        Alex
      </a-form-item>
      <a-form-item label="转账金额"
                   :labelCol="{span: 5}"
                   :wrapperCol="{span: 19}"
                   class="stepFormText">
        ￥ 5,000.00
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading"
                  type="primary"
                  @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px"
                  @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Form, Alert, Button } from "ant-design-vue";

@Component({
  name: "Step2",
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Alert.name]: Alert,
    [Button.name]: Button
  }
})
export default class Step2 extends Vue {
  private loading: boolean = false;

  private nextStep() {
    const that = this;
    that.loading = true;
    setTimeout(() => {
      that.$emit("nextStep");
    }, 1500);
  }
  private prevStep() {
    this.$emit("prevStep");
  }
}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;
  :global {
    .ant-form-item-label,
    .ant-form-item-control {
      line-height: 22px;
    }
  }
}
</style>
