import React, { Component } from 'react'
import Fakerator from 'fakerator'
// CSS
import './Label.css'

export default class ShippingAddress extends Component {
  render() {
    const faker = Fakerator()
    return (
      <div className="label-shipping-address row">
        <div className="twelve columns">
          <p className="bold">Ship to:</p>
          <div className="label-address">
            <p>{faker.names.name()}</p>
            <p>{faker.address.street()}</p>
            <p id="label-city" className="bold">{this.props.city} {this.props.state} {this.props.zip}</p>
          </div>
        </div>
      </div>
    )
  }
}
