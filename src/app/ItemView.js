import React from 'react'
import Component from '../libs/react'

export default class ItemView extends Component {

  render() {
    return (
      <li>
        { JSON.stringify(this.props) }
      </li>
    )
  }

}
