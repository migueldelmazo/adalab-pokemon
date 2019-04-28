import React from 'react'
import ReactDom from 'react-dom'
import wu from './libs/wu'
import AppView from './app/AppView'
import './items/items'
import './items/item'

wu.start()

ReactDom.render(<AppView />, document.getElementById('root'))
