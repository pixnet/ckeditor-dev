/**
 * Created by Yvonne Yu on 15/11/23.
 */

/* jshint node: true, browser: false, es3: false */

'use strict';

module.exports = function( grunt ) {
	grunt.config.merge( {
		concat: {
			sources: {
				options: {
					separator: ';'
				},
				src: [ 'dist/ckeditor.js', 'dist/lang/*.js', 'dist/styles.js' ],
				dest: 'dist/ckeditor.js'
			}
		}
	} );
};
