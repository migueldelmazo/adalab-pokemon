import React from 'react'
import Component from '../libs/react'

export default class SearchView extends Component {

  render() {
    return (
      <div className='search'>
        <input
          autoFocus
          type='text'
          placeholder='Filtra Pokemons por nombre...'
          onChange={ this.onEv('setSearch') }
        />
      </div>
    )
  }

}
