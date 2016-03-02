var _ = require('underscore');
var React = require('react');
var classNames = require('classNames');


var FancyField = React.createClass({ 

  getInitialState: function() {
    var shouldFocus = this.props.initFocus || false;
    return ({ 
      focused: shouldFocus,
      isChanged: false
    });
  },

  componentDidMount: function() {
    if (this.state.focused) {
      this.refs.input.getDOMNode().focus();
    }
  },

  componentWillReceiveProps: function(props) {
    if (props.value == this.props.initialValue) {
      this.setState({ isChanged: false });
    }
  },

  showLabel: function() {
    this.setState({ focused: true });
  },

  hideLabel: function() {
    this.setState({ focused: false });
  },

  showDisabledText: function() {
    if (!this.props.disabledClickText || !this.props.disabled) { return; }
    this.setState({ disabledText: true });
    setTimeout(function() {
      this.setState({ disabledText: false });
    }.bind(this), 2100);
  },

  updateChange: function(e) {
    var newState = this.newState(e.target.value);
    if (this.props.updateChange) {
      this.props.updateChange(newState);
    }
  },

  newState: function(newVal) {
    var isChanged = newVal != this.props.initialValue;
    var shouldUpdateChangeState = this.state.isChanged ? !isChanged : isChanged;
    this.setState({ isChanged: isChanged });

    return {
      value: newVal,
      property: this.props.property,
      hasChanged: (shouldUpdateChangeState ? isChanged : null)
    };
  },

  render: function() {
    var {value, persistLabel, placeholder, property, label, type, disabled, initFocus, errors, ...other} = this.props;

    var fanciness = classNames('fancy-field', property, {'error': errors, 'disabled': disabled });
    var peekaboo = classNames('magic-label', {'populated' : value || persistLabel, 'focused' : this.state.focused });

    var placeholder = placeholder || label;
    var type = type || 'text';

    var unit = this.props.unit ? <p className={ classNames('unit', {'shown': value || this.state.focused }) }>{ this.props.unit }</p> : null;
    
    return (
      <div className={ fanciness }>
        <div className='wrap' onClick={ this.showDisabledText } >

          <p className={ peekaboo }>{ label }</p>

          <input 
            type={ type }
            onFocus={ this.showLabel } 
            onBlur ={ this.hideLabel } 
            onChange={ this.updateChange }
            ref='input' 
            value={ value } 
            placeholder={ placeholder }  
            disabled={ disabled } 
            id={ property }
            { ...other } />

            { unit }
            <FancyMessage class='focus-text' message={ this.props.focusText } shown={ this.state.focused } />
            <FancyMessage class='disabled-text' message={ this.props.disabledClickText } shown={ this.state.disabledText } />
            <FancyMessage class='error-message' message={ errors } shown='default' />

        </div>
      </div>
    );
  }
})


var FancyMessage = React.createClass({
  render: function () {
    var messages = this.props.message;

    if (typeof(messages) != 'string') {
      var messages = _.values(this.props.errors);
      messages = messages && messages[0];
    }

    if (!messages || !messages.length) { return null; }

    if (!messages.endsWith(".")) {
      messages += ".";
    }

    var messageClasses = classNames('message-container', this.props.class, {'shown': this.props.shown });

    return (
      <div className={ messageClasses }>
        <div className='carat' />
        <div className="message">{ messages }</div>
      </div>
    );
  }
})


module.exports = FancyField;