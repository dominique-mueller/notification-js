# Changelog

Similar to our [GitHub releases page](https://github.com/dominique-mueller/notification-js/releases).


## 1.1.0 / 2015-08-23

**Support**

* Now available via npm
* Now with support for AMD and Node environments

**Features**

* Added support for multi-line messages
* Added option to define the maximum notification width (default is false)
* Added option to define the message text size (default is 14)
* Added support for strings containing svg as the symbol resource
* Added new methods to the clear API (clearNewest, clearOldest)
* Extended clear API methods (now with optional callbacks)
* Added new methods o the profile API (resetProfile, getProfile, checkProfile)
* Improved error handling for API methods

**Bugfixes**

* Fixed error occuring when clearAll animation offset is a high value

**Development**

* Added CSS autoprefixer Grunt task
* Few Grunt tasks optimizations



## 1.0.4 / 2015-08-21

**Bugfixes**

* Fixed wrong symbol size when using round corners
* Symbol will not be rendered when the resource is not set



## 1.0.3 / 2015-08-12

**Bugfixes**

* Fixed notification closing behaviour
* Fixed configProfile saving issues
* Fixed NotFoundError (in browser dev console)



## 1.0.2 / 2015-08-11

**Development**

* CSS formatter Grunt task
* More specialized Grunt tasks
* Git hook (pre-commit) for Grunt task - automatically created when calling `npm install`



## 1.0.1 / 2015-08-11

**Bugfixes**

* Fixed wrong symbol size



## 1.0.0 / 2015-08-10

**At this moment the public API is considered to be stable!**

* Most important features are implemented
* Development automation with Grunt tasks
* Support for installation using Bower (more coming soon)
