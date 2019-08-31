import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Training.css';
import icon from '../../images/icon.svg';
import { firstLetterUpper } from '../../helpers/firstLetterUpper';

export default class Training extends Component {
  render() {
    const positions = ['overall', 'sort-isle', 'pickoff'];
    let positionItem = positions.map((position, index) => (
      <div className='one-third column module' key={index}>
        <img src={icon} className='module-icon' alt='United Parcel Service' />
        <Link
          to={`${this.props.location.pathname}/${position}`}
          className='module-link'
        >
          {firstLetterUpper(position)}
        </Link>
      </div>
    ));
    return (
      <section className='container training-contain'>
        <h1>Welcome to UPS Operations Sort Training</h1>
        <p>
          This application is for demonstration purposes only, and not to be
          used for actual training. This application is not affiliated with the
          United Parcel Service.
        </p>
        <h2>Please select your work area below</h2>
        <div className='training-options row'>{positionItem}</div>
      </section>
    );
  }
}
