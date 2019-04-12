import enquireJs from 'enquire.js'

const enquireScreen = (call: any) => {
  const hanlder = {
    match: () => {
      return call && call(true)
    },
    unmatch: () => {
      return call && call(false)
    }
  }
  enquireJs.register('only screen and (max-width: 767.99px)', hanlder)
}

export default enquireScreen
