import React, { Component } from 'react'
// import randomName from 'node-random-name'
import Fakerator from 'fakerator'
import { abbrState } from '../../../../helpers/stateToAbbr'
import { randomNumber } from '../../../../helpers/randomNumber'

// CSS
import './Label.css'

export default class ReturnHeader extends Component {
  render() {
    const faker = Fakerator()
    return (
      <div className="label-return-header row">
        <div className="label-return-address six columns">
          <p>{faker.names.name()}</p>
          <p>{faker.address.street()}</p>
          <p>{faker.address.city()} {abbrState(faker.address.state(), 'abbr')} {faker.address.postCode()}</p>
        </div>
        <div className="label-weight two columns bold">
          {randomNumber(1,70)}lbs
        </div>
        <div className="label-amount four columns bold">
          1 of {randomNumber(1,20)}
        </div>
      </div>
    )
  }
}
