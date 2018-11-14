class EventDelegate {
  constructor() {
    this.ele = document.documentElement

    /**
     * {
     *   'click' : {
     *    'DOMRef' : []  //handlers
     * }
     * }
     * 
     */
    this.handlerStore = {

    }


    // document add one listener for a specific event
    /**
     * {
     *  'click' : true
     * }
     */
    this.hasBind = {
    }
  }

  storeHandlersByEventNameAndTriggerEle(eventName, triggerEle, handler) {
    if (!this.handlerStore[eventName]) {
      this.handlerStore[eventName] = []
    }
    const correspondedHandlerData = this.handlerStore[eventName].filter(handlerData => handlerData.triggerEle === triggerEle)
    if (correspondedHandlerData.length === 0) {
      this.handlerStore[eventName].push({
        triggerEle,
        handlers: [handler],
      })
    } else {
      correspondedHandlerData[0].handlers.push(handler)
    }
  }

  getHandlersByEventNameAndTriggerEle(triggerEle, eventName) {
    const correspondedHandlerData = this.handlerStore[eventName]
      .filter(handlerData => handlerData.triggerEle === triggerEle)
    if (correspondedHandlerData.length !== 0) {
      return correspondedHandlerData[0].handlers
    }
    return []
  }

  addEventListener(triggerEle, eventName, handler) {
    if (!(triggerEle instanceof HTMLElement) || typeof eventName !== 'string' || !(handler instanceof Function)) {
      throw new Error('paramError')
    }
    this.storeHandlersByEventNameAndTriggerEle(eventName, triggerEle, handler)
    if (!this.hasBind[eventName]) {
      this.hasBind[eventName] = true
      this.ele.addEventListener(eventName, (e) => {
        const handlers = this.getHandlersByEventNameAndTriggerEle(e.target, eventName)
        if (handlers.length !== 0) {
          handlers.forEach(handler => handler(e))
        }
      }, true)
    }
  }
}



// example

const eventDelegate = new EventDelegate()

document.documentElement.addEventListener('click',(e) => {
  e.stopPropagation()
})

const inputElement = document.createElement('input')
inputElement.type = 'text'
inputElement.id = 'input'
document.body.appendChild(inputElement)

const inputEle = document.querySelector('#input')

eventDelegate.addEventListener(inputEle, 'focus', () => {
  console.log('focus')
})

eventDelegate.addEventListener(inputEle, 'focus', () => {
  console.log('focus second handler')
})

eventDelegate.addEventListener(inputEle, 'blur', () => {
  console.log('blur')
  console.log('blur, input value = ', inputEle.value)
})

eventDelegate.addEventListener(inputEle, 'blur', (e) => {
  console.log('blur second handler')
  console.log('blur, input value = ', e.target.value)
})
