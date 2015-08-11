( function() {

	'use strict';

	module.exports = function( grunt ) {

		// Project configuration
		grunt.initConfig( {

			// Import package configuration
			pkg: grunt.file.readJSON( 'package.json' ),

			// Configure JavaScript formatter
			jscs: {
				build: {
					options: {
						config: '.jscsrc',
						fix: true
					},
					src: [ 'src/notification.js', 'Gruntfile.js' ]
				}
			},

			// Configure CSS formatter
			csscomb: {
				build: {
					options: {
						config: '.csscomb.json'
					},
					files: {
						'src/notification.css': [ 'src/notification.css' ]
					}
				}
			},

			// Configure JavaScript validator
			jshint: {
				files: {
					src: [ 'src/notification.js', 'Gruntfile.js' ]
				}
			},

			// Configure CSS validator
			csslint: {
				options: {
					csslintrc: '.csslintrc'
				},
				build: {
					src: 'src/notification.css'
				}
			},

			// Configure JavaScript uglifier
			uglify: {
				options: {
					preserveComments: 'some',
					screwIE8: true
				},
				build: {
					files: {
						'build/notification.min.js': 'src/notification.js'
					}
				}
			},

			// Configure CSS minifier
			cssmin: {
				build: {
					files: {
						'build/notification.min.css': 'src/notification.css'
					}
				}
			},

			// Configure git hook
			githooks: {
				all: {
					'pre-commit': 'jscs csscomb jshint csslint uglify cssmin'
				}
			}

		} );

		// Load tasks
		grunt.loadNpmTasks( 'grunt-contrib-csslint' );
		grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
		grunt.loadNpmTasks( 'grunt-contrib-jshint' );
		grunt.loadNpmTasks( 'grunt-contrib-uglify' );
		grunt.loadNpmTasks( 'grunt-csscomb' );
		grunt.loadNpmTasks( 'grunt-githooks' );
		grunt.loadNpmTasks( 'grunt-jscs' );

		// Create single tasks
		grunt.registerTask( 'format', [ 'jscs', 'csscomb' ] );
		grunt.registerTask( 'validate', [ 'jshint', 'csslint' ] );
		grunt.registerTask( 'minify', [ 'uglify', 'cssmin' ] );
		grunt.registerTask( 'creategithook', [ 'githooks' ] );

		// Create default task
		grunt.registerTask( 'default', [ 'jscs', 'csscomb', 'jshint', 'csslint', 'uglify', 'cssmin' ] );

	};

} )();
