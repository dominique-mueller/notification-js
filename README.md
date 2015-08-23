# Notification.js

A dependency-free, well designed and highly customizable notification library.

## Demo

Live demo with playground will be available soon **[here](http://www.dominique-mueller.de/projects/notification-js)**.

The following examples have been made with the objective of demonstrating *completely differently designed*
notifications for *all kinds of use cases*:

![Design examples](http://dominique-mueller.de/projects/notification-js/images/notification_js_images.png)
---
![Animation example](http://dominique-mueller.de/projects/notification-js/images/notification_js_animation.gif)

<br>

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

<br>

## How to install

#### Using [Bower](http://bower.io/) (recommended)

```
bower install notification-js --save
```

#### Using [npm](https://www.npmjs.com/)

```
npm install notification-js --save
```

#### Using [GitHub](https://github.com/)

```
git clone https://github.com/dominique-mueller/notification-js.git
```

#### Add to your document

Include both the script and css files within your html document:

``` html
<!-- During development -->
<script src="notification.js"></script>
<link rel="stylesheet" href="notification.css">

<!-- For production -->
<script src="notification.min.js"></script>
<link rel="stylesheet" href="notification.min.css">
```

Furthermore this library can be used as a AMD or Node module.

<br>

## How to use

#### Show notifications

You can show a notification by calling:

``` javascript
// Simple way (with profile name and message)
notification.notify( 'success', 'Settings successfully saved.' );

// Advanced way (plus additional options)
notification.notify( 'success', 'Settings successfully saved.', {
	// ...
} );
```

#### Clear all notifications

You can clear all visible notifications by calling:

``` javascript
// Simple way
notification.clearAll();

// With no animation offset
notification.clearAll( false );

// With custom animation offset (in seconds, default is 0.15)
notification.clearAll( 0.3 );

// With a callback
notification.clearAll( function() { ... } );

// With both animation offset and callback
notification.clearAll( 0.3, function() { ... } );

```

#### Clear the newest notification

You can clear just the newst notification by calling:

``` javascript
// Simple way
notification.clearNewest();

// With a callback
notification.clearNewest( function() { ... } );

```

#### Clear the oldest notification

You can clear just the oldest notification by calling:

``` javascript
// Simple way
notification.clearOldest();

// With a callback
notification.clearOldest( function() { ... } );

```

<br>

## How to configure

#### The concept of profiles

You may run into the situation that you fire multiple notifications and some of them are pretty similar when speaking about design
and functionality. But you don't want to repeat yourself by passing in an options object again and again. There has
to be a better way.

*And there is!* You have the ability to group similar notifications together by using the concept of profiles.

**There are three different types of profiles:**

* The `global` profile which contains all possible options with their default values, and therefore serves as the
base configuration
* Predefined profiles like `success`, `warning`, `error`, `default` and `info` which contain some basic options (mostly colors) for their
use cases
* And yes, your own profiles, for example `message`, `confirmation` or `social`

**Options are combined / prioritized by the following hierarchy:**

* Most important (and specific) are the options you pass in within the `notify` method
* Then all predefined profiles (e.g. `success`) or your own profiles are taken into account
* Lastly the `global` profile provides the values that are yet not set

#### Add a profile

You can add a brand new profile by calling:

``` javascript
// Create a new profile named 'social' without options
notification.addProfile( 'social' );

// Create a new profile named 'social' with options
notification.addProfile( 'social', {
	// ...
} );
```

#### Configure a profile

You can overwrite profile options with your own options object by calling:

``` javascript
// Configure the 'social' profile
notification.configProfile( 'social', {
	// ...
} );
```

#### Remove a profile

You can remove any profile which is not predefined (e.g. `global` or `success`) by calling:

``` javascript
// Remove the 'social' profile
notification.removeProfile( 'social' );
```

#### Reset a profile

You can reset any profile which is not predefined (e.g. `global` or `success`) by calling:

``` javascript
// Reset the 'social' profile to global default options
notification.resetProfile( 'social' );
```

#### Get options of a profile

You can get the options from a profile by calling:

``` javascript
// Get 'global' profile options
notification.getProfile( 'global' );
```

#### Check if a profile exists

You can check if a profile exists by calling:

``` javascript
// This returns true because the 'global' profile deos exist
notification.checkProfile( 'global' );
```


<br>

## All available options

The following presents an overview over all available options including detailed explanations and examples:

1. [Notification options](#notification-options)
2. [Symbol options](#symbol-options)
3. [Message options](#message-options)
4. [Dismiss button options](#dismiss-button-options)
5. [Behaviour options](#behaviour-options)
6. [Animation options](#animation-options)
7. [Callbacks](#callbacks)

<br>

#### Notification options

---

##### Position

This option defines the position on the screen in which notifications will appear. The first value is responsible for
the x-axis (`left | middle | right`), the second value for the y-axis (`bottom | top`).

``` javascript
// Notifications will appear on the left bottom of the screen
position: [ 'left', 'bottom' ]
```

---

##### Distances

This option defines distances: The first two values are responsible for the distance between the notification and each
screen edge (x-axis, y-axis), the third value sets the vertical gap between multiple
notifications.

``` javascript
// 20px distance to each screen edge (horizontal and vertical)
// 10px gap between notifications
distances: [ 20, 20, 10 ]
```

---

##### Height

This option defines the notification height.

> Note: Make sure to change this value carefully in order to prevent design issues.

``` javascript
// The notification has a height of 60px
height: 60
```

---

##### Maximum width

This option defines the maximum notification width.

> Note: The notification will not be wider than the screen size allows.

``` javascript
// The notification cannot be wider than the screen width
maxWidth: false

// The notification cannot be wider that 500px
maxWidth: 500
```

---

##### Round corners

This option defines the corner roundness of the notification. Each value represents a corner, starting from the top left
one and continuing clockwise.

> Tip: Set all values half the notification height in order to make the notification round.

``` javascript
// No round corners
roundCorners: false

// Each notification corner is 1px round
roundCorners: [ 1, 1, 1, 1 ]
```

---

##### Color

This option defines the notification background color. Note that when changing this, you may also update other colors in
order to maintain good readability (by preserving enough contrast).

> Tip: HEX and RGB color values are recommended.

``` javascript
// Dark grey as the notification background color
color: '#666'
```

<br>

#### Symbol options

---

##### Visibility

With this option you can enable or disable the notification symbol.

``` javascript
// Notification with a symbol
visibility: true

// Notification without a symbol
visibility: false
```

---

##### Resource

This option defines what the symbol should look like. Here you can either set an icon (e.g. checkmark for success
feedback) or an image (e.g. user image for social use cases).

* When set to `false` the default symbol is being used (only for `success`, `error` profiles)
* You can set a string containing any valid svg code (to use inline svg)
* You can set a relative / absolute path pointing to an image of any format (e.g. jpg, png)
* You can set a function which returns a valid svg DOM element (to use inline svg)

> Note: For quality and perf reasons the resource should be quadratic and optimally sized.

``` javascript
// Using the default symbol
resource: false

// String containing svg code
resource: '<svg> ... </svg>'

// Relative url to a PNG image
resource: 'img/symbols/email.png'

// Function that returns a beautifully designed svg icon
resource: function() {
	var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
	// ...
	return svg;
}
```

---

##### Round corners

This option defines the corner roundness of the symbol. Each value represents a corner, starting from the
top left one and continuing clockwise.

> Tip: Set all values half the notification height in order to make the symbol round.

``` javascript
// No round corners
roundCorners: false

// Each symbol corner is 1px round
roundCorners: [ 1, 1, 1, 1 ]
```

---

##### Color

This option defines the symbol highlight color. Note that this color might not visible when the symbol resource is an
image with no transparency.

> Tip: HEX, RGB or RGBA color values are recommended.

``` javascript
// No highlight color
color: false

// Darker background highlight
color: 'rgba(0,0,0,.1)'

// Brighter background highlight
color: 'rgba(255,255,255,.15)'
```

<br>

#### Message options

---

##### Visibility

With this option you can enable or disable the notification message.

> Note: Hiding the notification message is not recommended.

``` javascript
// Notification with a message
visibility: true

// Notification without a message
visibility: false
```

---

##### Color

This option defines the text color of the message.

> Tip: HEX or RGB color values are recommended.

``` javascript
// White text color
color: '#FFF'
```

---

##### Text size

This option defines the text size of the message.

> Tip: Make sure to change this value onyl slightly to prevent design issues.

``` javascript
// Font size of 14px
textSize: 14
```

<br>

#### Dismiss button options

---

##### Visibility

With this option you can enable or disable the notification dismiss button.

> Tip: When disabling the dismiss button, make sure to at least enable auto hide.

``` javascript
// Notification with a dismiss button
visibility: true

// Notification without a dismiss button
visibility: false
```

---

##### Color

This option defines the dismiss text color.

> Tip: HEX or RGB color values are recommended.

``` javascript
// White text color
color: '#FFF'
```

---

##### Text

This option defines whether a close icon or some custom text is being displayed within the dismiss button.

``` javascript
// Dismiss button with a close icon
text: false

// Dismiss button named 'dismiss'
text: 'dismiss'

// Dismiss button named 'close'
text: 'close'
```

<br>

#### Behaviour options

---

##### Auto hide

With this option you can define a time duration after which the notification will close itself automatically.

> Tip: When disabling auto hide, make sure to at least provide a dismiss button.

``` javascript
// Notification stays open (like forever ...)
autoHide: false

// Notification will close itself after 5 seconds
autoHide: 5
```

---

##### Action on mouseover

This option defines what will happen when the user hovers over the notification area.

> Note: This option only works if auto hide is enabled.

``` javascript
// Nothing will happen
onMouseover: false

// The auto hide countdown will be paused
onMouseover: 'pause'

// The auto hide countdown will be reset (to its start value)
onMouseover: 'reset'
```

---

##### Stacking

This option defines what will happen when more than one notification appear at the same time.

``` javascript
// Multiple notifications will be stacked up
stacking: true

// Only one notification can exist at a time
stacking: false
```

---

##### Limit

This option defines the maximum number (the limit) of notifications that can be open at the same time.

> Note: This option only works if stacking is enabled.

``` javascript
// Show as many notifications as there is room for on the screen
limit: true

// There must not be more that 4 notifications at a time
limit: 4

// Show as many notifications as there is room for on the screen,
// but leave (unused) room for 2 more notifications
limit: -2

// No limit of notifications
limit: false
```

---

##### HTML mode

This option defines how the notification message will be rendered. Note that disabling this option generally gives you
a higher performance as well as better security (e.g. against XSS).

> Tip: When enabled you can use html markup like links (`<a>`) or text styling (`<strong>`).

``` javascript
// Plain text message
htmlMode: false

// Message with html markup taken into account
htmlMode: true
```

<br>

#### Animation options

---

##### Enable or disable

With this option you can turn all animations on or off. This option affects the whole notification with all its
components.

> Tip: You may temporarily turn off animations during development to speed up workflow.

``` javascript
// All animations are enabled
enabled: true

// All animations are disabled
enabled: false
```

---

##### Durations

This option defines how long animations are going to take from start to end. The first value represents the duration of
things animating in, the second one of things animating out.

``` javascript
// 0.75s duration to both animate in and out
duration: [ 0.75, 0.75 ]
```

---

##### Easings

This option defines what animation easing function is being used; again the first value for things animating in, the
second one for things animating out.

``` javascript
// Both animations (in and out) use the 'ease' function
easing: [ 'ease', 'ease']
```

<br>

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

<br>

#### Default global options

The following shows all the default options (in the `global` profile) for every notification.

``` javascript
{
	notification: {
		position: [ 'left', 'bottom' ],
		distances: [ 20, 20, 10 ],
		height: 60,
		maxWidth: false,
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
		textSize: 14,
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

<br>

## Global events

Instead of defining custom callback functions in the options object you can also react to notification events globally.

#### Add event listener

You can add a global notification event listener by calling:

``` javascript
// Short version
notification.on( 'open', function() { ... } );

// Vanilla JavaScript
document.addEventListener( 'notification.open', function() { ... } );

// jQuery
$('document').on( 'notification.open', function() { ... } )
```

#### Remove event listener

You can remove a global notification event listener  by calling:

``` javascript
// Short version
notification.off( 'open', function );

// Vanilla JavaScript
document.removeEventListener( 'notification.open', function );

// jQuery
$('document').off( 'notification.open', function )
```

#### List of all events

The following list contains all available events. Next to the short event name (for the library specific methods) and
the long event name (for the vanilla JavaScript or jQuery methods) there is also a description explaining when these
events will be triggered.

| Short      | Long                    | Description                              |
| ---------- | ----------------------- | ---------------------------------------- |
| open       | notification.open       | Notification starts animating in         |
| opened     | notificaiton.opened     | Notification is fully animated in        |
| close      | notification.close      | Notification starts animating out        |
| closed     | notification.closed     | Notification is fully animated out       |
| dismiss    | notificaiton.dismiss    | Notification is being manually dismissed |
| mouseenter | notification.mouseenter | Mouse enters the notification area       |
| mouseleave | notification.mouseleave | Mouse leaves the notification area       |

<br>

## Browser support

This library should completely work with the following browser:

* Internet Explorer 10+
* Microsoft Edge
* Mozilla Firefox 23+
* Google Chrome 30+
* Opera 17+
* Safari 7.1+

<br>

## Contributing

Anyone can enter issues for feature requests or bugs, and anyone can contribute to this project here on Github. In
addition we use **[this public Trello board](https://trello.com/b/wkRHeLEF/notification-js-roadmap)** to enter, discuss and
develop new ideas and features for this library.

#### Code quality

* Comment your code!
* Use a strict 120 character per line limit
* JavaScript code follows **[this guideline](https://github.com/estelle/javascript)**
* CSS & HTML code follows **[this guideline](https://github.com/mdo/code-guide)**
* Release versioning follows **[this guideline](https://github.com/mojombo/semver/blob/master/semver.md)**

#### Development environment

This project uses **[Grunt](http://gruntjs.com/)** to automate development tasks like formating, validating and minifiying
different files. You can install Grunt and all used plugins by simply opening your command line tool, navigating
to the main project folder and calling `npm install` (**[NodeJS](https://nodejs.org/)** required).

This process also automatically creates and installs a (project specific) git hook for you which ensures that the main
Grunt task is being executed before any commit. This way the optimized library files (in the `build` folder) are always
syntactically correct and up to date.

> All git actions has to be executed within command line to make the git hook work properly !

<br>

## Creator

**Dominique Müller**

* E-Mail: [dominique.m.mueller@gmail.com](mailto:dominique.m.mueller@gmail.com)
* Website: [dominique-mueller.de](http://www.dominique-mueller.de/)
* Twitter: [@theDomiMueller](https:/twitter.com/theDomiMueller)

Please feel free to contact me at any time !

<br>

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
