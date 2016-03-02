var React = require('react');
var FancyField = require('./fancy-field');
var FancyButton = require('./fancy-button');

var ExampleFancyForm = React.createClass({

	getInitialState: function() {
		return { 
      name: 'Frank',
      size: '1098',
      color: this.props.color == 'blue',
      animals: null,
      like_dogs: true,
      yes: 'yes'
    }
	},

  updateFormState: function(field) {
    var obj = {};
    obj[field.property] = field.value;
    this.setState(obj);
  },


  render: function() {

  	var nameErr = this.state.name && this.state.name.length ? null : "Who are you?!";

  	return (
  		<form className='example-wrap'>

		  	<FancyField 
          label='First name' 
          property='name'
          value={ this.state.name }
          updateChange={ this.updateFormState } 
          errors={ nameErr }/>

        <FancyField 
          label='Size' 
          property='size'
          value={ this.state.size }
          updateChange={ this.updateFormState } 
          disabled={ true } 
          disabledClickText='This is disabled on Wednesdays. No touchy.' />

        <FancyField 
          label='Favorite Cereal' 
          property='cereal'
          value={ this.state.cereal }
          updateChange={ this.updateFormState } />

        <FancyField 
          label='Animals' 
          property='animals'
          value={ this.state.animals }
          updateChange={ this.updateFormState }
          unit='animals per barn' 
          focusText='Enter the number of animals per barn.' 
          maxLength='5' />

        <FancyButton 
          label='Color' 
          property='color'
          value={ this.state.color }
          switch={ true }
          trueLabel='Blue'
          falseLabel='Red'
          updateChange={ this.updateFormState } />

        <FancyButton
            label='I like dogs'
            value={ this.state.like_dogs }
            property='like_dogs'
            updateChange={ this.updateFormState }
            checkbox={ true } />

        <FancyButton
            label='Send me cookies'
            value={ this.state.yes && this.state.like_dogs }
            disabled={ !this.state.like_dogs }
            property='yes'
            updateChange={ this.updateFormState }
            toggle={ true } />
	  	</form>
	  )
  }
});


module.exports = ExampleFancyForm;