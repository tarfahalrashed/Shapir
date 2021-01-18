/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

Chart.defaults.global.defaultFontColor = COLOR_DARK;
Chart.defaults.global.defaultFontFamily = FONT_FAMILY;
Chart.defaults.global.defaultFontStyle = FONT_WEIGHT;

var randomScalingFactor = function() { 
	return Math.round(Math.random()*100)
};

var lineChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Dataset 1',
		borderColor: COLOR_BLUE,
		pointBackgroundColor: COLOR_BLUE,
		pointRadius: 2,
		borderWidth: 2,
		backgroundColor: COLOR_BLUE_TRANSPARENT_3,
		data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	}, {
		label: 'Dataset 2',
		borderColor: COLOR_DARK_LIGHTER,
		pointBackgroundColor: COLOR_DARK,
		pointRadius: 2,
		borderWidth: 2,
		backgroundColor: COLOR_DARK_TRANSPARENT_3,
		data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	}]
};

var barChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Dataset 1',
		borderWidth: 2,
		borderColor: COLOR_INDIGO,
		backgroundColor: COLOR_INDIGO_TRANSPARENT_3,
		data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	}, {
		label: 'Dataset 2',
		borderWidth: 2,
		borderColor: COLOR_DARK,
		backgroundColor: COLOR_DARK_TRANSPARENT_3,
		data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
	}]
};

var radarChartData = {
	labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
	datasets: [{
		label: 'Dataset 1',
		borderWidth: 2,
		borderColor: COLOR_RED,
		pointBackgroundColor: COLOR_RED,
		pointRadius: 2,
		backgroundColor: COLOR_RED_TRANSPARENT_2,
		data: [65,59,90,81,56,55,40]
	}, {
		label: 'Dataset 2',
		borderWidth: 2,
		borderColor: COLOR_DARK,
		pointBackgroundColor: COLOR_DARK,
		pointRadius: 2,
		backgroundColor: COLOR_DARK_TRANSPARENT_2,
		data: [28,48,40,19,96,27,100]
	}]
};

var polarAreaData = {
	labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
	datasets: [{
		data: [300, 160, 100, 200, 120],
		backgroundColor: [COLOR_INDIGO_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_GREEN_TRANSPARENT_7, COLOR_GREY_TRANSPARENT_7, COLOR_DARK_TRANSPARENT_7],
		borderColor: [COLOR_INDIGO, COLOR_BLUE, COLOR_GREEN, COLOR_GREY, COLOR_DARK],
		borderWidth: 2,
		label: 'My dataset'
	}]
};

var pieChartData = {
	labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
	datasets: [{
		data: [300, 50, 100, 40, 120],
		backgroundColor: [COLOR_RED_TRANSPARENT_7, COLOR_ORANGE_TRANSPARENT_7, COLOR_MUTED_TRANSPARENT_7, COLOR_GREY_TRANSPARENT_7, COLOR_DARK_TRANSPARENT_7],
		borderColor: [COLOR_RED, COLOR_ORANGE, COLOR_MUTED, COLOR_GREY, COLOR_DARK],
		borderWidth: 2,
		label: 'My dataset'
	}]
};

var doughnutChartData = {
	labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
	datasets: [{
		data: [300, 50, 100, 40, 120],
		backgroundColor: [COLOR_INDIGO_TRANSPARENT_7, COLOR_BLUE_TRANSPARENT_7, COLOR_GREEN_TRANSPARENT_7, COLOR_GREY_TRANSPARENT_7, COLOR_DARK_TRANSPARENT_7],
		borderColor: [COLOR_INDIGO, COLOR_BLUE, COLOR_GREEN, COLOR_GREY, COLOR_DARK],
		borderWidth: 2,
		label: 'My dataset'
  }]
};

var handleChartJs = function() {
	var ctx = document.getElementById('line-chart').getContext('2d');
	var lineChart = new Chart(ctx, {
		type: 'line',
		data: lineChartData
	});

	var ctx2 = document.getElementById('bar-chart').getContext('2d');
	var barChart = new Chart(ctx2, {
		type: 'bar',
		data: barChartData
	});

	var ctx3 = document.getElementById('radar-chart').getContext('2d');
	var radarChart = new Chart(ctx3, {
		type: 'radar',
		data: radarChartData
	});

	var ctx4 = document.getElementById('polar-area-chart').getContext('2d');
	var polarAreaChart = new Chart(ctx4, {
		type: 'polarArea',
		data: polarAreaData
	});

	var ctx5 = document.getElementById('pie-chart').getContext('2d');
	window.myPie = new Chart(ctx5, {
		type: 'pie',
		data: pieChartData
	});

	var ctx6 = document.getElementById('doughnut-chart').getContext('2d');
	window.myDoughnut = new Chart(ctx6, {
		type: 'doughnut',
		data: doughnutChartData
	});
};

var ChartJs = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleChartJs();
		}
	};
}();

$(document).ready(function() {
	ChartJs.init();
});