<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial">
    <span style="cursor: pointer">
      <a-avatar class="avatar"
                size="small"
                shape="circle"
                :src="currUser.avatar" />
      <span>{{currUser.name}}</span>
    </span>
    <a-menu style="width: 150px"
            slot="overlay">
      <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/login">
          <a-icon type="poweroff" />
          <span>退出登录</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script lang='ts'>
import { Dropdown, Avatar, Menu, Icon } from "ant-design-vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "HeaderAvatar",
  components: {
    [Dropdown.name]: Dropdown,
    [Avatar.name]: Avatar,
    [Menu.name]: Menu,
    [Icon.name]: Icon,
    [Menu.Item.name]: Menu.Item,
    [Menu.Divider.name]: Menu.Divider
  }
})
export default class HeaderAvatar extends Vue {
  get currUser() {
    return this.$store.state.account.user;
  }
}
</script>

<style lang="less" scoped>
.avatar {
  margin: 20px 4px 20px 0;
  color: #1890ff;
  background: hsla(0, 0%, 100%, 0.85);
  vertical-align: middle;
}
</style>
