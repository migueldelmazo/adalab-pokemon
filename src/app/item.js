import _ from 'lodash'
import wu from '../libs/wu'

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
            href: '/pokemon/' + newItem.id,
            img: _.get(newItem, 'sprites.front_default', ''),
            name: newItem.name,
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
