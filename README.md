
# Fancy Fields

#### Fancy React.js form components for all your fancy needs

Customizable inputs with animated float labels, toggles, switches, and checkboxes for React.js.

![image](https://raw.githubusercontent.com/emmya/fancy-fields/master/src/images/fancyexample2.gif)

---

#### March 2017 commit

Fancy goes es6. 

Some state and method names changed for clarity. 

Removed the hasChanged feature.

No props are required anymore.

Switch props renamed from `trueLabel` and `falseLabel` to `labelOne` and `labelTwo`.

Field `focus` prop renamed to `initFocus`.

---


##### TL;DR

You need the FancyField and FancyButton React components (**src/fancy-field.js**, **src/fancy-button.js**).

You need **fancy-styles.scss**, which requires **mixins.scss** and **fancy-variables.scss**. 

To run demo:

```npm install```

```npm start```


---

*The bizness*

Dependencies are react, underscore, and classnames.

For easy style customization, reassign the variables in fancy-variables.scss.  For individual styling, each fancy item has a class equaling its property name. 

---

#### Fancy Field

The float label input of your dreams. The following props are ~~required~~ recommended.

- **label**: defaults to property.
- **property**: string, the property name associated with the field. Also sets the input id
- **value**: useful if setting the field value via a parent component.
- **updateChange**: function fired onChange. Returns an object with value, property ~~, and hasChanged~~.

Basic example:

```
var FancyDog = React.createClass({
    getInitialState: function() {
        return { dog: this.props.dog };
    },

    updateFormState: function(field) {
        var obj = {};
        obj[field.property] = field.value;
        this.setState(obj);
    },

    // or, with underscore.js
    // updateFormState(e) {
    //     this.setState(_.object([e.property], [e.value]));
    // }

    render: function() {
        return (
            <FancyField 
                label='Dog breed'
                property='dog'
                value={ this.state.dog }
                updateChange={ this.updateFormState } />
        )
    }
});
```


The following props are available to level-up fanciness.

- **initFocus**: boolean; sets cursor focus on mount.
- **placeholder**: define to make the placeholder text different from the float label.
- **type**: input type. defaults to 'text' if unspecified.
- **errors**: treated as a boolean to show error styles. If set as a string, object, or array, will reveal an error message.
- **unit**: displays a unit (eg, 'minutes') when the field has a value.
- **persistLabel**: keeps the magic label revealed even when the input is empty and unfocused.
- **focusText**: message revealed while input is focused.
- **disabledClickText**: message shown for 2 seconds after clicking on disabled field.
- ~~**initialValue**: required if you want to use ```hasChanged```. hasChanged is passed via the updateChange prop and indicates when the value becomes newly changed, or when it returns to its original value.~~

FancyField will attribute any extra props to the input. Eg, if you want to set a max length on the field, adding a maxLength prop will do the trick.


---


#### Fancy Buttons

'Button' is misleading, for fancy buttons are much more than that. They can handle booleans in 3 different fancy ways. Choose from a toggle (default), switch, or a classic checkbox.

Recommended props:

- **label** - or -  **labelOne** & **labelTwo** if **switch** is set to true
- **value**: current boolean value.
- **property**: the property associated with the button.
- **updateChange**: fired when the button is clicked. Returns an object with value, property~, and hasChanged~.

Optional props:

- **checkbox**: boolean; show the button as a checkbox.
- **switch**: boolean; show the button as a switch. requires a 'trueLabel' and 'falseLabel'.
- **disabled**
- **initialValue**


---

Demo was whipped together with [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate).

 
---

Bonus!!! Enjoy a carat mixin, popup message component that accepts multiple prop types, styles to change fancy message positioning, and more!!!