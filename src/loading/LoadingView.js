import React from 'react'
import Component from '../libs/react'
import './Loading.scss'

export default class AppView extends Component {

  onChange() {
    // this view is rendered when 'api' model property changes
    return 'api'
  }

  render() {
    return (
      <div className='loading'>
        <div
          className='loading-inner'
          hidden={ !this.get('isApiLoading') }
        />
      </div>
    )
  }

}
