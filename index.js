const eventDelegation = (agent, selector, eventName, handler) => {
  agent.addEventListener(eventName, (e) => {
    const target = e.target
    const nodes = document.querySelectorAll(selector)
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i]
      let tar = target
      while (tar && target !== agent) {
        if (node === tar) {
          return handler(e,node)
        }
        tar = tar.parentNode
      }
    }
  })
}