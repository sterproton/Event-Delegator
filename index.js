class EventDelegator{
  
  constructor(){
    this.ele = document.documentElement
    this.handlerStore = {
    }
    // 针对一种事件，只需要对document绑定一次对应的事件
    this.hasBind = {
    }
  }

  storeHandlersByEventNameAndTrigerEle(eventName, trigerEle, handler, isCapture){
    if (!this.handlerStore[eventName]) {
      this.handlerStore[eventName] = []
    }
    const corresponsedHandlerData = this.handlerStore[eventName].filter(handlerData => handlerData.trigerEle === trigerEle)
    if (corresponsedHandlerData.length === 0 ) {
      this.handlerStore[eventName].push({
        trigerEle,
        handlers:[{
          handler,
          isCapture,
        }]
      })
    } else{
      corresponsedHandlerData[0].handlers.push({
        handler,
        isCapture,
      })
    }
  }

  getHandlersByEventNameAndTrigerEle(trigerEle, eventName){
    const corresponsedHandlerData = this.handlerStore[eventName]
    .filter(handlerData => handlerData.trigerEle === trigerEle)
    if (corresponsedHandlerData.length !== 0) {
      return corresponsedHandlerData[0].handlers
    }
    return []
  }

  addEventListener(trigerEle, eventName, handler, isCapture = false){
    if (! trigerEle instanceof HTMLElement || typeof eventName !== 'string' || !handler instanceof Function) {
      throw new Error('paramError')
    }
    this.storeHandlersByEventNameAndTrigerEle(eventName, trigerEle, handler, isCapture)
    if (!this.hasBind[eventName]) {
      this.hasBind[eventName] = true
      this.ele.addEventListener(eventName, (e) => {
        const handlers = this.getHandlersByEventNameAndTrigerEle(e.target, eventName)
        if (handlers.length !== 0) {
          handlers.forEach(handler => handler.handler(e))
        }
        e.stopPropagation()
      }, true)
    }
  }
}

const eventDelegator = new EventDelegator()