import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

import logo from '../../images/logo.svg';
import './Navigation.css';

class Navigation extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.user;
    const userLinks = (
      <nav>
        {this.props.user.user.admin ? (
          <Link to='/admin' className='nav-item'>
            Admin Panel
          </Link>
        ) : null}
        <li id='nav-username' className='nav-item'>
          {this.props.user.user.username}
        </li>
        <li onClick={this.onLogoutClick.bind(this)} className='nav-item'>
          Logout
        </li>
      </nav>
    );
    const guestLinks = (
      <nav>
        <Link to='/register' className='nav-item'>
          Sign Up
        </Link>
        <Link to='/login' className='nav-item'>
          Login
        </Link>
      </nav>
    );
    return (
      <section id='nav-contain'>
        <div className='container'>
          <div id='logo-contain'>
            <Link to='/'>
              <img id='logo' src={logo} alt='UPS' />
            </Link>
          </div>
          {isAuthenticated ? userLinks : guestLinks}
        </div>
      </section>
    );
  }
}

Navigation.propTypes = {};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
