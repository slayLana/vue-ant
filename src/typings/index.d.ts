import { AxiosStatic } from 'axios'
import { Form } from 'ant-design-vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
    $form: Form
  }
}
