const _handlers = {}


const Subject = {
  subscribe (...args) {
    const [event, handler] = args

    if (!_handlers[event]) _handlers[event] = []
    _handlers[event].push(handler)
  },
  unsubscribe (...args) {
    const [event, handler] = args

    if (!_handlers[event]) return
    _handlers[event] = _handlers[event].filter(func => func !== handler)
  },
  fire (event, data = null) {
    if (!_handlers[event]) return
    _handlers[event].forEach(handler => {
      if (typeof handler === 'function') {
        handler(data)
      }
    })
  }
}

Object.freeze(Subject)

export default Subject
