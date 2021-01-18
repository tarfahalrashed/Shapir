/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleSuperboxGallery = function() {
	"use strict";
	$('.superbox').SuperBox({
		background : '#242a30',
		border : 'rgba(0,0,0,0.1)',
		xColor : '#a8acb1',
		xShadow : 'embed'
	});
};


var GalleryV2 = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleSuperboxGallery();
		}
	};
}();

$(document).ready(function() {
	GalleryV2.init();
});