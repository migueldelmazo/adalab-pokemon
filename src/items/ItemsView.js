import React from 'react'
import Component from '../libs/react'
import ItemView from './ItemView'
import config from '../config.json'
import './Items.scss'

export default class ItemsView extends Component {

  onChange() {
    // this view is rendered when 'data' model property changes
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
  
  renderNextPageButton(items, isNotFound) {
    return items.length > 0 && !isNotFound ? (
      <div className='pagination'>
        <i
          className='pagination__next-page-button material-icons'
          onClick={ this.onEv('nextPage')}
        >arrow_forward_ios</i>
      </div>
    ) : null
  }
  
  renderNotFound() {
    return (
      <div className='items-not-found'>
        <img
          className='items-not-found-inner'
          alt={ config.i18n.items.notFound }
          src='/assets/imgs/pikachu-sad.png'
          title=''
        />
      </div>
    )
  }
  
  ensureBodyOverflow(isSelected) {
    document.body.classList.toggle('body--blocked', isSelected)
  }
  
  getDivClassName(isNotFound, isSelected) {
    const notFoundClassName = isNotFound ? 'items-outer--empty ' : ''
    const selectedClassName = isSelected ? 'items--selected ' : ''
    return 'items-outer ' + notFoundClassName + selectedClassName
  }

  render() {
    const items = this.get('itemsFilteredByName')
    const visibleItems = items.filter((item) => item.visible)
    const isNotFound = items.length > 0 && visibleItems.length === 0
    const isSelected = this.get('isSelectedItem')
    this.ensureBodyOverflow(isSelected)
    return (
      <div className={ this.getDivClassName(isNotFound, isSelected) }>
        <ul className='items'>
          { this.renderItems(visibleItems) }
        </ul>
        { this.renderNextPageButton(items, isNotFound) }
        { this.renderNotFound() }
      </div>
    )
  }
  
}
