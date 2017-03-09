import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import cns from 'classnames';

class FancyButton extends Component {
  constructor(props) {
    super(props);

    this.onFancyChange = this.onFancyChange.bind(this)
    this.renderSwitch = this.renderSwitch.bind(this)
  }

  render() {
    const { checkbox, property, disabled, value, label } = this.props;

    const id = checkbox ? 'checkbox' :
               this.props.switch ? 'switch' : 'toggle';

    const classes = cns('fancy-button', property, {
                        'disabled': disabled });

	 	return (
	 		<label id={ id } className={ classes } >

        <p>{ label }</p>

        <input type='checkbox' 
          ref='checkbox'
        	checked={ value } 
        	value={ value } 
        	onChange={ this.onFancyChange } 
        	disabled={ disabled }/>

        { checkbox ? null : 
          this.props.switch ? this.renderSwitch() : this.renderToggle() }
      </label>
  	)
  }

  onFancyChange(e) {
    if (this.props.handleChange) {
      this.props.handleChange({
        value: e.currentTarget.checked,
        property: this.props.property });
    }
  }

  renderToggle() {
    return (
      <div className='toggle'>
        <span className='toggle-background'></span>
        <span className='toggle-toggler'></span>
      </div>
    )
  }

  renderSwitch() {
    return (
      <div className='switch'>
        <div className='switch-option true'>{ this.props.labelOne }</div>{/*
      */}<div className='switch-option false'>{ this.props.labelTwo }</div>
      </div>
    )
  }
}

FancyButton.propTypes = {
  property: PropTypes.string,
  updateChange: PropTypes.func,
  value: PropTypes.bool,

  label: PropTypes.string,

  switch: PropTypes.bool,
  labelOne: PropTypes.string,
  labelTwo: PropTypes.string,

  checkbox: PropTypes.bool,
  disabled: PropTypes.bool
}

export default FancyButton;
