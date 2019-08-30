import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class InputField extends Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>
          {this.props.label}
          {this.props.error && (<span className='form-error-description'> * {this.props.error}</span>)}
        </label>
        <input 
          id={this.props.name} 
          className={classnames("u-full-width", {
            'form-error': this.props.error
          })} 
          type={this.props.type}
          placeholder={this.props.placeholder}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        {this.props.info && (<small className="form-text text-muted">{this.props.info}</small>)}
      </div>
    )
  }
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

InputField.defaultProps = {
  type: 'text'
}