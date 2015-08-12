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

( function( window, document, undefined ) {

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

	/* ==========  CONFIGURATION  ========== */

	/**
	 * Configuration profiles
	 * @type  {Object}
	 */
	var profiles = {

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
				color: '#FFF'

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

	/* ==========  DEFAULT SYMBOLS  ========== */

	/**
	 * Create success symbol
	 *
	 * @return  {Element}  SVG element
	 */
	var createSuccessIcon = function() {

		// Create elements
		var $svg 		= document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		var $polyline 	= document.createElementNS( 'http://www.w3.org/2000/svg', 'polyline' );

		// Set svg attributes
		$svg.setAttributeNS( null, 'viewBox', '0 0 24 24' );

		// Set polyline attributes
		$polyline.setAttributeNS( null, 'points', '4,12.5 9,17.5 20,6.5' );
		$polyline.setAttributeNS( null, 'fill', 'none' );
		$polyline.setAttributeNS( null, 'stroke-width', '2' );
		$polyline.setAttributeNS( null, 'stroke', '#FFF' );
		$polyline.setAttributeNS( null, 'stroke-dasharray', '23' );

		// Add polyline to svg
		$svg.appendChild( $polyline );

		// Done
		return $svg;

	};

	/**
	 * Create error symbol (also used for the dismiss icon)
	 *
	 * @return  {Element}  SVG element
	 */
	var createErrorIcon = function() {

		// Create elements
		var $svg 		= document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		var $lineOne 	= document.createElementNS( 'http://www.w3.org/2000/svg', 'line' );
		var $lineTwo 	= document.createElementNS( 'http://www.w3.org/2000/svg', 'line' );

		// Set svg attributes
		$svg.setAttributeNS( null, 'viewBox', '0 0 24 24' );

		// Set first line attributes
		$lineOne.setAttributeNS( null, 'x1', '6' );
		$lineOne.setAttributeNS( null, 'y1', '6' );
		$lineOne.setAttributeNS( null, 'x2', '18' );
		$lineOne.setAttributeNS( null, 'y2', '18' );
		$lineOne.setAttributeNS( null, 'stroke-width', '2' );
		$lineOne.setAttributeNS( null, 'stroke', '#FFF' );
		$lineOne.setAttributeNS( null, 'stroke-dasharray', '17' );

		// Set second line attributes
		$lineTwo.setAttributeNS( null, 'x1', '6' );
		$lineTwo.setAttributeNS( null, 'y1', '18' );
		$lineTwo.setAttributeNS( null, 'x2', '18' );
		$lineTwo.setAttributeNS( null, 'y2', '6' );
		$lineTwo.setAttributeNS( null, 'stroke-width', '2' );
		$lineTwo.setAttributeNS( null, 'stroke', '#FFF' );
		$lineTwo.setAttributeNS( null, 'stroke-dasharray', '17' );

		// Add both lines to svg
		$svg.appendChild( $lineOne );
		$svg.appendChild( $lineTwo );

		// Done
		return $svg;

	};

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
		this.profile = ( typeof profiles[ profile ] !== 'undefined' ) ? profile : 'default';

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
	 *
	 * Here we combine all existing options (coming from different hierarchies) into one custom options object that
	 * will be only used by this notification instance. The options object passed in when calling the 'notify' method
	 * is the most specific one and gets the highest priority. After that the profile specific options and then the
	 * globally defined options are taken into account.
	 */
	Notification.prototype.initialize = function initialize() {

		var _this = this;

		// Combine multiple option objects into one
		var combinedOptions = {};
		for ( var option in profiles.global ) {
			combinedOptions[ option ] = merge(
				profiles.global[ option ],
				profiles[ _this.profile ][ option ],
				_this.options[ option ]
			);
		}
		_this.options = combinedOptions;

		/**
		 * HELPER METHODS
		 */

		/**
		 * Merge multiple objects
		 *
		 * The objects are merged from right to left - that means the rightmost object has the highest priority and the
		 * lestmost object the lowest priority. The number of passed in objects is variable.
		 *
		 * @param   {...Object}  var_args  Multiple option objects
		 * @return  {Object} 			   Merged result object
		 */
		function merge() {

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

		}

	};

	/**
	 * Build notification DOM element
	 *
	 * @param  {Function}  [callback]  Callback function
	 */
	Notification.prototype.build = function build( callback ) {

		var _this = this;

		// Options
		var notificationDesign 	= _this.options.notification;
		var symbolDesign 		= _this.options.symbol;
		var messageDesign 		= _this.options.message;
		var dismissDesign 		= _this.options.dismiss;

		// Build notification container
		var $notification = buildContainer();
		_this.$components.notification = $notification;

		// Build notification symbol
		if ( symbolDesign.visible ) {
			var $symbol = buildSymbol();
			$notification.appendChild( $symbol );
			_this.$components.symbol = $symbol;
		}

		// Build notification message
		if ( messageDesign.visible ) {
			var $message = buildMessage();
			$notification.appendChild( $message );
			_this.$components.message = $message;
		}

		// Build notification dismiss button
		if ( dismissDesign.visible ) {
			var $button = buildButton();
			$notification.appendChild( $button );
			_this.$components.button = $button;
		}

		// Insert notification into DOM
		var $fragment = document.createDocumentFragment();
		$fragment.appendChild( $notification );
		document.body.appendChild( $fragment );

		// Continue
		_this.next( callback );

		/**
		 * SPECIALIZED BUILD METHODS
		 */

		/**
		 * Build notification container
		 *
		 * @return  {Element}  Notification container DOM element
		 */
		function buildContainer() {

			// DOM elements
			var $container 				= document.createElement( 'div' );
			var $containerBackground 	= document.createElement( 'div' );

			// Options
			var xPosition 				= notificationDesign.position[ 0 ];
			var yPosition 				= notificationDesign.position[ 1 ];
			var xDistance 				= notificationDesign.distances[ 0 ];
			var yDistance 				= notificationDesign.distances[ 1 ];
			var height 					= notificationDesign.height;
			var borderRadius 			= notificationDesign.roundCorners;
			var color 					= notificationDesign.color;

			// Set styles
			switch ( xPosition ) {
				case 'left':
					$container.style.left = xDistance + 'px';
					break;
				case 'right':
					$container.style.right = xDistance + 'px';
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
			$container.style.height = height + 'px';
			if ( borderRadius ) {
				$container.style.borderRadius = borderRadius[ 0 ] + 'px ' +
												borderRadius[ 1 ] + 'px ' +
												borderRadius[ 2 ] + 'px ' +
												borderRadius[ 3 ] + 'px';
			}
			$containerBackground.style.left = 'calc(-100% + ' + ( height / 2 ) + 'px' + ')';
			$containerBackground.style.backgroundColor = color;

			// Set classes
			$container.classList.add( 'notification' );
			$container.classList.add( 'notification-' + _this.profile );
			$containerBackground.classList.add( 'notification-background' );

			// Add background to container
			$container.appendChild( $containerBackground );

			// Done
			_this.$components.background = $containerBackground;
			return $container;

		}

		/**
		 * Build notification symbol
		 *
		 * @return  {Element}  Notification symbol DOM element
		 */
		function buildSymbol() {

			// DOM elements
			var $symbol;

			// Options
			var size 			= notificationDesign.height;
			var resource 		= symbolDesign.resource;
			var borderRadius 	= symbolDesign.roundCorners;
			var color 			= symbolDesign.color;

			// Set symbol:
			// If the resource is a string, we assume that the symbol is an external image of any format. But if the
			// resource is a function, we expect this function to return a valid svg DOM element. By default we fall
			// back on our own svg symbols.
			if ( !resource || typeof resource === 'function' ) {

				if ( !resource ) {

					// Get the internal svg symbol
					switch ( _this.profile ) {
						case 'success':
							$symbol = createSuccessIcon();
							break;
						case 'error':
							$symbol = createErrorIcon();
							break;
					}

				} else {

					// Get the external svg symbol
					$symbol = resource();

					// Verify that the resource function really returned a valid svg DOM element
					if ( typeof $symbol === 'undefined' || $symbol.nodeName.toLowerCase() !== 'svg' ) {
						throw new Error( 'The custom notification symbol is not a valid svg element.' );
					}

				}

				// Set attributes
				$symbol.setAttributeNS( null, 'width', '24' );
				$symbol.setAttributeNS( null, 'size', '24' );

				// Set styles
				$symbol.style.height = size + 'px';
				$symbol.style.width = size + 'px';
				if ( borderRadius ) {
					$symbol.style.padding = ( size / 2 - 17 ) + 'px';
					$symbol.style.margin = '5px';
					$symbol.style.borderRadius = borderRadius[ 0 ] + 'px ' +
												 borderRadius[ 1 ] + 'px ' +
												 borderRadius[ 2 ] + 'px ' +
												 borderRadius[ 3 ] + 'px';
				} else {
					$symbol.style.padding = ( size / 2 - 12 ) + 'px';
				}

			} else {

				// Create DOM elements (we do not use an image object to allow positioning and resizing the image)
				$symbol = document.createElement( 'div' );

				// Set background image based on resource url
				$symbol.style.backgroundImage = 'url("' + resource + '")';
				$symbol.style.backgroundPosition = 'center';
				$symbol.style.backgroundSize = 'cover';
				$symbol.style.backgroundRepeat = 'no-repeat';

				// Set styles
				if ( symbolDesign.roundCorners ) {
					$symbol.style.height = ( size - 10 ) + 'px';
					$symbol.style.width = ( size - 10 ) + 'px';
					$symbol.style.margin = '5px';
					$symbol.style.borderRadius = borderRadius[ 0 ] + 'px ' +
												 borderRadius[ 1 ] + 'px ' +
												 borderRadius[ 2 ] + 'px ' +
												 borderRadius[ 3 ] + 'px';
				} else {
					$symbol.style.height = size + 'px';
					$symbol.style.width = size + 'px';
				}

			}

			// Set styles
			if ( color ) {
				$symbol.style.backgroundColor = color;
			}

			// Set classes (via attribute because IE is too dumb to use classList on SVG elements)
			if ( _this.options.animations.enabled && !resource ) {
				$symbol.setAttributeNS( null, 'class', 'notification-symbol notification-symbol-' + _this.profile );
			} else {
				$symbol.setAttributeNS( null, 'class', 'notification-symbol' );
			}

			// Done
			return $symbol;

		}

		/**
		 * Build notification message
		 *
		 * @return  {Element}  Notification message DOM element
		 */
		function buildMessage() {

			// DOM elements
			var $message 	= document.createElement( 'p' );

			// Options
			var color 		= messageDesign.color;
			var height 		= notificationDesign.height;
			var padding 	= Math.round( notificationDesign.height / 2.75 );

			// Set message:
			// When the html mode is enabled, custom html markup (like hyperlinks or text formatting) will be
			// recognized and rendered by the browser. But note that disabling the html mode generally gives you
			// improved performance as well as better security (XSS not possible).
			if ( _this.options.behaviour.htmlMode ) {
				$message.innerHTML = _this.message;
			} else {
				$message.textContent = _this.message;
			}

			// Set styles
			$message.style.color = color;
			$message.style.lineHeight = height + 'px';
			$message.style.paddingLeft = padding + 'px';
			$message.style.paddingRight = padding + 'px';

			// Set class
			$message.classList.add( 'notification-message' );

			// Done
			return $message;

		}

		/**
		 * Build notification dismiss button
		 *
		 * @return  {Element}  Notification dismiss button DOM element
		 */
		function buildButton() {

			// DOM elements
			var $button 	= document.createElement( 'button' );

			// Options
			var height 		= notificationDesign.height;
			var text 		= dismissDesign.text;
			var color 		= dismissDesign.color;

			// Set attributes (mostly for accessibility reasons)
			$button.setAttribute( 'type', 'button' );
			$button.setAttribute( 'title', 'Dismiss this notification' );

			// Set styles
			$button.style.height = ( height - 20 ) + 'px';
			$button.style.padding = ( height / 2 - 18 ) + 'px';

			// Set icon or text as the button content
			if ( text ) {

				// Add text to the button
				$button.appendChild( document.createTextNode( text ) );

				// Set styles
				$button.style.color = color;
				$button.style.lineHeight = '16px';

			} else {

				// Get icon to the button
				var $icon = createErrorIcon();
				$icon.setAttributeNS( null, 'width', '16' );
				$icon.setAttributeNS( null, 'height', '16' );
				$button.appendChild( $icon );

				// Set styles
				$button.style.width = ( height - 20 ) + 'px';

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

				// If the limit is dynamic, make some calculations first
				if ( limit === true || limit < 0 ) {

					// Options
					var notificationDesign 	= _this.options.notification;
					var height 				= notificationDesign.height;
					var distance 			= notificationDesign.distances[ 1 ];
					var spacing 			= notificationDesign.distances[ 2 ];

					// Calculate number of notifications that we need room for (including the new notification)
					var requiredNumber = ( limit === true ? countNotifications : countNotifications - limit ) + 1;

					// Calculate required overall height
					var requiredHeight = ( distance * 2 ) + ( requiredNumber * height ) + ( requiredNumber * spacing );

					// Based on the results we finally check if there is enough room for the new notification
					closeFirst = ( requiredHeight > window.innerHeight ) ? true : false;

				} else {

					// Check if the limit is set and already reached
					closeFirst = ( limit !== false && limit !== 0 && countNotifications === limit ) ? true : false;

				}

				// If needed we close the oldest notification first before shifting others
				if ( closeFirst ) {

					Notification.instances[ 0 ].close( function() {
						_this.shift( Notification.instances, 'up', function() {

							// Continue
							_this.next( callback );

						} );
					} );

				} else {

					_this.shift( Notification.instances, 'up', function() {

						// Continue
						_this.next( callback );

					} );

				}

			} else {

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

			// Remove this notification from the DOM
			document.body.removeChild( _this.$components.notification );

			// Shift previously opened notifications to get rid of ugly spacing
			if ( _this.options.behaviour.stacking && ( Notification.instances.length - 1 ) ) {

				// Get the position of the current notification within the list of instances
				var position = Notification.instances.indexOf( _this );

				// Shift all previous notifications
				_this.shift( Notification.instances.slice( 0, position ), 'down', function() {

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
		var duration = _this.options.animations.duration;
		var easing = _this.options.animations.easing;

		// Animate the notification in or out depending on the animation direction
		switch ( direction ) {

			case 'in':

				// Set css transitions if animations are enabled
				if ( _this.options.animations.enabled ) {

					// Notification container
					_this.$components.notification.style.transition =
						'box-shadow ' + ( duration[ 0 ] / 1.5 ) + 's ' + easing[ 0 ] + ' ' + ( duration[ 0 ] / 1.5 ) + 's, ' +
						'opacity ' + duration[ 0 ] + 's ' + easing[ 0 ];

					// Notification background
					_this.$components.background.style.transition =
						'transform ' + duration[ 0 ] + 's ' + easing[ 0 ];

					// Notification symbol
					if ( _this.options.symbol.visible ) {
						_this.$components.symbol.style.transition =
							'opacity ' + duration[ 0 ] + 's ' + easing[ 0 ];
					}

					// Notification message
					if ( _this.options.message.visible ) {
						_this.$components.message.style.transition =
							'transform ' + duration[ 0 ] + 's ' + easing[ 0 ] + ', ' +
							'opacity ' + duration[ 0 ] + 's ' + easing[ 0 ];
					}

					// Notification dismiss button
					if ( _this.options.dismiss.visible ) {
						_this.$components.button.style.transition =
							'opacity ' + ( duration[ 0 ] / 1.5 ) + 's ' + easing[ 0 ] + ' ' + ( duration[ 0 ] / 1.5 ) + 's';
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
						'box-shadow ' + duration[ 1 ] + 's ' + easing[ 1 ] + ', ' +
						'opacity ' + duration[ 1 ] + 's ' + easing[ 1 ];

					// Notification background
					_this.$components.background.style.transition =
						'transform 0s linear ' + duration[ 1 ] + 's';

					// Notification symbol
					if ( _this.options.symbol.visible ) {
						_this.$components.symbol.style.transition =
							'opacity 0s linear ' + duration[ 1 ] + 's';
					}

					// Notification message
					if ( _this.options.message.visible ) {
						_this.$components.message.style.transition =
							'transform 0s linear ' + duration[ 1 ] + 's, ' +
							'opacity 0s linear ' + duration[ 1 ] + 's';
					}

					// Notification dismiss button
					if ( _this.options.dismiss.visible ) {
						_this.$components.button.style.transition =
							'opacity 0s linear ' + duration[ 1 ] + 's';
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
			var temp = _this.$components.notification.offsetWidth;
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
	 * @param  {Function}  [callback]      Callback function
	 */
	Notification.prototype.shift = function shift( instances, shiftDirection, callback ) {

		var _this = this;

		// Only shift when there are notifications to shift
		if ( instances.length ) {

			// Get values
			var start = new Date();
			var countSelectedNotifications = instances.length;
			var countNotifications = Notification.instances.length;

			// Get the translateX basis for the case that the horizontal position is set to middle
			var translateX = ( _this.options.notification.position[ 0 ] === 'middle' ) ? '-50%' : '0';

			// Get stacking direction depending on vertical position
			var stackDirection = ( _this.options.notification.position[ 1 ] === 'top' ) ? '+' : '-';

			// Calculate the height of a notification including its vertical spacing offset
			var interval = _this.options.notification.height + _this.options.notification.distances[ 2 ];

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
			var progress = ( animations.enabled ) ? ( new Date() - start ) / ( animations.duration[ 0 ] * 1000 / 1.5 ) : 1;

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

			var distance;
			var position;

			for ( var i = countSelectedNotifications - 1; i >= 0; i-- ) {

				// Calulate new vertical position
				distance = interval * ( countNotifications - 1 - i + progress * ( shiftDirection === 'up' ? 1 : -1 ) );

				// Update position
				position = 'translate(' + translateX + ', ' + stackDirection + distance + 'px)';
				Notification.instances[ i ].$components.notification.style.webkitTransform = position;
				Notification.instances[ i ].$components.notification.style.transform = position;

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
	 * @type  {Object}
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
		notify: function( profile, message, options ) {

			// Create and initialize notification
			var notification = new Notification( profile, message, options );

			// Go! - start the notification life cycle
			notification.prepare( function() {
				notification.build( function() {
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
		on: function( event, callback ) {
			document.addEventListener( 'notification.' + event, callback );
		},

		/**
		 * Remove a global event listener (works for all notifications)
		 *
		 * @param   {String}    event     Event name
		 * @param   {Function}  callback  Callback function
		 */
		off: function( event, callback ) {
			document.removeEventListener( 'notification.' + event, callback );
		},

		/**
		 * Clear all existing notifications
		 *
		 * @param  {Boolean | Number}  [offset]  Time offset between notifications animating out (in s)
		 */
		clearAll: function( offset ) {

			// Set animation time offset (defaults to 150ms)
			var time = ( typeof offset === 'undefined' ) ? 0.15 : offset;

			// Look how many notifications we have to close
			var countNotifications = Notification.instances.length;

			for ( var i = countNotifications - 1; i >= 0; i-- ) {

				// Check if animation offset is enabled
				if ( time ) {
					closeNotification( i );
				} else {
					Notification.instances[ i ].close();
				}

			}

			// Schedule notification animations
			function closeNotification( instance ) {
				setTimeout( function() {
					Notification.instances[ instance ].close();
				}, instance * time * 1000 );
			}

		},

		/**
		 * Configure existing profile
		 *
		 * @param  {String}  profile  Profile name
		 * @param  {Object}  options  Profile options
		 */
		configProfile: function( profile, options ) {

			// Overwrite configuration only if the profile exists and a options object in being passed in
			if ( !profiles.hasOwnProperty( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else if ( typeof options === 'undefined' ) {
				throw new Error( 'Configuring a profile requires an options object.' );
			} else {

				for ( var section in options ) {

					// Create section first (if necessary)
					if ( !profiles[ profile ].hasOwnProperty( section ) ) {
						profiles[ profile ][ section ] = {};
					}

					// Create or update each option within this section
					for ( var option in options[ section ] ) {
						profiles[ profile ][ section ][ option ] = options[ section ][ option ];
					}

				}

			}

		},

		/**
		 * Add new profile
		 *
		 * @param  {String}  profile  	Profile name
		 * @param  {Object}  [options]  Profile options
		 */
		addProfile: function( profile, options ) {

			// Add profile only if the profile does not already exist
			if ( !profiles.hasOwnProperty( profile ) ) {
				profiles[ profile ] = ( typeof options !== 'undefined' ) ? options : {};
			} else {
				throw new Error( 'A notification profile with the name <' + profile + '> already exists.' );
			}

		},

		/**
		 * Remove existing profile
		 *
		 * @param  {String}  profile  Profile name
		 */
		removeProfile: function( profile ) {

			// Remove profile only if the profile exists and can be deleted (default profiles are fixed)
			if ( !profiles.hasOwnProperty( profile ) ) {
				throw new Error( 'A notification profile with the name <' + profile + '> does not exist.' );
			} else if ( [ 'global', 'default', 'info', 'success', 'error', 'warning' ].indexOf( profile ) !== -1 ) {
				throw new Error( 'You cannot delete the <' + profile + '> profile.' );
			} else {
				delete profiles[ profile ];
			}

		}

	};

	/**
	 * Allow global access to the notification API
	 */
	if ( !window.notification ) {
		window.notification = API;
	} else {
		console.warn( 'Global notification object already defined.' );
	}

} )( this, this.document );
