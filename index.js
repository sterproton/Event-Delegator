const eventDelegation = (agent, selector, eventName, handler) => {
  agent.addEventListener(eventName, (e) => {
    const target = e.target
    const nodes = document.querySelectorAll(selector)
    nodes.forEach(node => {
      let tar = target
      while (tar && tar !== agent) {
        if (node === tar) {
          return handler(nodes,e,node)
        }
        tar = tar.parentNode
      }
    })
  })
}