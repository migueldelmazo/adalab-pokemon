import _ from 'lodash'
import { wu } from './common'

const ensureApiLoading = () => {
  if (isApiLoading()) {
    wu.model.set('api.loading', true)
  } else {
    setTimeout(() => {
      wu.model.set('api.loading', isApiLoading())
    }, 100)
  }
}

const isApiLoading = () => {
  return _.some(wu._private.api.queue, {
    state: 'sending'
  })
}

export default {

  init: () => {
    wu._private.api.queue = []
  },

  add: (request) => {
    const itemFound = _.find(wu._private.api.queue, (item) => {
      return item.name === request.name &&
        _.isEqual(item.request, request.request) &&
        (item.state === 'added' || item.state === 'sending')
    })
    if (!itemFound) {
      request.state = 'added'
      wu._private.api.queue.push(request)
      _.consoleLog('api', 'API: added ' + request.name, 'Path:', request.request.path, 'Request:', request)
    }
  },

  getNext: () => {
    return _.find(wu._private.api.queue, {
      state: 'added'
    })
  },

  start: (request) => {
    request.state = 'sending'
    ensureApiLoading()
  },

  close: (request) => {
    request.state = 'sent'
    ensureApiLoading()
  }

}
