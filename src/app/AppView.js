import React from 'react'
import Component from '../libs/react'
import ItemsView from '../items/ItemsView'
import LoadingView from '../loading/LoadingView'
import SearchView from '../search/SearchView'
import './App.scss'

export default class AppView extends Component {

  render() {
    return (
      <div className='layout'>
        <LoadingView />
        <SearchView />
        <ItemsView />
        <div className='corner corner--top corner--left' />
        <div className='corner corner--top corner--right' />
        <div className='corner corner--bottom corner--left' />
        <div className='corner corner--bottom corner--right' />
      </div>
    )
  }

}
