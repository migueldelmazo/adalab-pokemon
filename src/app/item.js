import _ from 'lodash'
import wu from '../libs/wu'
import config from '../config.json'

wu.create('router', 'itemRoute', {
  urlPattern: config.itemUrl + ':id',
  update: 'route.item'
})

wu.create('ensurer', 'setSelected', {
  onChange: 'route.item',
  args: 'route.item.params.id',
  run: (id) => id === undefined ? '' : id,
  update: 'data.selected'
})

wu.create('api', 'getItem', {
  onChange: 'data.items',
  request: {
    method: 'get',
    path: {
      run: (item) => item.url
    }
  },
  handlers: {
    onCode200: [
      {
        args: ['data.items'],
        run: (items, response) => {
          const newItem = response.body
          _.updateCollectionItem(items, 'name', {
            id: newItem.id + '',
            href: config.itemUrl + newItem.id,
            img: _.get(newItem, 'sprites.front_default', ''),
            name: newItem.name,
            speciesUrl: _.get(newItem, 'species.url', ''),
            types: _.map(newItem.types, (type) => type.type.name)
          })
          return items
        },
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      run: (items) => _.filter(items, (item) => item.id === undefined)
    }
  }
})

wu.create('api', 'getSpecies', {
  onChange: 'data.items',
  request: {
    method: 'get',
    path: {
      run: (item) => item.speciesUrl
    }
  },
  handlers: {
    onCode200: [
      {
        args: ['data.items'],
        run: (items, response) => {
          const newItem = response.body
          _.updateCollectionItem(items, 'id', {
            id: newItem.id + '',
            evolutionUrl: _.get(newItem, 'evolution_chain.url', '')
          })
          return items
        },
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      run: (items) => _.filter(items, (item) => item.speciesUrl && item.evolutionUrl === undefined)
    }
  }
})

wu.create('api', 'getEvolution', {
  onChange: 'data.items',
  request: {
    method: 'get',
    path: {
      run: (item) => item.evolutionUrl
    }
  },
  handlers: {
    onCode200: [
      {
        args: ['data.items'],
        run: (items, response, request) => {
          const newItem = response.body
          _.updateCollectionItem(items, 'id', {
            id: request.options.context.id,
            evolutionName: _.get(newItem, 'chain.species.name', '')
          })
          return items
        },
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      run: (items) => _.filter(items, (item) => item.evolutionUrl && item.evolutionName === undefined)
    }
  }
})
