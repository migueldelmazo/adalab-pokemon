import React from 'react'
import Component from '../libs/react'

export default class ItemView extends Component {

  render() {
    return (
      <li>
        <a href={ this.props.href }>
          { JSON.stringify(this.props) }
        </a>
      </li>
    )
  }

}
