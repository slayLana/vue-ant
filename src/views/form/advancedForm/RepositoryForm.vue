<template>
  <a-form @submit="handleSubmit"
          :form="form"
          class="form">
    <a-row class="form-row">
      <a-col :lg="6"
             :md="12"
             :sm="24">
        <a-form-item label="仓库名"
                     v-decorator="repository.name"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入仓库名称', whitespace: true}]}">
          <a-input placeholder="请输入仓库名称" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}"
             :lg="{span: 8}"
             :md="{span: 12}"
             :sm="24">
        <a-form-item label="仓库域名"
                     v-decorator="repository.domain"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入仓库域名', whitespace: true}, {validator: validate}]}">
          <a-input addonBefore="http://"
                   addonAfter=".github.io"
                   placeholder="请输入" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}"
             :lg="{span: 10}"
             :md="{span: 24}"
             :sm="24">
        <a-form-item label="仓库管理员"
                     v-decorator="repository.manager"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择管理员'}]}">
          <a-select placeholder="请选择管理员">
            <a-select-option value="王同学">王同学</a-select-option>
            <a-select-option value="李同学">李同学</a-select-option>
            <a-select-option value="黄同学">黄同学</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row">
      <a-col :lg="6"
             :md="12"
             :sm="24">
        <a-form-item label="审批人"
                     v-decorator="repository.auditor"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择审批员'}]}">
          <a-select placeholder="请选择审批员">
            <a-select-option value="王晓丽">王晓丽</a-select-option>
            <a-select-option value="李军">李军</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 6, offset: 2}"
             :lg="{span: 8}"
             :md="{span: 12}"
             :sm="24">
        <a-form-item label="生效日期"
                     v-decorator="repository.effectiveDate"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择生效日期'}]}">
          <a-range-picker style="width: 100%" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 8, offset: 2}"
             :lg="{span: 10}"
             :md="{span: 24}"
             :sm="24">
        <a-form-item label="仓库类型"
                     v-decorator="repository.type"
                     :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择仓库类型'}]}">
          <a-select placeholder="请选择仓库类型">
            <a-select-option value="公开">公开</a-select-option>
            <a-select-option value="私密">私密</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button
} from "ant-design-vue";
@Component({
  name: "RepositoryForm",
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [DatePicker.RangePicker.name]: DatePicker.RangePicker,
    [Button.name]: Button
  }
})
export default class RepositoryForm extends Vue {
  @Prop({
    type: Boolean,
    required: true,
    default: true
  })
  private showSubmit!: boolean;

  private repository: any[] = [];

  private form!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        window.console.log("Received values of form: ", values);
      }
    });
  }
  private validate(rule: any, value: any, f: any) {
    if (value !== undefined && value !== "iczer") {
      f("输入'iczer'试下？");
    }
    f();
  }
}
</script>

<style lang="less" scoped>
.form {
  .form-row {
    margin: 0 -8px;
  }
  .ant-col-md-12,
  .ant-col-sm-24,
  .ant-col-lg-6,
  .ant-col-lg-8,
  .ant-col-lg-10,
  .ant-col-xl-8,
  .ant-col-xl-6 {
    padding: 0 8px;
  }
}
</style>
