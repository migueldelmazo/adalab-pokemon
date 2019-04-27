import wu from '../libs/wu'

wu.create('ensurer', 'initData', {
  onChange: 'app.ready',
  run: () => {
    return {
      items: [],
      page: {
        offset: 0,
        limit: 2
      }
    }
  },
  update: 'data'
})

wu.create('api', 'getItems', {
  onChange: 'data.page',
  request: {
    method: 'get',
    path: 'https://pokeapi.co/api/v2/pokemon/',
    query: {
      args: 'data.page'
    }
  },
  handlers: {
    onCode200: [
      {
        args: ['data.items'],
        run: (items, response) => response.body.results,
        update: 'data.items'
      }
    ]
  }
})

wu.create('getter', 'items', {
  args: ['data.items'],
  run: (items) => items || []
})
