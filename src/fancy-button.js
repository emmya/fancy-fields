var React = require('react');
var classNames = require('classNames');

var FancyButton = React.createClass({ 
	getChange: function(bool) {
		return {
			value: bool,
			hasChanged: bool != this.props.initialValue,
			property: this.props.property
		}
	},

  updateChange: function(e) {
   	var newState = this.getChange(e.currentTarget.checked);
   	this.props.updateChange(newState);
  },

  render: function() {
    var toggleDiv = (<div className='toggle'>
                      <span className='toggle-background'></span>
                      <span className='toggle-toggler'></span>
                    </div>);

    var switchDiv = (<div className='switch'>
                      <div className='switch-option true'>{ this.props.trueLabel }</div>{/*
                      */}<div className='switch-option false'>{ this.props.falseLabel }</div>
                    </div>);

    var toggler = this.props.checkbox ? null : 
                  this.props.switch ? switchDiv : toggleDiv;
    var id = this.props.checkbox ? 'checkbox' :
                  this.props.switch ? 'switch' : 'toggle';

    var classes = classNames('fancy-button', this.props.property, {'disabled': this.props.disabled});

	 	return (
	 		<label id={id} className={ classes } >
        <p>{ this.props.label }</p>
        <input type='checkbox' 
          ref='checkbox'
        	checked={ this.props.value } 
        	value={ this.props.value } 
        	onChange={ this.updateChange } 
        	disabled={ this.props.disabled }/>
        { toggler }
      </label>
  	)
  }
});

module.exports = FancyButton;
