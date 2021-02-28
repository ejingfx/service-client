export default (context, inject) => {
  /* eslint-disable no-debugger, no-console */
  const logger = (msg) => {
    const type = typeof msg

    switch (type) {
      case 'object': {
        return console.log('Logger: ', msg)
      }
      default: {
        return console.log(`Logger: ${msg}`)
      }
    }
  }
  inject('logger', logger)
  context.$logger = logger
}
