import _ from 'lodash'
import wu from '../libs/wu'
import config from '../config.json'

// when url is '/pokemon/:id' Wu changes 'route.item' model property value
wu.create('router', 'itemRoute', {
  urlPattern: config.itemUrl + ':id', // '/pokemon/:id'
  update: 'route.item'
})

// when 'route.item' changes Wu ensures 'data.selected' model property value
wu.create('ensurer', 'setSelected', {
  // when 'route.item' changes
  onChange: 'route.item',
  // Wu gets 'route.item.params.id' from model and
  args: 'route.item.params.id',
  // run this function with this value and
  run: (id) => id === undefined ? '' : id,
  // updates 'data.selected' model property with the function return value
  update: 'data.selected'
})

// get item from API when 'data.items' changes
wu.create('api', 'getItem', {
  // wait for 'data.items' changes
  onChange: 'data.items',
  // send an API request with this data
  request: {
    method: 'get',
    path: {
      run: (item) => item.url
    }
  },
  handlers: {
    // when API responses with 200 status code
    onCode200: [
      {
        // Wu gets 'data.items' from model
        args: ['data.items'],
        // updates the item with the same 'name' and
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
        // updates 'data.items' model property
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      // Wu sends a request for each item whose id = undefined
      run: (items) => _.filter(items, (item) => item.id === undefined)
    }
  }
})

// get item species from API when 'data.items' changes
wu.create('api', 'getSpecies', {
  // wait for 'data.items' changes
  onChange: 'data.items',
  // send an API request with this data
  request: {
    method: 'get',
    path: {
      run: (item) => item.speciesUrl
    }
  },
  handlers: {
    // when API responses with 200 status code
    onCode200: [
      {
        // Wu gets 'data.items' from model
        args: ['data.items'],
        // updates the item with the same 'id' and
        run: (items, response) => {
          const newItem = response.body
          _.updateCollectionItem(items, 'id', {
            id: newItem.id + '',
            evolutionUrl: _.get(newItem, 'evolution_chain.url', '')
          })
          return items
        },
        // updates 'data.items' model property
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      // Wu sends a request for each item that meets the following condition
      run: (items) => _.filter(items, (item) => item.speciesUrl && item.evolutionUrl === undefined)
    }
  }
})

// get item evolution from API when 'data.items' changes
wu.create('api', 'getEvolution', {
  // wait for 'data.items' changes
  onChange: 'data.items',
  // send an API request with this data
  request: {
    method: 'get',
    path: {
      run: (item) => item.evolutionUrl
    }
  },
  handlers: {
    // when API responses with 200 status code
    onCode200: [
      {
        // Wu gets 'data.items' from model
        args: ['data.items'],
        // updates the item with the same 'id' and
        run: (items, response, request) => {
          const newItem = response.body
          _.updateCollectionItem(items, 'id', {
            id: request.options.context.id,
            evolutionName: _.get(newItem, 'chain.species.name', '')
          })
          return items
        },
        // updates 'data.items' model property
        update: 'data.items'
      }
    ]
  },
  options: {
    context: {
      args: ['data.items'],
      // Wu sends a request for each item that meets the following condition
      run: (items) => _.filter(items, (item) => item.evolutionUrl && item.evolutionName === undefined)
    }
  }
})
