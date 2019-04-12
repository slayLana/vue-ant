<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <result title="支付完成"
              :is-success="true" />
      <a-form-item :wrapperCol="{span: 16, offset: 8}">
        <a-button type="primary"
                  @click="doOnceAgin">再转一笔</a-button>
        <a-button style="margin-left: 8px">查看账单</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import Result from "@/components/result/Result.vue";
import { Form, Button } from "ant-design-vue";

@Component({
  name: "Step3",
  components: {
    [Result.name]: Result,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Button.name]: Button
  }
})
export default class Step3 extends Vue {
  private doOnceAgin() {
    this.$emit("finish");
  }
}
</script>

<style scoped>
</style>
