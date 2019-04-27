import React from 'react'
import Component from '../libs/react'

export default class ItemsView extends Component {

  onChange() {
    return 'data'
  }

  render() {
    return (
      <div>
        <ul>
          { JSON.stringify(this.get('items')) }
        </ul>
      </div>
    )
  }

}
