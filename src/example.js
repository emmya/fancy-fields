import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import FancyField from './fancy-field';
import FancyButton from './fancy-button';

class ExampleFancyForm extends Component {
  constructor(props) {
    super(props);
    this.getChange = this.getChange.bind(this);

    this.state = {
      name: 'Nrlr',
      size: '1098',
      color: this.props.color == 'blue',
      animals: null,
      like_dogs: true,
      yes: 'yes'
    }
  }

  getChange(ff) {
    this.setState(_.object([ff.property], [ff.value]));
  }

  render() {
    const { name, size, cereal, animals, color, like_dogs, yes } = this.state;
  	const nameErr = name && name.length ? null : ["Who are you?!", "I am scared."];

  	return (
  		<form className='example-wrap'>

		  	<FancyField 
          label='First name' 
          property='name'
          value={ name }
          handleChange={ this.getChange } 
          errors={ nameErr }
          initFocus={ true } />

        <FancyField 
          property='size'
          value={ size }
          handleChange={ this.getChange } 
          disabled={ true } 
          disabledClickText='This is disabled on Wednesdays. No touchy.' />

        <FancyField 
          label='Favorite Cereal' 
          property='cereal'
          value={ cereal }
          handleChange={ this.getChange } />

        <FancyField 
          property='animals'
          value={ animals }
          handleChange={ this.getChange }
          unit='animals per barn' 
          focusText='Enter the number of animals per barn.' 
          maxLength='5' />

        <FancyButton 
          property='color'
          value={ color }
          switch={ true }
          labelOne='Blue'
          labelTwo='Red'
          handleChange={ this.getChange } />

        <FancyButton
            label='I like dogs'
            value={ like_dogs }
            property='like_dogs'
            handleChange={ this.getChange }
            checkbox={ true } />

        <FancyButton
            label='Send me cookies'
            value={ yes && like_dogs }
            disabled={ !like_dogs }
            property='yes'
            handleChange={ this.getChange }
            toggle={ true } />
	  	</form>
	  )
  }
}

export default ExampleFancyForm;