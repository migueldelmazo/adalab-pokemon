import React from 'react'
import Component from '../libs/react'
import config from '../config.json'
import './Search.scss'

export default class SearchView extends Component {

  onChange() {
    return ['api', 'data.selected']
  }

  render() {
    return (
      <div className='search'>
        <input
          autoFocus
          className='search__input'
          type='text'
          placeholder='Filtra Pokemons por nombre...'
          disabled={ this.get('isApiLoading') || this.get('isSelectedItem') }
          onChange={ this.onEv('setSearch') }
        />
      </div>
    )
  }

}
