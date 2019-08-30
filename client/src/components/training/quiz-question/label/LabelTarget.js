import React, { Component } from 'react'
// Helpers
import { randomNumber } from '../../../../helpers/randomNumber';
// Images
import target from '../../../../images/target.png'
import barcode from '../../../../images/barcode.png'
// CSS
import './Label.css'

export default class LabelTarget extends Component {
  render() {
    return (
      <div className="label-target-contain row">
        <div className="label-target four columns">
          <img src={target} alt="UPS Label Target"/>
        </div>
        <div className="label-statezip eight columns">
          <h2>{this.props.state} {this.props.zip.slice(0, 3)} 
            <span>
              {randomNumber(0,9)}-0{randomNumber(0,9)}
            </span>
          </h2>
          <img id="label-barcode" src={barcode} alt="UPS Label Barcode"/>
        </div>
      </div>
    )
  }
}
