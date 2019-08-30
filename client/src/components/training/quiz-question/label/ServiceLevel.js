import React, { Component } from 'react'
// Helpers
import { randomNumber } from '../../../../helpers/randomNumber';
// CSS
import './Label.css'

export default class ServiceLevel extends Component {
  render() {

    // Set service level text
    const { serviceLevel } = this.props
    let serviceLevelText
    if(serviceLevel === 'g') {
      serviceLevelText = 'Ground'
    } else if (serviceLevel === '1') {
      serviceLevelText = 'Next Day Air'
    } else if (serviceLevel === '2') {
      serviceLevelText = '2 Day Select'
    } else {
      serviceLevelText = '3 Day Select'
    }
    
    return (
      <div className="label-service-level-contain row">
        <div className="label-service-level ten columns">
          <h3>UPS { serviceLevelText }</h3>
          <p>Tracking #: 1Z ORA {randomNumber(100,999)} {randomNumber(10,99)} {randomNumber(1000,9999)} {randomNumber(1000,9999)}
          </p>
        </div>
        <div className=" two columns">
          <h3 id="service-level-number">{ serviceLevel }</h3>
        </div>
      </div>
    )
  }
}
