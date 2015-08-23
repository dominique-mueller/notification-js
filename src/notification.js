/*!
 * Notification.js
 *
 * A well designed, highly customizable and lightweigth notification library.
 *
 * @author 	   Dominique Müller <dominique.m.mueller@gmail.com>
 * @copyright  Dominique Müller 2015
 * @license    MIT <http://opensource.org/licenses/MIT>
 * @link 	   Github <https://github.com/dominique-mueller/notification-js>
 * @version    1.0.0
 */

/**
 * Universal module definition (UMD), dependency-free
 */
( function( root, factory ) {

	'use strict';

	if ( typeof define === 'function' && define.amd ) {

		// AMD module, anonymous
		define( factory );

	} else if ( typeof module === 'object' && module.exports ) {

		// Node module, CommonJS-like
		module.exports = factory();

	} else {

		// Browser global (root is window)
		root.notification = factory();

	}

}( this, function() {

	'use strict';

	/* ==========  POLYFILL FOR CUSTOM EVENTS  ========== */

	/**
	 * Polyfill for creating custom events in IE9+
	 *
	 * Taken from the Mozilla developer site:
	 * <https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent>
	 */
	( function( window ) {
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	} )( window );

	/* ==========  DEFAULT SYMBOLS  ========== */

	/**
	 * Default svg symbols
	 * @type  {Object}
	 */
	var icons = {

		/**
		 * Success symbol
		 * @type  {String}
		 */
		success: 	'<svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">' +
						'<polyline points="4,12.5 9,17.5 20,6.5" ' +
							'fill="none" stroke="#FFF" stroke-width="2" stroke-dasharray="23" />' +
					'</svg>',

		/**
		 * Error symbol
		 * @type  {String}
		 */
		error: 		'<svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">' +
						'<line x1="6" y1="6" x2="18" y2="18" stroke="#FFF" stroke-width="2" stroke-dasharray="17" />' +
						'<line x1="6" y1="18" x2="18" y2="6" stroke="#FFF" stroke-width="2" stroke-dasharray="17" />' +
					'</svg>'

	};

	/* ==========  PROFILES  ========== */

	/**
	 * Profiles object (static)
	 * @type  {Object}
	 */
	var Profiles = ( function() {

		/**
		 * List of profiles
		 * @type  {Object}
		 */
		var list = {

			/**
			 * Global profile, contains all available options with their default (and also recommended) values
			 * @type  {Object}
			 */
			global: {

				notification: {

					/**
					 * Defines the position on the screen (x, y)
					 * @type 	 {Array}
					 * @default  [ 'left', 'bottom' ]
					 */
					position: [ 'left', 'bottom' ],

					/**
					 * Defines distances (x to screen in px, y to screen in px, y between in px)
					 * @type 	 {Array}
					 * @default  [ 20, 20, 10 ]
					 */
					distances: [ 20, 20, 10 ],

					/**
					 * Defines the height (in px)
					 * @type 	 {Number}
					 * @default  60
					 */
					height: 60,

					/**
					 * Defines the maximum width (in px)
					 * @type 	 {Boolean | Number}
					 * @default  false
					 */
					maxWidth: false,

					/**
					 * Defines the corner roundness (all four corners in px)
					 * @type 	 {Boolean | Array}
					 * @default  [ 1, 1, 1, 1 ]
					 */
					roundCorners: [ 1, 1, 1, 1 ],

					/**
					 * Defines the background color (in HEX / RGB / RGBA)
					 * @type 	 {String}
					 * @default  '#555'
					 */
					color: '#555'

				},

				symbol: {

					/**
					 * Defines the visibility (enabled / disabled)
					 * @type 	 {Boolean}
					 * @default  true
					 */
					visible: false,

					/**
					 * Defines the resource (default / url / function returning svg)
					 * @type 	 {Boolean | String | Function}
					 * @default  false
					 */
					resource: false,

					/**
					 * Defines the corner roundness (all four corners in px)
					 * @type 	 {Boolean | Array}
					 * @default  false
					 */
					roundCorners: false,

					/**
					 * Defines the highlight color (in HEX / RGB / RGBA)
					 * @type 	 {Boolean | String}
					 * @default  'rgba(0,0,0,.1)'
					 */
					color: 'rgba(0,0,0,.1)'

				},

				message: {

					/**
					 * Defines the visibility (enabled / disabled)
					 * @type 	 {Boolean}
					 * @default  true
					 */
					visible: true,

					/**
					 * Defines the font color (in HEX / RGB / RGBA)
					 * @type 	 {String}
					 * @default  '#FFF'
					 */
					color: '#FFF',

					/**
					 * Defines the font size (in px)
					 * @type 	 {Number}
					 * @default  14
					 */
					textSize: 14

				},

				dismiss: {

					/**
					 * Defines the visibility (enabled / disabled)
					 * @type 	 {Boolean}
					 * @default  true
					 */
					visible: true,

					/**
					 * Defines the font color (in HEX / RGB / RGBA)
					 * @type 	 {String}
					 * @default  '#FFF'
					 */
					color: '#FFF',

					/**
					 * Defines the dismiss text (enabled / text)
					 * @type 	 {Boolean | String}
					 * @default  false
					 */
					text: false

				},

				behaviour: {

					/**
					 * Defines the auto hide behaviour (disabled / duration in s)
					 * @type 	 {Boolean | Number}
					 * @default  5
					 */
					autoHide: 5,

					/**
					 * Defines the mouseover action (disabled / 'pause' / 'reset')
					 * @type 	 {Boolean | String}
					 * @default  'pause'
					 */
					onMouseover: 'pause',

					/**
					 * Defines the stacking behaviour (disabled / enabled)
					 * @type 	 {Boolean}
					 * @default  true
					 */
					stacking: true,

					/**
					 * Defines the limit of opened notifications (disabled / enabled / positiv number / negative number)
					 * @type 	 {Boolean | Number}
					 * @default  true
					 */
					limit: true,

					/**
					 * Defines the HTML mode for the message (disabled / enabled)
					 * @type 	 {Boolean}
					 * @default  false
					 */
					htmlMode: false

				},

				animations: {

					/**
					 * Defines the animations behaviour (disabled / enabled)
					 * @type 	 {Boolean}
					 * @default  true
					 */
					enabled: true,

					/**
					 * Defines the animation durations (animate-in in s, animate-out in s)
					 * @type 	 {Array}
					 * @default  [ 0.75, 0.75 ]
					 */
					duration: [ 0.75, 0.75 ],

					/**
					 * Defines the animation easings (animate-in, animate-out)
					 * @type 	 {Array}
					 * @default  [ 'ease', 'ease' ]
					 */
					easing: [ 'ease', 'ease' ]

				},

				callbacks: {

					/**
					 * Defines the callback function for the onOpen event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onOpen: false,

					/**
					 * Defines the callback function for the onOpened event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onOpened: false,

					/**
					 * Defines the callback function for the onClose event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onClose: false,

					/**
					 * Defines the callback function for the onClosed event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onClosed: false,

					/**
					 * Defines the callback function for the onDismiss event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onDismiss: false,

					/**
					 * Defines the callback function for the onMouseenter event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onMouseenter: false,

					/**
					 * Defines the callback function for the onMouseleave event
					 * @type 	 {Boolean | Function}
					 * @default  false
					 */
					onMouseleave: false

				}

			},

			/**
			 * Default profile
			 * @type  {Object}
			 */
			default: {
				notification: {
					color: '#555'
				}
			},

			/**
			 * Info profile
			 * @type  {Object}
			 */
			info: {
				notification: {
					color: '#2574A9'
				}
			},

			/**
			 * Success profile
			 * @type  {Object}
			 */
			success: {
				notification: {
					color: '#239D58'
				},
				symbol: {
					visible: true
				}
			},

			/**
			 * Error profile
			 * @type  {Object}
			 */
			error: {
				notification: {
					color: '#B9493E'
				},
				symbol: {
					visible: true
				}
			},

			/**
			 * Warning profile
			 * @type  {Object}
			 */
			warning: {
				notification: {
					color: '#C7932F'
				}
			}

		};

		/**
		 * Get profile options
		 *
		 * @param   {String}  profile  Profile name
		 * @return  {Object}      	   Profile options
		 */
		var get = function get( profile ) {
			return list[ profile ];
		};

		/**
		 * Check if profile exists
		 *
		 * @param   {Stirng}   profile  Profile name
		 * @return  {Boolean}           Result
		 */
		var check = function check( profile ) {
			return list.hasOwnProperty( profile );
		};

		/**
		 * Configure profile
		 *
		 * @param  {String}  profile  Profile name
		 * @param  {Object}  options  Profile options
		 */
		var config = function config( profile, options ) {

			for ( var optionGroup in options ) {

				// Create section first (if necessary)
				if ( !list[ profile ].hasOwnProperty( optionGroup ) ) {
					list[ profile ][ optionGroup ] = {};
				}

				// Create or update each option within this section
				for ( var option in options[ optionGroup ] ) {
					list[ profile ][ optionGroup ][ option ] = options[ optionGroup ][ option ];
				}

			}

		};

		/**
		 * Add new profile
		 *
		 * @param  {Stirng}  profile    Profile name
		 * @param  {Object}  [options]  Profile options
		 */
		var add = function add( profile, options ) {
			list[ profile ] = typeof options !== 'undefined' ? options : {};
		};

		/**
		 * Remove profile
		 *
		 * @param  {String}  profile  Profile name
		 */
		var remove = function remove( profile ) {
			delete list[ profile ];
		};

		/**
		 * Reset profile
		 *
		 * @param  {String}  profile  Profile name
		 */
		var reset = function reset( profile ) {
			list[ profile ] = {};
		};

		/**
		 * Combine options
		 *
		 * Here we combine all existing options (coming from different hierarchies) into one custom options object. The
		 * options object passed in when calling the 'notify' method is the most specific one and gets the highest
		 * priority. After that the profile specific options and then the globally defined options are taken into
		 * account.
		 *
		 * @param   {Profile}  profile  Profile name
		 * @param   {Object}   options  Custom options object
		 * @return  {Object}            Combined options object
		 */
		var combine = function combine( profile, options ) {

			var combinedOptions = {};

			// Merge all options
			for ( var option in list.global ) {
				combinedOptions[ option ] = merge(
					list.global[ option ],
					list[ profile ][ option ],
					options[ option ]
				);
			}

			return combinedOptions;

		};

		/**
		 * Helper: Merge multiple objects
		 *
		 * The objects are merged from right to left - that means the rightmost object has the highest priority and the
		 * lestmost object the lowest priority. The number of passed in objects is variable.
		 *
		 * @param   {...Object}  var_args  Multiple option objects
		 * @return  {Object} 			   Merged result object
		 */
		var merge = function merge() {

			var countArguments = arguments.length;
			var result = {};

			// Clean arguments from useless option objects
			for ( var i = countArguments - 1; i > 0; i-- ) {
				if ( typeof arguments[ i ] === 'undefined' ) {
					delete arguments[ i ];
				}
			}

			// Iterate through all available options (globally defined)
			for ( var option in arguments[ 0 ] ) {

				// Iterate through the complete option hierarchy
				for ( var j = countArguments - 1; j >= 0; j-- ) {

					// If the most specific option has been found, set it and continue with the next option
					if ( typeof arguments[ j ] !== 'undefined' && arguments[ j ].hasOwnProperty( option ) ) {
						result[ option ] = arguments[ j ][ option ];
						break;
					}

				}

			}

			// Done
			return result;

		};

		/**
		 * Public API
		 */
		var API = {
			get: get,
			check: check,
			config: config,
			add: add,
			remove: remove,
			reset: reset,
			combine: combine
		};

		return API;

	} )();

	/* ==========  NOTIFICATION  ========== */

	/**
	 * Notification object
	 *
	 * Each notification gets its own object in order to allow customized options and actions for each of them.
	 *
	 * @param   {String}  profile 	 Notification profile name
	 * @param   {String}  message 	 Notification message
	 * @param   {Object}  [options]  Custom notification options
	 */
	var Notification = function Notification( profile, message, options ) {

		/**
		 * Notification profile name (defaults to 'default')
		 * @type  {String}
		 */
		this.profile = ( typeof Profiles.get( profile ) !== 'undefined' ) ? profile : 'default';

		/**
		 * Notification message
		 * @type  {String}
		 */
		this.message = message;

		/**
		 * Custom notification options
		 * @type  {Object}
		 */
		this.options = ( typeof options !== 'undefined' ) ? options : {};

		/**
		 * DOM references to every single component of this notification
		 * @type  {Object}
		 */
		this.$components = {};

		// Initialize notification
		this.initialize();

	};

	/**
	 * All existing notification instances (static)
	 * @type  {Array}
	 */
	Notification.instances = [];

	/**
	 * Global notification events (constant)
	 * @type  {Object}
	 */
	Notification.prototype.EVENTS = {

		// Event triggers when notification starts animating in
		onOpen: new CustomEvent( 'notification.open' ),

		// Event triggers when notification is fully animated in
		onOpened: new CustomEvent( 'notification.opened' ),

		// Event triggers when notification start animating out
		onClose: new CustomEvent( 'notification.close' ),

		// Event triggers when notification is fully animated out
		onClosed: new CustomEvent( 'notification.closed' ),

		// Event triggers when notification is being manually dismissed
		onDismiss: new CustomEvent( 'notification.dismiss' ),

		// Event triggers when mouse enters notification area
		onMouseenter: new CustomEvent( 'notification.mouseenter' ),

		// Event triggers when mouse leaves notification area
		onMouseleave: new CustomEvent( 'notification.mouseleave' )

	};

	/**
	 * Initialize notification
	 */
	Notification.prototype.initialize = function initialize() {

		var _this = this;

		// Combine multiple option objects into one (respecting the hierarchy)
		_this.options = Profiles.combine( _this.profile, _this.options );

		// If resource is not set, select default symbol or disable symbol visibility
		if ( !_this.options.symbol.resource ) {
			switch ( _this.profile ) {
				case 'success':
					_this.options.symbol.resource = icons.success;
					break;
				case 'error':
					_this.options.symbol.resource = icons.error;
					break;
				default:
					_this.options.symbol.visible = false;
			}
		}

	};

	/**
	 * Build notification DOM element
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.build = function build( callback ) {

		var _this = this;

		// DOM elements
		var $fragment = document.createDocumentFragment();

		// Options
		var notificationOptions = _this.options.notification;
		var symbolOptions 		= _this.options.symbol;
		var messageOptions 		= _this.options.message;
		var buttonOptions 		= _this.options.dismiss;
		var behaviourOptions 	= _this.options.behaviour;

		// Build container with background
		_this.$components.notification = buildContainer();
		_this.$components.background = buildBackground();
		_this.$components.notification.appendChild( _this.$components.background );

		// Build symbol
		if ( symbolOptions.visible ) {
			_this.$components.symbol = buildSymbol();
			_this.$components.notification.appendChild( _this.$components.symbol );
		}

		// Build message
		if ( messageOptions.visible ) {
			_this.$components.message = buildMessage();
			_this.$components.notification.appendChild( _this.$components.message );
		}

		// Build dismiss button
		if ( buttonOptions.visible ) {
			_this.$components.button = buildButton();
			_this.$components.notification.appendChild( _this.$components.button );
		}

		// Insert notification into DOM
		$fragment.appendChild( _this.$components.notification );
		document.body.appendChild( $fragment );

		// Calculate the required room for an textual-based dismiss button
		if ( buttonOptions.visible && buttonOptions.text ) {
			_this.$components.notification.style.paddingRight = _this.$components.button.offsetWidth + 'px';
		}

		// Continue
		_this.next( callback );

		/**
		 * SPECIALIZED BUILD METHODS
		 */

		/**
		 * Build notification container
		 *
		 * @return  {Element}  DOM element
		 */
		function buildContainer() {

			// Create DOM elements
			var $container 	= document.createElement( 'div' );

			// Get options
			var xPosition 	= notificationOptions.position[ 0 ];
			var yPosition 	= notificationOptions.position[ 1 ];
			var xDistance 	= notificationOptions.distances[ 0 ];
			var yDistance 	= notificationOptions.distances[ 1 ];
			var size 		= notificationOptions.height;
			var corners 	= notificationOptions.roundCorners;

			// Set styles
			switch ( xPosition ) {
				case 'left':
					$container.style.left = xDistance + 'px';
					$container.style.marginRight = xDistance + 'px';
					break;
				case 'right':
					$container.style.right = xDistance + 'px';
					$container.style.marginLeft = xDistance + 'px';
					break;
				case 'middle':
					$container.style.left = '50%';
					$container.style.webkitTransform = 'translateX(-50%)';
					$container.style.transform = 'translateX(-50%)';
					break;
			}
			switch ( yPosition ) {
				case 'top':
					$container.style.top = yDistance + 'px';
					break;
				case 'bottom':
					$container.style.bottom = yDistance + 'px';
					break;
			}
			if ( symbolOptions.visible ) {
				$container.style.paddingLeft = size + 'px';
			}
			if ( corners && ( corners[ 0 ] + corners[ 1 ] + corners[ 2 ] + corners[ 3 ] ) > 0 ) {
				$container.style.borderRadius = corners.join( 'px ' ) + 'px';
			}
			if ( buttonOptions.visible && !buttonOptions.text ) {
				$container.style.paddingRight = ( size - 20 ) + 'px';
			}
			if ( notificationOptions.maxWidth ) {
				$container.style.maxWidth = notificationOptions.maxWidth + 'px';
			}

			// Set classes
			$container.classList.add( 'notification' );
			$container.classList.add( 'notification-' + _this.profile );

			// Done
			return $container;

		}

		/**
		 * Build notification background
		 *
		 * @return  {Element}  DOM element
		 */
		function buildBackground() {

			// Create DOM elements
			var $background = document.createElement( 'div' );

			// Get options
			var extraSpace 	= notificationOptions.height / 2;
			var color 		= notificationOptions.color;

			// Set styles
			$background.style.left = 'calc(-100% + ' + extraSpace + 'px)';
			$background.style.backgroundColor = color;

			// Set classes
			$background.classList.add( 'notification-background' );

			// Done
			return $background;

		}

		/**
		 * Build notification symbol
		 *
		 * @return  {Element}  DOM element
		 */
		function buildSymbol() {

			// Create DOM elements
			var $symbol;

			// Get options
			var size 		= notificationOptions.height;
			var resource 	= symbolOptions.resource;
			var corners 	= symbolOptions.roundCorners;
			var color 		= symbolOptions.color;

			// Check if resource is an svg or image element
			if ( resource.match( /^<svg.*>.*<\/svg>$/i ) !== null || typeof resource === 'function' ) {

				// Check if svg comes from string or function
				if ( typeof resource === 'function' ) {

					// Get svg symbol
					$symbol = resource();

					// Verify that the function returned a valid svg DOM element for real
					if ( typeof $symbol === 'undefined' || $symbol.nodeName.toLowerCase() !== 'svg' ) {
						throw new Error( 'The custom notification symbol is not valid svg.' );
					}

				} else {

					// Get svg symbol (parser does not throw any errors !!)
					$symbol = new DOMParser().parseFromString( resource, 'image/svg+xml' ).childNodes[ 0 ];

				}

				// Set attributes
				$symbol.setAttributeNS( null, 'width', '24' );
				$symbol.setAttributeNS( null, 'height', '24' );

				// Set styles
				if ( corners && ( corners[ 0 ] + corners[ 1 ] + corners[ 2 ] + corners[ 3 ] ) > 0 ) {
					$symbol.style.padding = ( size / 2 - 17 ) + 'px';
				} else {
					$symbol.style.padding = ( size / 2 - 12 ) + 'px';
				}
				if ( color ) {
					$symbol.style.backgroundColor = color;
				}

			} else {

				// Create DOM elements
				// We do not use an image object in order to allow positioning and resizing the image dynamically
				$symbol = document.createElement( 'div' );

				// Set background image
				$symbol.style.backgroundImage = 'url("' + resource + '")';
				$symbol.style.backgroundPosition = 'center';
				$symbol.style.backgroundSize = 'cover';
				$symbol.style.backgroundRepeat = 'no-repeat';

			}

			// Set styles
			if ( corners && ( corners[ 0 ] + corners[ 1 ] + corners[ 2 ] + corners[ 3 ] ) > 0 ) {
				$symbol.style.left = '5px';
				$symbol.style.height = ( size - 10 ) + 'px';
				$symbol.style.width = ( size - 10 ) + 'px';
				$symbol.style.borderRadius = corners.join( 'px ' ) + 'px';
			} else {
				$symbol.style.left = '0';
				$symbol.style.height = '100%';
				$symbol.style.width = size + 'px';
			}

			// Set classes (via attribute because IE is too dumb to use classList on SVG elements)
			$symbol.setAttributeNS( null, 'class', 'notification-symbol notification-symbol-' + _this.profile );

			// Done
			return $symbol;

		}

		/**
		 * Build notification message
		 *
		 * @return  {Element}  DOM element
		 */
		function buildMessage() {

			// DOM elements
			var $message 			= document.createElement( 'p' );

			// Options
			var color 				= messageOptions.color;
			var textSize 			= messageOptions.textSize;
			var textHeight 			= Math.round( textSize * 1.7 );
			var horizontalPadding 	= Math.round( notificationOptions.height / 2.75 );
			var verticalPadding 	= Math.round( ( notificationOptions.height - textHeight ) / 2 );

			// Set message
			// When the html mode is enabled, custom html markup (like hyperlinks or text formatting) will be
			// recognized and rendered by the browser. But note that disabling the html mode generally gives you
			// improved performance as well as better security (XSS not possible).
			if ( behaviourOptions.htmlMode ) {
				$message.innerHTML = _this.message;
			} else {
				$message.textContent = _this.message;
			}

			// Set styles
			$message.style.color = color;
			$message.style.fontSize = textSize + 'px';
			$message.style.lineHeight = textHeight + 'px';
			$message.style.padding = verticalPadding + 'px ' + horizontalPadding + 'px';

			// Set class
			$message.classList.add( 'notification-message' );

			// Done
			return $message;

		}

		/**
		 * Build notification dismiss button
		 *
		 * @return  {Element}  DOM element
		 */
		function buildButton() {

			// Create DOM elements
			var $button 	= document.createElement( 'button' );

			// Get options
			var size 		= notificationOptions.height;
			var color 		= buttonOptions.color;
			var text 		= buttonOptions.text;

			// Set attributes (for accessibility reasons)
			$button.setAttribute( 'type', 'button' );
			$button.setAttribute( 'title', 'dismiss this notification' );

			// Set styles
			$button.style.height = ( size - 20 ) + 'px';
			$button.style.padding = ( size / 2 - 18 ) + 'px';

			// Set icon or text as the button content
			if ( text ) {

				// Add text to the button
				$button.textContent = text;

				// Set styles
				$button.style.color = color;
				$button.style.fontSize = '12px';
				$button.style.lineHeight = '16px';

			} else {

				// Get svg icon (parser does not throw any errors !!)
				var $icon = new DOMParser().parseFromString( icons.error, 'image/svg+xml' ).childNodes[ 0 ];

				// Set attributes
				$icon.setAttributeNS( null, 'width', '16' );
				$icon.setAttributeNS( null, 'height', '16' );

				// Add icon to the button
				$button.appendChild( $icon );

				// Set styles
				$button.style.width = ( size - 20 ) + 'px';

			}

			// Set class
			$button.classList.add( 'notification-btn' );

			// Done
			return $button;

		}

	};

	/**
	 * Prepare for the next notification
	 *
	 * Before showing a new notification we may have to manipulate one or more previously opened notifications first.
	 * So in the case that stacking is enabled, we need to take the limit setting into account. Is the limit dynamic
	 * (which means it depends on the current screen height), we first calculate the overall required height, including
	 * the necessary room for the new notification. Is the limit a static value, we check if the number of allowed
	 * notifications is already reached. Based on one of these results we may need to close the oldest notification
	 * first and then shift the others. If stacking is disabled, we only have to close the current notification.
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.prepare = function prepare( callback ) {

		var _this = this;

		// We only need to prepare when at least one notification is already open
		if ( Notification.instances.length ) {

			// Stack notifications if option is enabled
			if ( _this.options.behaviour.stacking ) {

				var closeFirst;
				var limit 				= _this.options.behaviour.limit;
				var countNotifications 	= Notification.instances.length;

				// Get shift distance depending on the height of the new notification
				var shiftDistance 		= _this.$components.notification.offsetHeight;

				// If the limit is dynamic, make some calculations first
				if ( limit === true || limit < 0 ) {

					// Options
					var notificationOptions = _this.options.notification;
					var size 				= notificationOptions.height;
					var yDistance 			= notificationOptions.distances[ 1 ];
					var yGap 				= notificationOptions.distances[ 2 ];

					// Calculate required overall height
					// For this we need to take the height of our new notification, add all the distances (vertical
					// distances to screen as well as all gaps between notifications) and combine that with the sum of
					// all existing (dynamic) notification heights
					var requiredHeight = shiftDistance + yDistance * 2 + countNotifications * yGap;
					Notification.instances.forEach( function( element ) {
						requiredHeight += element.$components.notification.offsetHeight;
					} );

					// Add additional space when limit is a negative value
					if ( limit < 0 ) {
						requiredHeight -= ( size + yGap ) * limit;
					}

					// Based on the results we finally check if there is enough room for the new notification
					closeFirst = ( requiredHeight > window.innerHeight ) ? true : false;

				} else {

					// Check if the limit is set and already reached
					closeFirst = ( limit !== false && limit !== 0 && countNotifications === limit ) ? true : false;

				}

				if ( closeFirst ) {

					// Close oldest notification first
					Notification.instances[ 0 ].close( function() {

						// Shift notifications
						_this.shift( Notification.instances, 'up', shiftDistance, function() {

							// Continue
							_this.next( callback );

						} );
					} );

				} else {

					// Shift notifications
					_this.shift( Notification.instances, 'up', shiftDistance, function() {

						// Continue
						_this.next( callback );

					} );

				}

			} else {

				// Close oldest notification first
				Notification.instances[ 0 ].close( function() {

					// Continue
					_this.next( callback );

				} );

			}

		} else {

			// Continue
			_this.next( callback );

		}

	};

	/**
	 * Open notification
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.open = function open( callback ) {

		var _this = this;

		// Add this notification object to the list of instances
		Notification.instances.push( _this );

		// Trigger 'open' event
		document.dispatchEvent( _this.EVENTS.onOpen );
		if ( typeof _this.options.callbacks.onOpen === 'function' ) {
			_this.options.callbacks.onOpen();
		}

		// Animate notification in
		_this.animate( 'in', function() {

			// Trigger 'opened' event
			document.dispatchEvent( _this.EVENTS.onOpened );
			if ( typeof _this.options.callbacks.onOpened === 'function' ) {
				_this.options.callbacks.onOpened();
			}

			// Continue
			_this.next( callback );

		} );

	};

	/**
	 * Wait while the notification is open
	 *
	 * When the notification is finally visible, we start (if enabled) a countdown after which the notification will be
	 * closed automatically. Moreover we configure event listeners that allow pausing and resuming this countdown
	 * temporarily on mouseover and mouseleave, and we also make the dismiss button work.
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.wait = function wait( callback ) {

		var _this = this;

		// Configure the countdown
		if ( _this.options.behaviour.autoHide ) {

			// Start the countdown
			var countdown = new Countdown( _this.options.behaviour.autoHide * 1000, function() {

				// Continue
				_this.next( callback );

			} );

			// Configure the countdown pause and resume functionality
			if ( _this.options.behaviour.onMouseover ) {

				// Pause countdown when entering the notification area
				_this.$components.notification.addEventListener( 'mouseenter', function pause() {

					// Trigger 'mouseenter' event
					document.dispatchEvent( _this.EVENTS.onMouseenter );
					if ( typeof _this.options.callbacks.onMouseenter === 'function' ) {
						_this.options.callbacks.onMouseenter();
					}

					// Pause / reset countdown
					switch ( _this.options.behaviour.onMouseover ) {
						case 'pause':
							countdown.pause();
							break;
						case 'reset':
							countdown.stop();
							break;
					}

				} );

				// Resume countdown when leaving the notification area
				_this.$components.notification.addEventListener( 'mouseleave', function resume() {

					// Trigger 'mouseleave' event
					document.dispatchEvent( _this.EVENTS.onMouseleave );
					if ( typeof _this.options.callbacks.onMouseleave === 'function' ) {
						_this.options.callbacks.onMouseleave();
					}

					// Resume / restart countdown
					countdown.resume();

				} );

			}

		}

		// Configure the dismiss button behaviour
		if ( _this.options.dismiss.visible ) {

			// Dismiss notification when clicking the dismiss button
			_this.$components.button.addEventListener( 'click', function dismiss( event ) {

				// Remove event listener (just to be sure it's gone and no longer somewhere in memory)
				event.target.removeEventListener( event.type, dismiss );

				// Trigger 'dismiss' event
				document.dispatchEvent( _this.EVENTS.onDismiss );
				if ( typeof _this.options.callbacks.onDismiss === 'function' ) {
					_this.options.callbacks.onDismiss();
				}

				// Stop countdown (if auto hide is enabled)
				if ( _this.options.behaviour.autoHide ) {
					countdown.stop();
				}

				// Continue
				_this.next( callback );

			} );

		}

	};

	/**
	 * Close notification
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.close = function close( callback ) {

		var _this = this;

		// Trigger 'close' event
		document.dispatchEvent( _this.EVENTS.onClose );
		if ( typeof _this.options.callbacks.onClose === 'function' ) {
			_this.options.callbacks.onClose();
		}

		// Animate notification out
		_this.animate( 'out', function() {

			// Trigger 'closed' event
			document.dispatchEvent( _this.EVENTS.onClosed );
			if ( typeof _this.options.callbacks.onClosed === 'function' ) {
				_this.options.callbacks.onClosed();
			}

			// Shift previously opened notifications to get rid of ugly spacing
			if ( _this.options.behaviour.stacking && ( Notification.instances.length - 1 ) ) {

				// Get the position of the current notification within the list of instances
				var position = Notification.instances.indexOf( _this );

				// Get shift distance depending on the height of the closed notification
				var shiftDistance = _this.$components.notification.offsetHeight;

				// Shift all previous notifications
				_this.shift( Notification.instances.slice( 0, position ), 'down', shiftDistance, function() {

					// Remove this notification from the list of instances
					Notification.instances.splice( position, 1 );

					// Continue
					_this.next( callback );

				} );

			} else {

				// Just clear the list of instances instead of explicitly removing the notification
				Notification.instances = [];

				// Continue
				_this.next( callback );

			}

			// Remove this notification from the DOM
			document.body.removeChild( _this.$components.notification );

		} );

	};

	/**
	 * Animate notification in / out
	 *
	 * Before animating in or out the notification by setting or removing the 'is-visible' class, we first have to set
	 * the css transitions and their custom durations and easings. Because we cannot be 100% sure when exactly the css
	 * transition is done, we are using an event listener to solve this problem - no 'setTimeout' or similar!!
	 * Theoratically every single fired css transition will trigger this 'transitionend' event when it is done, but we
	 * only need the first one to be triggered in order to know that we can continue.
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.animate = function animate( direction, callback ) {

		// Options
		var _this = this;
		var inDuration = _this.options.animations.duration[ 0 ];
		var outDuration = _this.options.animations.duration[ 1 ];
		var easing = _this.options.animations.easing;

		// Animate the notification in or out depending on the animation direction
		switch ( direction ) {

			case 'in':

				// Set css transitions if animations are enabled
				if ( _this.options.animations.enabled ) {

					// Notification container
					_this.$components.notification.style.transition =
						'box-shadow ' + ( inDuration / 1.5 ) + 's ' + easing[ 0 ] + ' ' + ( inDuration / 1.5 ) + 's, ' +
						'opacity ' + inDuration + 's ' + easing[ 0 ];

					// Notification background
					_this.$components.background.style.transition =
						'transform ' + inDuration + 's ' + easing[ 0 ];

					// Notification symbol
					if ( _this.options.symbol.visible ) {
						_this.$components.symbol.style.transition =
							'opacity ' + inDuration + 's ' + easing[ 0 ];
					}

					// Notification message
					if ( _this.options.message.visible ) {
						_this.$components.message.style.transition =
							'transform ' + inDuration + 's ' + easing[ 0 ] + ', ' +
							'opacity ' + inDuration + 's ' + easing[ 0 ];
					}

					// Notification dismiss button
					if ( _this.options.dismiss.visible ) {
						_this.$components.button.style.transition =
							'opacity ' + ( inDuration / 1.5 ) + 's ' + easing[ 0 ] + ' ' + ( inDuration / 1.5 ) + 's';
					}

				}

				// Force layout update
				forceUpdate();

				// Animate notification in
				_this.$components.notification.classList.add( 'is-visible' );

				break;

			case 'out':

				// Set css transitions if animations are enabled
				if ( _this.options.animations.enabled ) {

					// Notification container
					_this.$components.notification.style.transition =
						'box-shadow ' + outDuration + 's ' + easing[ 1 ] + ', ' +
						'opacity ' + outDuration + 's ' + easing[ 1 ];

					// Notification background
					_this.$components.background.style.transition =
						'transform 0s linear ' + outDuration + 's';

					// Notification symbol
					if ( _this.options.symbol.visible ) {
						_this.$components.symbol.style.transition =
							'opacity 0s linear ' + outDuration + 's';
					}

					// Notification message
					if ( _this.options.message.visible ) {
						_this.$components.message.style.transition =
							'transform 0s linear ' + outDuration + 's, ' +
							'opacity 0s linear ' + outDuration + 's';
					}

					// Notification dismiss button
					if ( _this.options.dismiss.visible ) {
						_this.$components.button.style.transition =
							'opacity 0s linear ' + outDuration + 's';
					}

				}

				// Force layout update
				forceUpdate();

				// Animate notification out
				_this.$components.notification.classList.remove( 'is-visible' );

				break;

		}

		if ( _this.options.animations.enabled ) {

			// Check when the css transition is done
			_this.$components.notification.addEventListener( 'transitionend', function finished() {

				// Remove event listener immediately
				_this.$components.notification.removeEventListener( 'transitionend', finished );

				// Continue
				_this.next( callback );

			} );

		} else {

			// Continue
			_this.next( callback );

		}

		/**
		 * HELPER METHODS
		 */

		/**
		 * This function forces the browser to update the website layout by flushing all pending changes within the
		 * browsers rendering queue. This is being done by calculating a random (here width) layout property. Only this
		 * way we can be sure that our DOM element is being fully created and styled, and animating the notification in
		 * or out by adding or removing the 'is-visible' class works properly.
		 */
		function forceUpdate() {
			return _this.$components.notification.offsetWidth;
		}

	};

	/**
	 * Shift notifications up / down
	 *
	 * In order to allow stacking multiple notifications as well as getting rid of unnecessary and ugly spacing between
	 * notifications we need to be able to shift some notifications in different directions. The direction of the
	 * shift movement depends not only on the notification position on the screen itself, but also on whether we make
	 * room for a new notification or try to remove some spacing resulting from closing another notification, in most
	 * cases manually.
	 * Technically because of the highly dynamic situation here we cannot make use of our lovely css transitions or
	 * animations. Instead we need to use the requestAnimationFrame API in order to create our own custom animations,
	 * including awesome 60 FPS smoothness.
	 *
	 * @param  {Array}     instances       List of notification objects we want to shift
	 * @param  {String}    shiftDirection  Shifting direction
	 * @param  {Number}    shiftDistance   Shifting distance
	 * @param  {Function}  [callback]      Callback function
	 */
	Notification.prototype.shift = function shift( instances, shiftDirection, shiftDistance, callback ) {

		var _this = this;

		// Only shift when there are notifications to shift
		if ( instances.length ) {

			// Get values
			var start 						= new Date();
			var countSelectedNotifications 	= instances.length;
			var countAllNotifications 		= Notification.instances.length;
			var yGap 						= _this.options.notification.distances[ 2 ];

			// Get the translateX basis for the case that the horizontal position is set to middle
			var translateX = ( _this.options.notification.position[ 0 ] === 'middle' ) ? '-50%' : '0';

			// Get stacking direction depending on vertical position
			var stackDirection = ( _this.options.notification.position[ 1 ] === 'top' ) ? '+' : '-';

			// Cache the height of each existing notification upfront (for performance reasons)
			var notificationHeights = [];
			for ( var i = countAllNotifications - 1; i >= 0; i-- ) {
				notificationHeights[ i ] = Notification.instances[ i ].$components.notification.offsetHeight;
			}

			// Start animation
			requestAnimationFrame( render );

		} else {

			// Continue
			_this.next( callback );

		}

		/**
		 * 60 FPS animation render loop
		 *
		 * First we need to calculate the current animation progress as a decimal value. For this we take the time
		 * difference between now and the animation start time and divide it by the overall animation duration. If
		 * (based on the resulting progress) the animation is not finished yet, we draw the next frame - else we render
		 * the notification in its final end position in order to avoid inaccurate, comma-based pixel values.
		 */
		function render() {

			// Calculate current animation progress
			var animations = _this.options.animations;
			var now = new Date();
			var progress = ( animations.enabled ) ? ( now - start ) / ( animations.duration[ 0 ] * 1000 / 1.5 ) : 1;

			// Animation loop
			if ( progress < 1 ) {
				drawFrame( convertLinearToEase( progress ) );
				requestAnimationFrame( render );
			} else {
				drawFrame( 1 );
				_this.next( callback );
			}

		}

		/**
		 * Draw next frame in which the notification gets its new position
		 *
		 * @param  {Number}  progress  Animation progress
		 */
		function drawFrame( progress ) {

			var basePosition;
			var distance;
			var newPosition;

			for ( var i = countSelectedNotifications - 1; i >= 0; i-- ) {

				// Calculate base position
				if ( i !== countSelectedNotifications - 1 ) {
					basePosition += notificationHeights[ i + 1 ] + yGap;
				} else {
					if ( shiftDirection === 'up' ) {
						basePosition = 0;
					} else {
						basePosition = shiftDistance + yGap;
						for ( var j = countAllNotifications - 1; j > countSelectedNotifications; j-- ) {
							basePosition += notificationHeights[ j ] + yGap;
						}
					}
				}

				// Calculate new vertical position
				distance = basePosition + progress * ( shiftDistance + yGap ) * ( shiftDirection === 'up' ? 1 : -1 );

				// Update position
				newPosition = 'translate(' + translateX + ', ' + stackDirection + distance + 'px)';
				Notification.instances[ i ].$components.notification.style.webkitTransform = newPosition;
				Notification.instances[ i ].$components.notification.style.transform = newPosition;

			}

		}

		/**
		 * Calculate linear value to eased value
		 *
		 * @param   {Number}  t  Linear progress number
		 * @return  {Number}     Eased progress number (ease-in-out-quad)
		 */
		function convertLinearToEase( t ) {
			return ( t < 0.5 ) ? ( 2 * t * t ) : ( -1 + ( 4 - 2 * t ) * t );
		}

	};

	/**
	 * Small helper function that calls a given callback only if it exists
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.next = function next( callback ) {
		if ( typeof callback === 'function' ) {
			callback();
		}
	};

	/* ==========  COUNTDOWN  ========== */

	/**
	 * Countdown
	 *
	 * This countdown offers the ability to be paused, resumed and stopped at any time.
	 *
	 * @param   {Number}    duration  Countdown duration in ms
	 * @param   {Function}  callback  Callback function that is being executed when countdown has finished
	 */
	var Countdown = function Countdown( duration, callback ) {

		// Options
		this.duration = duration;
		this.remaining = duration;
		this.callback = callback;

		// Start countdown automatically when creating a countdown object
		this.resume();

	};

	/**
	 * Start / resume countdown
	 */
	Countdown.prototype.resume = function resume() {
		this.now = new Date();
		this.timerId = window.setTimeout( this.callback, this.remaining );
	};

	/**
	 * Pause countdown
	 */
	Countdown.prototype.pause = function pause() {
		window.clearTimeout( this.timerId );
		this.remaining -= new Date() - this.now;
	};

	/**
	 * Stop countdown
	 */
	Countdown.prototype.stop = function stop() {
		window.clearTimeout( this.timerId );
		this.remaining = this.duration;
	};

	/* ==========  PUBLIC API  ========== */

	/**
	 * Public API
	 */
	var API = {

		/**
		 * Show notification
		 *
		 * For sure the following construction of nested function calls seems to be a good example for a callback hell.
		 * But this way we can provide an easy to understand and maintainable overview over the typical life cycle
		 * procedure of a notification. In order to make it less ugly we simplified all the methods here as much as
		 * possible (e.g. short names and the callback function as the one and only parameter).
		 *
		 * Important note:
		 * This callback hell is just temporarily and obviously not the best solution. In the near future this part will
		 * be completely rewritten - based on the technology of JavaScript Promises - as soon as ES6 is supported by all
		 * major browsers.
		 *
		 * @param  {String}  profile 	Notification profile name
		 * @param  {String}  message 	Notification message
		 * @param  {Object}  [options]  Custom notification options
		 */
		notify: function notify( profile, message, options ) {

			// Create and initialize notification
			var notification = new Notification( profile, message, options );

			// Go! - Start the notification life cycle
			notification.build( function() {
				notification.prepare( function() {
					notification.open( function() {
						notification.wait( function() {
							notification.close();
						} );
					} );
				} );
			} );

		},

		/**
		 * Register a global event listener (works for all notifications)
		 *
		 * @param   {String}    event     Event name
		 * @param   {Function}  callback  Callback function
		 */
		on: function on( event, callback ) {

			if ( typeof event === 'undefined' || typeof callback === 'undefined' ) {
				throw new Error( 'Adding an event listener requires an event name and a callback function.' );
			} else if ( Notification.EVENTS.indexOf( event ) === -1 ) {
				throw new Error( 'An event with the name <' + event + '> does not exist.' );
			} else {
				document.addEventListener( 'notification.' + event, callback );
			}

		},

		/**
		 * Remove a global event listener (works for all notifications)
		 *
		 * @param   {String}    event     Event name
		 * @param   {Function}  callback  Callback function
		 */
		off: function off( event, callback ) {

			if ( typeof event === 'undefined' || typeof callback === 'undefined' ) {
				throw new Error( 'Removing an event listener requires an event name and a callback function.' );
			} else if ( Notification.EVENTS.indexOf( event ) === -1 ) {
				throw new Error( 'An event with the name <' + event + '> does not exist.' );
			} else {
				document.removeEventListener( 'notification.' + event, callback );
			}

		},

		/**
		 * Clear all existing notifications
		 *
		 * @param  {Boolean | Number}  [offset]    Time offset between notifications animating out (in s)
		 * @param  {Function} 		   [callback]  Callback function
		 */
		clearAll: function clearAll() {

			// Clear only when at least one notification is open
			if ( Notification.instances.length ) {

				var parameters = getParameters( arguments );

				// Close all notifications
				var countNotifications = Notification.instances.length;
				for ( var i = countNotifications - 1; i >= 0; i-- ) {

					// Check if animation offset is enabled
					if ( parameters.offset ) {
						closeNotification( i );
					} else {
						if ( !i && typeof parameters.callback !== 'undefined' ) {
							Notification.instances[ i ].close( parameters.callback );
						} else {
							Notification.instances[ i ].close();
						}
					}

				}

			}

			/**
			 * Get values out of dynamic parameters
			 *
			 * @param   {Array}   input  Incoming function arguments
			 * @return  {Object}	  	 Parameters
			 */
			function getParameters( input ) {

				var output = {};

				// Find out parameters
				switch ( input.length ) {
					case 0:
						output.offset = 0.15;
						output.callback = undefined;
						break;
					case 1:
						output.offset = typeof input[ 0 ] === 'function' ? 0.15 : input[ 0 ];
						output.callback = typeof input[ 0 ] === 'function' ? input[ 0 ] : undefined;
						break;
					default:
						output.offset = input[ 0 ];
						output.callback = input[ 1 ];
				}

				return output;

			}

			/**
			 * Schedule notification animations
			 *
			 * @param  {Number}  instance  Number of notification instance
			 */
			function closeNotification( instance ) {

				// Get current notification instance
				var notification = Notification.instances[ instance ];

				// Schedule animation
				setTimeout( function() {
					if ( instance === countNotifications - 1 && typeof parameters.callback !== 'undefined' ) {
						notification.close( parameters.callback );
					} else {
						notification.close();
					}
				}, instance * parameters.offset * 1000 );

			}

		},

		/**
		 * Clear oldest notification
		 *
		 * @param  {Function}  [callback]  Callback
		 */
		clearOldest: function clearOldest( callback ) {

			// Clear only when at least one notification is open
			if ( Notification.instances.length ) {

				var notification = Notification.instances[ 0 ];
				if ( typeof callback !== 'undefined' ) {
					notification.close( callback );
				} else {
					notification.close();
				}

			}

		},

		/**
		 * Clear newest notification
		 *
		 * @param  {Function}  [callback]  Callback
		 */
		clearNewest: function clearNewest( callback ) {

			// Clear only when at least one notification is open
			if ( Notification.instances.length ) {

				var notification = Notification.instances[ Notification.instances.length - 1 ];
				if ( typeof callback !== 'undefined' ) {
					notification.close( callback );
				} else {
					notification.close();
				}

			}

		},

		/**
		 * Get profile options
		 *
		 * @param   {String}  profile  Profile name
		 * @return  {Object}           Profile options
		 */
		getProfile: function getProfile( profile ) {

			if ( typeof profile === 'undefined' ) {
				throw new Error( 'Getting the options of a notification profile requires a profile name.' );
			} else if ( !Profiles.check( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else {
				return Profiles.get( profile );
			}

		},

		/**
		 * Check if profile exists
		 *
		 * @param   {Stirng}   profile  Profile name
		 * @return  {Boolean} 			Result
		 */
		checkProfile: function checkProfile( profile ) {

			if ( typeof profile === 'undefined' ) {
				throw new Error( 'Checking if a notification profile exists required a profile name.' );
			} else {
				return Profiles.check( profile );
			}

		},

		/**
		 * Configure profile
		 *
		 * @param  {String}  profile  Profile name
		 * @param  {Object}  options  Profile options
		 */
		configProfile: function configProfile( profile, options ) {

			if ( typeof profile === 'undefined' || typeof options === 'undefined' ) {
				throw new Error( 'Configuring a notification profile requires a profile name and an options object.' );
			} else if ( !Profiles.check( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else {
				Profiles.config( profile, options );
			}

		},

		/**
		 * Add new profile
		 *
		 * @param  {String}  profile    Profile name
		 * @param  {Object}  [options]  Profile options
		 */
		addProfile: function addProfile( profile, options ) {

			if ( typeof profile === 'undefined' ) {
				throw new Error( 'Adding a new notification profile requires at least a profile name.' );
			} else if ( Profiles.check( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else {
				Profiles.add( profile, options );
			}

		},

		/**
		 * Remove profile
		 *
		 * @param  {String}  profile  Profile name
		 */
		removeProfile: function removeProfile( profile ) {

			if ( typeof profile === 'undefined' ) {
				throw new Error( 'Removing a notification profile requires a profile name.' );
			} else if ( [ 'global', 'default', 'info', 'success', 'error', 'warning' ].indexOf( profile ) !== -1 ) {
				throw new Error( 'The profile <' + profile + '> is locked and cannot be removed.' );
			} else if ( !Profiles.check( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else {
				Profiles.remove( profile );
			}

		},

		/**
		 * Reset profile
		 *
		 * @param  {Stirng}  profile  Profile name
		 */
		resetProfile: function resetProfile( profile ) {

			if ( typeof profile === 'undefined' ) {
				throw new Error( 'Resetting a notification profile requires a profile name.' );
			} else if ( [ 'global', 'default', 'info', 'success', 'error', 'warning' ].indexOf( profile ) !== -1 ) {
				throw new Error( 'The profile <' + profile + '> is locked and cannot be reset.' );
			} else if ( !Profiles.check( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else {
				Profiles.reset( profile );
			}

		}

	};

	return API;

} ) );
