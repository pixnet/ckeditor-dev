/**
 * Created by Yvonne Yu on 15/11/23.
 */

/* jshint node: true, browser: false, es3: false */

'use strict';

module.exports = function( grunt ) {
	grunt.config.merge( {
		concat: {
			lang: {
				options: {
					separator: ';'
				},
				src: [ 'dist/ckeditor.js', 'dist/lang/*.js' ],
				dest: 'dist/ckeditor.js'
			}
		}
	} );
};
