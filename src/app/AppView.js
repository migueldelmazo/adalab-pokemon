import React from 'react'
import Component from '../libs/react'
import ItemsView from './ItemsView'
import SearchView from './SearchView'
import './Main.scss'
import './App.scss'

export default class AppView extends Component {

  render() {
    return (
      <div className='layout'>
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
