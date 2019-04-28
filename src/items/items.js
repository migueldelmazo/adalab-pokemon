import _ from 'lodash'
import wu from '../libs/wu'
import config from '../config.json'

// navigate to home when app is ready
wu.create('watcher', 'initRouter', {
  // wait for 'app.ready' model property changes
  onChange: 'app.ready',
  // and its value is true
  when: {
    'app.ready': _.isTrue
  },
  // then navigates to home
  run: () => _.navigate('/')
})

// init default data when app is ready
wu.create('ensurer', 'initData', {
  // wait for 'app.ready' model property changes
  onChange: 'app.ready',
  // and its value is true
  when: {
    'app.ready': _.isTrue
  },
  // then returns the initial data
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
  // and updates 'data' model property
  update: 'data'
})

// get items from API
wu.create('api', 'getItems', {
  // wait for 'data.page' changes and
  onChange: 'data.page',
  // its value is as follows and
  when: {
    'data.page.offset': [_.isNumber, _.curryRight(_.gte)(0)], // great than or equal 0
    'data.page.limit': [_.isNumber, _.curryRight(_.gt)(0)] // great than 0
  },
  // send an API request with this data
  request: {
    method: 'get',
    path: config.apiBaseUrl,
    query: {
      args: 'data.page'
    }
  },
  handlers: {
    // when API responses with 200 status code
    onCode200: [
      {
        // Wu gets 'data.items' from model
        args: ['data.items'],
        // concats current 'data.items' with new items
        run: (items, response) => _.concat(items, response.body.results),
        // and updates 'data.items' model property
        update: 'data.items'
      }
    ]
  }
})

// this setter is executed from view without arguments
wu.create('setter', 'nextPage', {
  // Wu gets 'data.page' from model and
  args: 'data.page',
  // runs this function with this value as first argument
  run: (page) => page.offset + page.limit,
  // and updates 'data.page.offset' model property
  update: 'data.page.offset'
})

// this setter is executed from view
wu.create('setter', 'setSearch', {
  // with 'text' as first argument
  run: (text) => text,
  // and updates 'data.search' model property
  update: 'data.search'
})

// this getter is executed from view
wu.create('getter', 'itemsFilteredByName', {
  // Wu gets this values from model and
  args: ['data.items', 'data.search', 'data.selected'],
  // runs this function with this values
  // and returns all items with 'visible' and 'selected' property
  run: (items, search, selected) => {
    const validItems = _.filter(items, (item) => item.id)
    return _.map(validItems, (item) => {
      item.visible = _.includesString(item.name, search)
      item.selected = item.id === selected
      return item
    })
  }
})

// this getter is executed from view
wu.create('getter', 'isSelectedItem', {
  // Wu gets this value from model and
  args: 'data.selected',
  // and this function returns if there is a selected item
  run: (selected) => !!selected
})

// this getter is executed from view
wu.create('getter', 'isApiLoading', {
  // Wu gets this value from model and
  args: 'api.loading'
  // and returns it
})
