export default {
  namespaced: true,
  state: {
    isMobile: false,
    theme: 'dark',
    layout: 'side',
    systemName: 'Soraka Admin',
    copyright: '2019 ONE PIECE 工作室出品',
    footerLinks: [
      { link: 'https://pro.ant.design', name: 'Pro首页' },
      { link: 'https://github.com/chenpapa/vue-ant', icon: 'github' },
      { link: 'https://ant.design', name: 'Ant Design' }
    ],
    multipage: true
  },
  mutations: {
    setDevice(state: any, isMobile: any) {
      state.isMobile = isMobile
    },
    setTheme(state: any, theme: any) {
      state.theme = theme
    },
    setLayout(state: any, layout: any) {
      state.layout = layout
    },
    setMultipage(state: any, multipage: any) {
      state.multipage = multipage
    }
  }
}
