# Notification.js

A dependency-free, well designed and highly customizable notification library.

Demo: *Images and demo website are coming soon ...*



## Table of contents

1. [How to install](#how-to-install)
2. [How to use](#how-to-use)
3. [How to configure](#how-to-configure)
4. [All available options](#all-available-options)
5. [Global events](#global-events)
6. [Browser support](#browser-support)
7. [Contributing](#contributing)
8. [Creator](#creator)
9. [License](#license)



## How to install

**Using Bower**

```
bower install notification-js --save
```

**Using Git**

```
git clone https://github.com/dominique-mueller/notification-js.git
```

*NPM package is on its way ...*



### Add to document

Include both the script and css files in the head section of your html document:

``` html
<script src='notification.min.js'></script>
<link rel='stylesheet' type='text/css' href='notification.min.css'>
```



## How to use



### Show notification

You can show a notification by calling:

``` javascript
// Simple way (with profile name and message)
notification.notify( 'success', 'User settings successfully updated.' );

// Advanced way (with additional options)
notification.notify( 'success', 'User settings successfully updated.', {
	notification: {
		autoHide: false
	}
} );
```

### Clear all notifications

You can clear all visible notifications by calling:

``` javascript
// Simple way
notification.clearAll();

// With custom animation offset (in seconds, default is 0.15)
notification.clearAll( 0.3 );

// With no animation offset
notification.clearAll( false );
```

> Tip: This may be helpful e.g. for singe-page-applications when switching between sites.



## How to configure


### Profiles and option hierarchy

You may run into the case that you fire multiple notifications and some of them are pretty similar when speaking about design
and functionality. But you don't want to repeat yourself by passing in a options object again and again. There has
to be a better way.

*And there is.* You have the ability to group similar notifications together by using the concept of profiles.

**There are three different types of profiles:**

* The `global` profile which contains all possible options with their default values and as a consequent serves as the
base notification configuration
* Predefined profiles like `success`, `warning`, `error`, `default` and `info` that contain basic options (mostly colors) for their
use cases
* And yes, your own profiles, for example `message`, `confirmation` or `social`

**Options are combined / prioritized by the following hierarchy:**

* Most important (and specific) are the options you pass in within the `notify` method
* Then all predefined profiles (e.g. `success`) or your own profiles are taken into account
* Lastly the `global` profile provides the values that are yet not set



### Add profile

You can create a brand new profile by calling:

``` javascript
// Create new profile without options (adding them later on)
notification.addProfile( 'social' );

// Create new profile with options
notification.addProfile( 'social', {
	notification: {
		height: 50
	}
} );
```

> Note: Each profile must have a unique name.



### Configure profile

You can configure existing profiles with your own options object by calling:

``` javascript
// Configure existing profile
notification.configProfile( 'social', {
	notification: {
		height: 50
	}
} );
```

> Note: Profile options are not replaced but overwritten.



### Remove profile

You can remove existing profiles by calling:

``` javascript
// Remove existing profile
notification.removeProfile( 'social' );
```

> Note: Predefined profiles (e.g. `global` or `success`) cannot be deleted.




## All available options

The following presents a detailed overview over all available options and explains their effects as well as the possible values.

#### Notification options

##### # Position

This option defines the position on the screen in which notifications will appear. The first value is responsible for
the x-axis (`left | middle | right`), the second one for the y-axis (`bottom | top`).

``` javascript
// Notification will appear on the left bottom off the screen
position: [ 'left', 'bottom' ]
```

##### # Distances

This option defines different distances in px: The first and second values are responsible for the distance between the
notification and each screen edge (x-axis, y-axis), the third value describes the vertical distance between multiple
notifications.

``` javascript
// 20px distance to each screen edge, 10px distamce between notifications
distances: [ 20, 20, 10 ]
```

##### # Height

This option defines the notification height in px.

> Note: Make sure to change this value carefully in order to prevent design issues.

``` javascript
// The notification is 60px high
height: 60
```

##### # Round corners

This option defines the corner roundness of the notification in px. Each value represents a corner, starting from the
top left one and continuing clockwise.

> Tip: Set all values half the notification height in order to make the notification round.

``` javascript
// No round corners
roundCorners: false

// Each corner is rounded by 1px
roundCorners: [ 1, 1, 1, 1 ]
```

##### # Color

This option defines the notification background color. Note that when changing this color you may also update other
colors in order to maintain good readability.

> Tip: HEX and RGB color values are recommended.

``` javascript
// Dark grey as the notification background color
color: '#666'
```



#### Symbol options

##### # Visibility

With this option you can enable or disable the notification symbol.

``` javascript
// Notification with a symbol
visibility: true

// Notification without a symbol
visibility: false
```

##### # Resource

This option defines what the symbol should look like. Here you can either set a symbolic icon (e.g. checkmark for
success message) or a semantic image (e.g. user image for social message).

- When set to `false` the default symbol is being used (only for `success` / `error`)
- You can set a relative / absolute path pointing to an image of any format (e.g. jpg, png)
- You can set a function which returns a valid svg element

> Note: The resource should be quadratic and optimally sized to 24px in width and height.

``` javascript
// Using the default symbol
resource: false

// Relative url to a PNG image
resource: 'img/symbols/error.png'

// Function that returns a beautiful svg icon
resource: function() {
	var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	// Create svg icon ...
	return svg;
}
```

##### # Round corners

This option defines the corner roundness of the notification in px. Each value represents a corner, starting from the
top left one and continuing clockwise.

> Tip: Set all values half the notification height in order to make the symbol round.

``` javascript
// No round corners
roundCorners: false

// Each corner is rounded by 1px
roundCorners: [ 1, 1, 1, 1 ]
```

##### # Color

This option defines the symbol highlight color. Note that this color might not visible when the symbol resource is a
image with no transparency.

> Tip: HEX, RGB or RGBA color values are recommended.

``` javascript
// Darker background highlight
color: 'rgba(0,0,0,.1)'
```



#### Message options

##### # Visibility

With this option you can enable or disable the notification message.

``` javascript
// Notification with a message
visibility: true

// Notification without a message
visibility: false
```

##### # Color

This option defines the text color of the message.

> Tip: HEX or RGB color values are recommended.

``` javascript
// White text color
color: '#FFF'
```



#### Dismiss button options

##### # Visibility

With this option you can enable or disable the notification dismiss button.

``` javascript
// Notification with a dismiss button
visibility: true

// Notification without a dismiss button
visibility: false
```

##### # Color

This option defines the dismiss text color.

> Tip: HEX or RGB color values are recommended.

``` javascript
// White text color
color: '#FFF'
```

##### # Text

This option defines whether a close icon or some custom text is being displayed within the dismiss button.

``` javascript
// Dismiss button with close icon
text: false

// Dismiss button with 'dismiss' text
text: 'dismiss'

// Dismiss button with 'close' text
text: 'close'
```



#### Behaviour options

##### # Auto hide

With this option you can define a time duration (in seconds) after which the notification will close itself
automatically.

> Tip: When disabling autoHide make sure to at least provide a dismiss button.

``` javascript
// Notification stays open (like forever ...)
autoHide: false

// Notification will automatically close itself after 5 seconds
autoHide: 5
```

##### # Action on mouseover

This option defines what will happen when the user hovers with the mouse over the notification area.

> Note: This option only works if autoHide is enabled.

``` javascript
// Nothing will happen
onMouseover: false

// The countdown will be temporarily paused
onMouseover: 'pause'

// The countdown will be reset (to its start value)
onMouseover: 'reset'
```

##### # Stacking

This option defines what happens when more than one notification might appear at the same time.

``` javascript
// Multiple notifications will be stacked up
stacking: true

// Only one notification can exist at a time
stacking: false
```

##### # Limit

This option defines the maximum number (the limit) of notifications that can be open at the same time. Note that
whatever the limit option is set to - at least one notification can always be opened.

> Note: This option only works if stacking is enabled.

``` javascript
// Show as many notifications as there is room for on the screen
limit: true

// There must not be more that 4 notifications at the same time
limit: 4

// Show as many notifications as there is room for on the screen
// but leave (unused) room for 2 more notifications
limit: -2

// Do not limit the number of notifications
limit: false
```

##### # HTML mode

This option defines how the notification message will be rendered. Note that disabling this option generally gives you
a higher performance as well as better security (e.g. against XSS).

> Tip: When enabled you can use stuff like links (`<a>`) or text styling (`<strong>`) ...

``` javascript
// Plain text message
htmlMode: false

// Message with html markup taken into account
htmlMode: true
```



#### Animation options

##### # Enable or disable

With this option you can turn all animations on or off. This option affects the whole notification with all its
components.

> Tip: You may temporarily turn off animations during development to speed up workflow.

``` javascript
// All animations are enabled
enabled: true

// All animations are disabled
enabled: false
```

##### # Durations

This option defines how long animations are going to take from start to end in seconds. The first value represents the
duration of things animating in, the second one the duration of things animating out.

``` javascript
// 0.75s duration to both animate in and out
duration: [ 0.75, 0.75 ]
```

##### # Easings

This option defines what animation easing functions to use - again the first value for things animating in, the second
one for things animating out.

``` javascript
// Both animations (in and out) use the 'ease' function
easing: [ 'ease', 'ease']
```


#### Callbacks

Here you can define functions that are being invoked when certain events occure. When set to `false` nothing will
happen.

``` javascript
// Triggers when notification starts animating in
onOpen: function() { ... }

// Triggers when notification is fully animated in
onOpened: function() { ... }

// Triggers when notification start animating out
onClose: function() { ... }

// Triggers when notification is fully animated out
onClosed: function() { ... }

// Triggers when the user hits the dismiss button
onDismiss: function() { ... }

// Triggers when the user enters the notification area with the mouse
onMouseenter: function() { ... }

// Triggers when the user leaves the notification area with the mouse
onMouseleave: function() { ... }
```


### Default global options

The following shows all the default options (in the `global` profile) for every notification.

``` javascript
{
	notification: {
		position: [ 'left', 'bottom' ],
		distances: [ 20, 20, 10 ],
		height: 60,
		roundCorners: [ 1, 1, 1, 1],
		color: 'green'
	},
	symbol: {
		visible: true
		resource: false,
		roundCorners: false,
		color: 'rgba(0,0,0,.1)'
	},
	message: {
		visible: true,
		color: '#FFF'
	},
	dismiss: {
		visible: true,
		color: '#FFF',
		text: false
	},
	behaviour: {
		autoHide: 5,
		onMouseover: 'pause',
		stacking: true,
		limit: true,
		htmlMode: false
	},
	animations: {
		enabled: true,
		duration: [ 0.75, 0.75 ],
		easing: [ 'ease', 'ease' ]
	},
	callbacks: {
		onOpen: false,
		onOpened: false,
		onClose: false,
		onClosed: false,
		onDismiss: false,
		onMouseenter: false,
		onMouseleave: false
	}
}
```



## Global events

Instead of defining custom callback functions in the options object you can also react to notification events globally.

### Add event listener

You can add a global notification event listener by calling:

``` javascript
// Short version
notification.on( 'open', function() { ... } );

// Vanilla JavaScript
document.addEventListener( 'notification.open', function() { ... } );

// jQuery
$('document').on( 'notification.open', function() { ... } )
```

### Remove event listener

You can remove a global notification event listener  by calling:

``` javascript
// Short version
notification.off( 'open', function );

// Vanilla JavaScript
document.removeEventListener( 'notification.open', function );

// jQuery
$('document').off( 'notification.open', function )
```

### List of events

The following list of available events contains a short event name (for the library specific methods) and a long event
name (for the vanilla JavaScript or jQuery methods) as well as a description explaining when these events will be
triggered.

| Short      | Long                    | Description                              |
| ---------- | ----------------------- | ---------------------------------------- |
| open       | notification.open       | Notification starts animating in         |
| opened     | notificaiton.opened     | Notification is fully animated in        |
| close      | notification.close      | Notification starts animating out        |
| closed     | notification.closed     | Notification is fully animated out       |
| dismiss    | notificaiton.dismiss    | Notification is being manually dismissed |
| mouseenter | notification.mouseenter | Mouse enters the notification area       |
| mouseleave | notification.mouseleave | Mouse leaves the notification area       |



## Browser support

This library should completely work with the following browser:

* Internet Explorer: 10+
* Microsoft Edge
* Mozilla Firefox: 23+
* Google Chrome: 26+
* Opera: 15+
* Safari: 6.1+



## Contributing

Anyone can enter issues for feature requests or bugs, and anyone can contribute to this project here on Github.

**Some notes about code quality:**

* Comment your code!
* We use a strict 120 character per line limit
* JavaScript code follows [this guideline](https://github.com/estelle/javascript)
* CSS & HTML code follows [this guideline](https://github.com/mdo/code-guide)
* Release versioning follows [this guideline](https://github.com/mojombo/semver/blob/master/semver.md)

**Some notes about the dev environment:**

This project uses Grunt to automate some important development tasks, like formating, validating and minifiying
different files. Before committing any changes please make sure to run the default Grunt task without any errors.



## Creator

- Dominique Müller
- E-Mail: [dominique.m.mueller@gmail.com](mailto:dominique.m.mueller@gmail.com)
- Website: [dominique-mueller.de](http://www.dominique-mueller.de/)
- Twitter: [@theDomiMueller](https:/twitter.com/theDomiMueller)

Please feel free to contact me at any time !



## License

The MIT License (MIT)

Copyright (c) 2015 Dominique Müller <[dominique.m.mueller@gmail.com](mailto:dominique.m.mueller@gmail.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.