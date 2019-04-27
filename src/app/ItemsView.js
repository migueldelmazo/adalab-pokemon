import React from 'react'
import Component from '../libs/react'
import ItemView from './ItemView'

export default class ItemsView extends Component {

  onChange() {
    return 'data'
  }

  renderItems() {
    return this.get('items').map((item) => {
      return (
        <ItemView
          key={ item.id }
          id={ item.id }
          href={ item.href }
          img={ item.img }
          name={ item.name }
          types={ item.types }
        />
      )
    })
  }

  render() {
    return (
      <div>
        <ul>
          { this.renderItems() }
        </ul>
      </div>
    )
  }

}
