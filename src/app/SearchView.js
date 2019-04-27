import React from 'react'
import Component from '../libs/react'

export default class SearchView extends Component {

  onChange() {
    return 'api'
  }

  render() {
    return (
      <div className='search'>
        <input
          autoFocus
          type='text'
          placeholder='Filtra Pokemons por nombre...'
          disabled={ this.get('isApiLoading') }
          onChange={ this.onEv('setSearch') }
        />
      </div>
    )
  }

}
