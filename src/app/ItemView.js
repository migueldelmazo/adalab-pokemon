import React from 'react'
import Component from '../libs/react'
import config from '../config.json'
import './Item.scss'

export default class ItemView extends Component {
  
  renderCloseButton() {
    return (
      <i
        className='item__close-button material-icons'
        onClick={ this.onClickClose }
      >close</i>
    )
  }
  
  renderImg () {
    return (
      <img
        className='item-media__img'
        alt={ this.props.name }
        src={ this.props.img }
        title={ this.props.name }
      />
    )
  }
  
  renderCaption () {
    return (
      <span className='item-media__caption'>
        ID / { this.props.id }
      </span>
    )
  }
  
  renderName () {
    return (
      <p className='item-content__name'>
        { this.props.name }
      </p>
    )
  }

  renderTypes(types) {
    const typesElements = types.map((type, idx) => {
      return (
        <li
          key={ idx }
          className='item-content-types__item'
        >{ type }</li>
      )
    })
    return (
      <ul className='item-content-types'>
        { typesElements }
      </ul>
    )
  }

  renderDefinition() {
    return this.props.evolutionName !== undefined && this.props.evolutionName !== this.props.name
      ? (
      <dl className='item-content-definition'>
        <dt className='item-content-definition__term'>{ config.i18n.items.item.evolutionFrom }</dt>
        <dd className='item-content-definition__description'>
          { this.props.evolutionName }
        </dd>
      </dl>
      ) : null
  }
  
  renderCorner() {
    return (
      <div className='item-corner'>
        <span className='item-corner-arrow'>
          <i className='item-corner-arrow__icon material-icons'>arrow_forward_ios</i>
        </span>
      </div>
    )
  }

  onClickClose() {
    window.history.back()
  }

  render() {
    const visibleClassName = this.props.visible ? 'item--visible ' : ''
    const selectedClassName = this.props.selected ? 'item--selected ' : ''
    return (
      <li className={ 'item ' + visibleClassName + selectedClassName }>
        <a
          className='item-inner'
          href={ this.props.href }
        >
          { this.renderCloseButton() }
          <div className='item-media'>
            { this.renderImg() }
            { this.renderCaption() }
          </div>
          <div className='item-content'>
            { this.renderName() }
            { this.renderTypes(this.props.types) }
            { this.renderDefinition() }
          </div>
          { this.renderCorner() }
        </a>
      </li>
    )
  }

}
