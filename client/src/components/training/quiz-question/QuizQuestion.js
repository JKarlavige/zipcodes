import React, { Component } from 'react'
import ReturnHeader from './label/ReturnHeader'
import ShippingAddress from './label/ShippingAddress'
import LabelTarget from './label/LabelTarget'
import ServiceLevel from './label/ServiceLevel'
import './QuizQuestion.css'

export default class QuizQuestion extends Component {
  render() {
    const { city, state, zip, serviceLevel } = this.props
    return (
      <div className="quiz-question">
        <div className="package-label module">
          <ReturnHeader />                            
          <ShippingAddress city={city} state={state} zip={zip} />
          <LabelTarget city={city} state={state} zip={zip}/>
          <ServiceLevel serviceLevel={serviceLevel} />
        </div>
      </div>
    )
  }
}
