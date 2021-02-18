/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var getRandomValue = function() {
	var value = [];
	for (var i = 0; i<= 19; i++) {
		value.push(Math.floor((Math.random() * 10) + 1));
	}
	return value;
};

var handleRenderKnobDonutChart = function() {
	$('.knob').knob();
};

var handleRenderSparkline = function() {
	var options = {
		height: '50px',
		width: '100%',
		fillColor: 'transparent',
		type: 'bar',
		barWidth: 8,
		barColor: COLOR_GREEN
	};
    
	var value = getRandomValue();
	$('#sidebar-sparkline-1').sparkline(value, options);

	value = getRandomValue();
	options.barColor = COLOR_BLUE;
	$('#sidebar-sparkline-2').sparkline(value, options);

	value = getRandomValue();
	options.barColor = COLOR_PURPLE;
	$('#sidebar-sparkline-3').sparkline(value, options);

	value = getRandomValue();
	options.barColor = COLOR_RED;
	$('#sidebar-sparkline-4').sparkline(value, options);
};

var PageWithTwoSidebar = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleRenderKnobDonutChart();
			handleRenderSparkline();
		}
	};
}();

$(document).ready(function() {
	PageWithTwoSidebar.init();
});