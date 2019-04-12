<template>
  <div>
    <a-card class="card"
            title="仓库管理"
            :bordered="false">
      <repository-form ref="repository"
                       :showSubmit="false" />
    </a-card>
    <a-card class="card"
            title="任务管理"
            :bordered="false">
      <task-form ref="task"
                 :showSubmit="false" />
    </a-card>
    <a-card title="用户管理"
            :bordered="false">
      <table-form />
    </a-card>
    <footer-tool-bar>
      <a-button type="primary"
                @click="validate"
                :loading="loading">提交</a-button>
    </footer-tool-bar>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { Card, Button } from "ant-design-vue";
import RepositoryForm from "./RepositoryForm.vue";
import TaskForm from "./TaskForm.vue";
import TableForm from "./TableForm.vue";
import FooterToolBar from "@/components/tool/FooterToolBar.vue";

@Component({
  name: "AdvancedForm",
  components: {
    [FooterToolBar.name]: FooterToolBar,
    [TableForm.name]: TableForm,
    [TaskForm.name]: TaskForm,
    [RepositoryForm.name]: RepositoryForm,
    [Card.name]: Card,
    [Button.name]: Button
  }
})
export default class AdvancedForm extends Vue {
  private desc: string = "高级表单常见于一次性输入和提交大批量数据的场景。";
  private loading: boolean = false;

  private validate() {
    (this.$refs.repository as any).form
      .validateFields((err: any, values: any) => {
        if (!err) {
          window.console.log("Received values of form: ", values);
        }
      })(this.$refs.task as any)
      .form.validateFields((err: any, values: any) => {
        if (!err) {
          window.console.log("Received values of form: ", values);
        }
      });
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>
