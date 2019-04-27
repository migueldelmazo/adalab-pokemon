import React from 'react'
import Component from '../libs/react'
import ItemsView from './ItemsView'
import SearchView from './SearchView'

export default class AppView extends Component {

  render() {
    return (
      <div>
        <SearchView />
        <ItemsView />
      </div>
    )
  }

}
