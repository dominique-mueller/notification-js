( function() {

	'use strict';

	module.exports = function( grunt ) {

		// Project configuration
		grunt.initConfig( {

			// Import package configuration
			pkg: grunt.file.readJSON( 'package.json' ),

			/* ---------- CSS tasks ---------- */

			// Configure CSS autoprefixer
			postcss: {
				options: {
					processors: [
						require( 'autoprefixer-core' )( {
							browsers: [
								'Explorer >= 10',
								'Firefox >= 23',
								'Chrome >= 26',
								'Opera >= 15',
								'Safari >= 6.1'
							]
						} )
					]
				},
				build: {
					src: 'src/notification.css',
					dest: 'src/notification.css'
				}
			},

			// Configure CSS formatter
			csscomb: {
				options: {
					config: '.csscomb.json'
				},
				build: {
					src: 'src/notification.css',
					dest: 'src/notification.css'
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

			// Configure CSS minifier
			cssmin: {
				build: {
					src: 'src/notification.css',
					dest: 'build/notification.min.css'
				}
			},

			/* ---------- JavaScript tasks ---------- */

			// Configure JavaScript formatter
			jscs: {
				options: {
					config: '.jscsrc',
					fix: true
				},
				build: {
					src: 'src/notification.js',
					dest: 'src/notification.js'
				}
			},

			// Configure JavaScript validator
			jshint: {
				options: {
					jshintrc: '.jshintrc'
				},
				build: {
					src: 'src/notification.js'
				}
			},

			// Configure JavaScript uglifier
			uglify: {
				options: {
					preserveComments: 'some',
					screwIE8: true
				},
				build: {
					src: 'src/notification.js',
					dest: 'build/notification.min.js'
				}
			},

			/* ---------- Additional tasks ---------- */

			// Configure git hook
			githooks: {
				all: {
					'pre-commit': 'postcss:build csscomb:build csslint:build cssmin:build jscs:build jshint:build uglify:build'
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
		grunt.loadNpmTasks( 'grunt-postcss' );

		// Optimize CSS task
		grunt.registerTask( 'optimize-css', [
			'postcss:build',
			'csscomb:build',
			'csslint:build',
			'cssmin:build'
		] );

		// Optimize JS task
		grunt.registerTask( 'optimize-js', [
			'jscs:build',
			'jshint:build',
			'uglify:build'
		] );

		// Create githook task
		grunt.registerTask( 'creategithook', [
			'githooks:all'
		] );

		// Create default task
		grunt.registerTask( 'default', [
			'postcss:build',
			'csscomb:build',
			'csslint:build',
			'cssmin:build',
			'jscs:build',
			'jshint:build',
			'uglify:build'
		] );

	};

} )();
