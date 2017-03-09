import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import cns from 'classnames';

class FancyField extends Component {
  constructor(props) {
    super(props);

    this.showLabel = this.showLabel.bind(this);
    this.hideLabel = this.hideLabel.bind(this);
    this.onFancyChange = this.onFancyChange.bind(this);
    this.getNewState = this.getNewState.bind(this);
    this.showDisabledText = this.showDisabledText.bind(this);
    this.renderUnitComponent = this.renderUnitComponent.bind(this);

    this.state = {
      isFocused: props.initFocus,
      isChanged: false,
      showingDisabledText: false
    }
  }

  componentDidMount() {
    if (this.state.isFocused) {
      this.fancyInput.focus();
    }
  }

  componentWillReceiveProps(props) {
    if (props.value == this.props.initialValue) {
      this.setState({ isChanged: false });
    }
  }

  render() {
    const { showingDisabledText, isFocused } = this.state;
    const { disabled, disabledClickText, errors, focusText, initFocus, 
            label, persistLabel, placeholder, property, type, unit, 
            value, ...other } = this.props;

    const fanciness = cns('fancy-field', property, {
                         'error': errors, 
                         'populated': value,
                         'disabled': disabled,
                         'focused': isFocused });

    const peekaboo = cns('magic-label', {
                        'populated': value || persistLabel, 
                        'focused': isFocused });

    const backupName = property ? (property[0].toUpperCase() + property.slice(1)) : null;
    
    return (
      <div className={ fanciness }>
        <div className='wrap' onClick={ this.showDisabledText } >

          <p className={ peekaboo }>{ label || backupName }</p>

          <input 
            type={ type || 'text' }
            value={ value } 
            placeholder={ placeholder || label || backupName }
            disabled={ disabled }
            id={ property }
            onFocus={ this.showLabel } 
            onBlur ={ this.hideLabel } 
            onChange={ this.onFancyChange }
            ref={(input) => { this.fancyInput = input }}
            { ...other } />

            { unit ? this.renderUnitComponent() : null }
            
            { focusText ?
            <FancyMessage classes='focus-text' 
                          message={ focusText } 
                          shown={ isFocused } /> : null }

            { disabledClickText ?
            <FancyMessage classes='disabled-text' 
                          message={ disabledClickText } 
                          shown={ showingDisabledText } /> : null }

            <FancyMessage classes='error-message' 
                          message={ errors } 
                          shown={ errors } />
        </div>
      </div>
    )
  }

  showLabel() {
    this.setState({ isFocused: true });
  }

  hideLabel() {
    this.setState({ isFocused: false });
  }

  showDisabledText() {
    if (!this.props.disabledClickText || !this.props.disabled) return;
    
    this.setState({ showingDisabledText: true });
    setTimeout(function() {
      this.setState({ showingDisabledText: false });
    }.bind(this), 2100);
  }

  onFancyChange(e) {
    if (this.props.handleChange) {
      const newState = this.getNewState(e.target.value);
      this.props.handleChange(newState);
    }
  }

  getNewState(newVal) {
    return {
      value: newVal,
      property: this.props.property
    };
  }

  renderUnitComponent() {
    return (
      <p className={ cns('unit', {'shown': this.props.value || this.state.isFocused }) }>
        { this.props.unit }
      </p>
    )
  }
}

FancyField.propTypes = {
  property: PropTypes.string,
  updateChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,

  unit: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  initFocus: PropTypes.bool,
  persistLabel: PropTypes.bool,
  errors: PropTypes.any,
  disabledClickText: PropTypes.string,
  focusText: PropTypes.string
}

FancyField.defaultProps = {
  property: 'fancy'
}


const FancyMessage = ({ message, classes, shown }) => {

  if (!message || (!message.length && !_.isEmpty(message))) return <noscript />;

  const messageClasses = cns('message-container', classes, {
                            'shown': shown });
  
  let messageToShow = typeof(message) != 'string' ?
                          _.values(message).join(' ') : message;

  if (!messageToShow.slice(-1).match(/\!|\.|\?/)) {
    messageToShow += ".";
  }

  return (
    <div className={ messageClasses }>
      <div className='carat' />
      <div className="message">{ messageToShow }</div>
    </div>
  )
}

export default FancyField;