
# Fancy Field

#### Fancy React.js form components for all your fancy needs


**TL;DR**

You need the FancyField and FancyButton React components (src/fancy-field.js, src/fancy-button.js).

You need fancy-styles.scss, which requires mixins.scss and fancy-variables.scss. Look at fancy-variables for basic customization options.

Scroll down for instructions to run the demo.

**The bizness**

Fancy field and the fancy buttons assume that a parent component is tracking the form state (or passing it to the stores, or wherever else - I don't know, you're fancy). Simply pass a function as an updateChange prop. When updated, the field/button will pass an object with its value, property, and hasChanged. 

LinkedState is for weirdos. You're too fancy for that. 


**fancy-field**

The following props are required.

- label
- value: the value of the field. This must be set by the parent.
- property: the property associated with the field. Also sets the field id for styling selection.
- updateChange: function fired when the field is updated. Returns an object with value, property, and hasChanged.

The following prop customizations are at your disposal.

Classic input props:

- focused: boolean; sets cursor focus on mount.
- placeholder: define to make the placeholder text different from the magic label.
- type: defaults to 'text' if unspecified.

Levelled-up fancy:

- errors: treated as a boolean to show error styles. If set as a string, object, or array, will reveal an error message.
- unit: displays a unit (eg, 'minutes') when the field has a value.
- persistLabel: keeps the magic label revealed even when unfocused.
- focusText: text will be revealed while focused on the field.
- disabledClickText: text will show for 2 seconds after clicking on disabled field.
- initialValue: useful only if you want to use the hasChanged feature. hasChanged is passed via the updateChange prop and indicates when the value becomes newly changed, or when it returns to its original value.

Fancy field will attribute any extra props to the input. Eg, if you want to set a max length on the field, assigning a maxLength prop will do the trick.


**fancy-buttons**

'Button' is misleading, for fancy buttons are much more than that. They can handle booleans in 3 different fancy ways. Choose from a toggle, switch, or a classic checkbox.

The buttons only handle true/false values, but it's easy to obscure that with other options. (value == 'blue' or nah?)

Required props:

- label
- value: current boolean value.
- property: the property associated with the button.
- updateChange: fired when the button is clicked. Returns an object with value, property, and hasChanged.

Optional props:

- disabled
- checkbox: boolean; show the button as a checkbox.
- switch: boolean; show the button as a switch. requires a 'trueLabel' and 'falseLabel'.
- initialValue



**To run the demo**
=====================

Clone this repo and cd into ./demo.

```
npm install
npm start
open http://localhost:3000
```

Demo was whipped together with help from react-hot-boilerplate[https://github.com/gaearon/react-hot-boilerplate].


