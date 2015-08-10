module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {

		// Import node configuration
		pkg: grunt.file.readJSON( 'package.json' ),

		// Configure JavaScript formatter
		jscs: {
			options: {
				config: '.jscsrc',
				fix: true
			},
			src: 'src/notification.js'
		},

		// Configure JavaScript validator
		jshint: {
			files: 'src/notification.js'
		},

		// Configure CSS validator
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			strict: {
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
		}

	} );

	// Load tasks
	grunt.loadNpmTasks( 'grunt-contrib-csslint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-jscs' );

	// Create default task
	grunt.registerTask( 'default', [ 'jscs', 'jshint', 'csslint', 'uglify', 'cssmin' ] );
	grunt.registerTask( 'dev', [ 'csslint' ] );

};
