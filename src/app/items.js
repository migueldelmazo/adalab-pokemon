import _ from 'lodash'
import wu from '../libs/wu'
import config from '../config.json'

wu.create('ensurer', 'initData', {
  onChange: 'app.ready',
  run: () => {
    return {
      items: [],
      page: {
        offset: 0,
        limit: 2
      },
      search: '',
      selected: ''
    }
  },
  update: 'data'
})

wu.create('watcher', 'initRouter', {
  onChange: 'app.ready',
  run: () => _.navigate('/')
})

wu.create('api', 'getItems', {
  onChange: 'data.page',
  when: {
    'data.page.offset': [_.isNumber, _.curryRight(_.gte)(0)],
    'data.page.limit': [_.isNumber, _.curryRight(_.gt)(0)]
  },
  request: {
    method: 'get',
    path: config.apiBaseUrl,
    query: {
      args: 'data.page'
    }
  },
  handlers: {
    onCode200: [
      {
        args: ['data.items'],
        run: (items, response) => _.concat(items, response.body.results),
        update: 'data.items'
      }
    ]
  }
})

wu.create('setter', 'nextPage', {
  args: 'data.page',
  run: (page) => page.offset + page.limit,
  update: 'data.page.offset'
})

wu.create('setter', 'setSearch', {
  update: 'data.search'
})

wu.create('getter', 'itemsFilteredByName', {
  args: ['data.items', 'data.search', 'data.selected'],
  run: (items, search, selected) => {
    const validItems = _.filter(items, (item) => item.id)
    return _.map(validItems, (item) => {
      item.visible = _.includesString(item.name, search)
      item.selected = item.id === selected
      return item
    })
  }
})

wu.create('getter', 'isSelectedItem', {
  args: 'data.selected',
  run: (selected) => !!selected
})

wu.create('getter', 'isApiLoading', {
  args: 'api.loading'
})
