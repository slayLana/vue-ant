import Mock from 'mockjs';
import '@/mock/extend';

const user = Mock.mock({
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  welcome: '@WELCOME',
  timefix: '@TIMEFIX',
  position: '@POSITION'
});

Mock.mock('/login', 'post', (body: any) => {
  const result: any = {};
  const { name, password } = JSON.parse(body);

  if (name !== 'admin' || password !== '888888') {
    result.code = -1;
    result.message = '账户名或密码错误（admin/888888）';
  } else {
    result.code = 0;
    result.message = Mock.mock('@TIMEFIX') + '，欢迎回来';
    result.data = {};
    result.data.user = user;
  }
  return result;
});
