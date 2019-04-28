import React from 'react'
import Component from '../libs/react'
import ItemView from './ItemView'
import config from '../config.json'
import './Items.scss'

export default class ItemsView extends Component {

  onChange() {
    return 'data'
  }

  renderItems(items) {
    return items.map((item) => {
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
    const items = this.get('itemsFilteredByName')
    const visibleItems = items.filter((item) => item.visible)
    const isNotFound = items.length > 0 && visibleItems.length === 0
    const isSelected = this.get('isSelectedItem')
    return (
      <div className={ this.getClassName(isNotFound, 'items-outer--empty', '', 'items-outer ') }>
        <ul className={ this.getClassName(isSelected, 'items--selected', '', 'items ') }>
          { this.renderItems(visibleItems) }
        </ul>
        <div className='items-not-found'>
          <img
            className='items-not-found-inner'
            alt={ config.i18n.items.notFound }
            src='/assets/imgs/pikachu-sad.png'
            title='Pikachu'
          />
        </div>
      </div>
    )
  }
  
}
