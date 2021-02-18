/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleRenderHighlight = function() { 
	$('.hljs-wrapper pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
};

var Highlight = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleRenderHighlight();
		}
	};
}();

$(document).ready(function() {
	Highlight.init();
});