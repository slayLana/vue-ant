<template>
  <a-card :bordered="false"
          class="search-form">
    <a-form :form="form">
      <form-row label="所属类目">
        <a-form-item>
          <tag-select>
            <tag-select-option>类目一</tag-select-option>
            <tag-select-option>类目二</tag-select-option>
            <tag-select-option>类目三</tag-select-option>
            <tag-select-option>类目四</tag-select-option>
            <tag-select-option>类目五</tag-select-option>
            <tag-select-option>类目六</tag-select-option>
            <tag-select-option>类目七</tag-select-option>
            <tag-select-option>类目八</tag-select-option>
            <tag-select-option>类目九</tag-select-option>
            <tag-select-option>类目十</tag-select-option>
            <tag-select-option>类目十一</tag-select-option>
            <tag-select-option>类目十二</tag-select-option>
            <tag-select-option>类目十三</tag-select-option>
            <tag-select-option>类目十四</tag-select-option>
            <tag-select-option>类目十五</tag-select-option>
            <tag-select-option>类目十六</tag-select-option>
          </tag-select>
        </a-form-item>
      </form-row>
      <form-row label="owner"
                style="padding-bottom: 11px">
        <a-form-item v-decorator="owner"
                     initialValue="['1', '2']">
          <a-select mode="multiple"
                    style="max-width: 286px">
            <a-select-option value="3">我自己</a-select-option>
            <a-select-option value="1">吴家豪</a-select-option>
            <a-select-option value="2">周星星</a-select-option>
            <a-select-option value="4">李宁</a-select-option>
          </a-select>
        </a-form-item>
        <a @click="lookMyself">只看自己的</a>
      </form-row>
      <form-row label="其他选项">
        <a-row>
          <a-col :span="8">
            <a-form-item label="活跃用户"
                         :labelCol="{span: 6}"
                         :wrapperCol="{span: 12}">
              <a-select placeholder="不限">
                <a-select-option value="1">周星星</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="好评度"
                         :labelCol="{span: 6}"
                         :wrapperCol="{span: 12}">
              <a-select placeholder="不限">
                <a-select-option value="1">优秀</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </form-row>
    </a-form>
  </a-card>
</template>

<script lang='ts'>
import TagSelect from "@/components/tool/TagSelect.vue";
import TagSelectOption from "@/components/tool/TagSelectOption.vue";
import FormRow from "@/components/form/FormRow.vue";
import { Vue, Component } from "vue-property-decorator";
import { Card, Form, Select, Row, Col } from "ant-design-vue";

@Component({
  name: "SearchForm",
  components: {
    [FormRow.name]: FormRow,
    [TagSelectOption.name]: TagSelectOption,
    [TagSelect.name]: TagSelect,
    [Card.name]: Card,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
export default class SearchForm extends Vue {
  private form!: any;
  private owner!: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private mounted() {
    this.form.getFieldDecorator("owner", { initialValue: ["1", "2"] });
  }

  private lookMyself() {
    this.form.setFieldsValue({
      owner: "3"
    });
  }
}
</script>

<style lang="less" scoped>
.search-form {
  margin-bottom: 24px;
}
</style>
