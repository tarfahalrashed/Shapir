/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var renderSwitcher = function() {
	if ($('[data-render=switchery]').length !== 0) {
		$('[data-render=switchery]').each(function() {
			var themeColor = COLOR_GREEN;
			if ($(this).attr('data-theme')) {
				switch ($(this).attr('data-theme')) {
					case 'red':
						themeColor = COLOR_RED;
						break;
					case 'blue':
						themeColor = COLOR_BLUE;
						break;
					case 'purple':
						themeColor = COLOR_PURPLE;
						break;
					case 'orange':
						themeColor = COLOR_ORANGE;
						break;
					case 'black':
						themeColor = COLOR_BLACK;
						break;
				}
			}
			var option = {};
			option.color = themeColor;
			option.secondaryColor = ($(this).attr('data-secondary-color')) ? $(this).attr('data-secondary-color') : '#dfdfdf';
			option.className = ($(this).attr('data-classname')) ? $(this).attr('data-classname') : 'switchery';
			option.disabled = ($(this).attr('data-disabled')) ? true : false;
			option.disabledOpacity = ($(this).attr('data-disabled-opacity')) ? parseFloat($(this).attr('data-disabled-opacity')) : 0.5;
			option.speed = ($(this).attr('data-speed')) ? $(this).attr('data-speed') : '0.5s';
			var switchery = new Switchery(this, option);
		});
	}
};

var checkSwitcherState = function() {
	$(document).on('click', '[data-click="check-switchery-state"]', function() {
		alert($('[data-id="switchery-state"]').prop('checked'));
	});
	$(document).on('change', '[data-change="check-switchery-state-text"]', function() {
		$('[data-id="switchery-state-text"]').text($(this).prop('checked'));
	});
};

var renderPowerRangeSlider = function() {
	if ($('[data-render="powerange-slider"]').length !== 0) {
		$('[data-render="powerange-slider"]').each(function() {
			var option = {};
			option.decimal = ($(this).attr('data-decimal')) ? $(this).attr('data-decimal') : false;
			option.disable = ($(this).attr('data-disable')) ? $(this).attr('data-disable') : false;
			option.disableOpacity = ($(this).attr('data-disable-opacity')) ? parseFloat($(this).attr('data-disable-opacity')) : 0.5;
			option.hideRange = ($(this).attr('data-hide-range')) ? $(this).attr('data-hide-range') : false;
			option.klass = ($(this).attr('data-class')) ? $(this).attr('data-class') : '';
			option.min = ($(this).attr('data-min')) ? parseInt($(this).attr('data-min')) : 0;
			option.max = ($(this).attr('data-max')) ? parseInt($(this).attr('data-max')) : 100;
			option.start = ($(this).attr('data-start')) ? parseInt($(this).attr('data-start')) : null;
			option.step = ($(this).attr('data-step')) ? parseInt($(this).attr('data-step')) : null;
			option.vertical = ($(this).attr('data-vertical')) ? $(this).attr('data-vertical') : false;
			if ($(this).attr('data-height')) {
				$(this).closest('.slider-wrapper').height($(this).attr('data-height'));
			}
			var switchery = new Switchery(this, option);
			var powerange = new Powerange(this, option);
		});
	}
};

var FormSliderSwitcher = function () {
	"use strict";
	return {
		//main function
		init: function () {
			// switchery
			renderSwitcher();
			checkSwitcherState();

			// powerange slider
			renderPowerRangeSlider();
		}
	};
}();

$(document).ready(function() {
	FormSliderSwitcher.init();
});