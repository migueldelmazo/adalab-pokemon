import React from 'react'
import Component from '../libs/react'
import ItemView from './ItemView'

export default class ItemsView extends Component {

  onChange() {
    return 'data'
  }

  renderItems() {
    return this.get('itemsFilteredByName').map((item) => {
      return (
        <ItemView
          key={ item.id }
          id={ item.id }
          evolutionName={ item.evolutionName }
          href={ item.href }
          img={ item.img }
          name={ item.name }
          selected={ item.selected }
          types={ item.types }
          visible={ item.visible }
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
