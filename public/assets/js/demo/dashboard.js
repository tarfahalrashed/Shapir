/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleVectorMap = function() {
	"use strict";
	if ($('#world-map').length !== 0) {
		$('#world-map').vectorMap({
			map: 'world_mill',
			scaleColors: [COLOR_GREY_DARKER, COLOR_GREY_LIGHTER],
			normalizeFunction: 'polynomial',
			hoverOpacity: 0.5,
			hoverColor: false,
			zoomOnScroll: false,
			markerStyle: {
				initial: {
					fill: COLOR_GREEN,
					stroke: 'transparent',
					r: 3
				}
			},
			regionStyle: {
				initial: {
					fill: COLOR_DARK_LIGHTER,
					"fill-opacity": 1,
					stroke: 'none',
					"stroke-width": 0.4,
					"stroke-opacity": 1
				},
				hover: {
					"fill-opacity": 0.8
				},
				selected: {
					fill: 'yellow'
				},
				selectedHover: { }
			},
			focusOn: {
				x: 0.5,
				y: 0.5,
				scale: 0
			},
			backgroundColor: 'transparent',
			markers: [
				{latLng: [41.90, 12.45], name: 'Vatican City'},
				{latLng: [43.73, 7.41], name: 'Monaco'},
				{latLng: [-0.52, 166.93], name: 'Nauru'},
				{latLng: [-8.51, 179.21], name: 'Tuvalu'},
				{latLng: [43.93, 12.46], name: 'San Marino'},
				{latLng: [47.14, 9.52], name: 'Liechtenstein'},
				{latLng: [7.11, 171.06], name: 'Marshall Islands'},
				{latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
				{latLng: [3.2, 73.22], name: 'Maldives'},
				{latLng: [35.88, 14.5], name: 'Malta'},
				{latLng: [12.05, -61.75], name: 'Grenada'},
				{latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
				{latLng: [13.16, -59.55], name: 'Barbados'},
				{latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
				{latLng: [-4.61, 55.45], name: 'Seychelles'},
				{latLng: [7.35, 134.46], name: 'Palau'},
				{latLng: [42.5, 1.51], name: 'Andorra'},
				{latLng: [14.01, -60.98], name: 'Saint Lucia'},
				{latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
				{latLng: [1.3, 103.8], name: 'Singapore'},
				{latLng: [1.46, 173.03], name: 'Kiribati'},
				{latLng: [-21.13, -175.2], name: 'Tonga'},
				{latLng: [15.3, -61.38], name: 'Dominica'},
				{latLng: [-20.2, 57.5], name: 'Mauritius'},
				{latLng: [26.02, 50.55], name: 'Bahrain'},
				{latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
			]
		});
	}
};

var handleInteractiveChart = function () {
	"use strict";
	function showTooltip(x, y, contents) {
		$('<div id="tooltip" class="flot-tooltip">' + contents + '</div>').css( {
			top: y - 45,
			left: x - 55
		}).appendTo("body").fadeIn(200);
	}
	if ($('#interactive-chart').length !== 0) {
	
		var data1 = [ 
			[1, 40], [2, 50], [3, 60], [4, 60], [5, 60], [6, 65], [7, 75], [8, 90], [9, 100], [10, 105], 
			[11, 110], [12, 110], [13, 120], [14, 130], [15, 135],[16, 145], [17, 132], [18, 123], [19, 135], [20, 150] 
		];
		var data2 = [
			[1, 10],  [2, 6], [3, 10], [4, 12], [5, 18], [6, 20], [7, 25], [8, 23], [9, 24], [10, 25], 
			[11, 18], [12, 30], [13, 25], [14, 25], [15, 30], [16, 27], [17, 20], [18, 18], [19, 31], [20, 23]
		];
		var xLabel = [
			[1,''],[2,''],[3,'May&nbsp;15'],[4,''],[5,''],[6,'May&nbsp;19'],[7,''],[8,''],[9,'May&nbsp;22'],[10,''],
			[11,''],[12,'May&nbsp;25'],[13,''],[14,''],[15,'May&nbsp;28'],[16,''],[17,''],[18,'May&nbsp;31'],[19,''],[20,'']
		];
		$.plot($("#interactive-chart"), [{
				data: data1, 
				label: "Page Views", 
				color: COLOR_BLUE,
				lines: { show: true, fill:false, lineWidth: 2 },
				points: { show: true, radius: 3, fillColor: COLOR_WHITE },
				shadowSize: 0
			}, {
				data: data2,
				label: 'Visitors',
				color: COLOR_GREEN,
				lines: { show: true, fill:false, lineWidth: 2 },
				points: { show: true, radius: 3, fillColor: COLOR_WHITE },
				shadowSize: 0
			}], {
				xaxis: {  ticks:xLabel, tickDecimals: 0, tickColor: COLOR_DARK_TRANSPARENT_2 },
				yaxis: {  ticks: 10, tickColor: COLOR_DARK_TRANSPARENT_2, min: 0, max: 200 },
				grid: { 
				hoverable: true, 
				clickable: true,
				tickColor: COLOR_DARK_TRANSPARENT_2,
				borderWidth: 1,
				backgroundColor: 'transparent',
				borderColor: COLOR_DARK_TRANSPARENT_2
			},
			legend: {
				labelBoxBorderColor: COLOR_DARK_TRANSPARENT_2,
				margin: 10,
				noColumns: 1,
				show: true
			}
		});
		var previousPoint = null;
		$("#interactive-chart").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;
					$("#tooltip").remove();
					var y = item.datapoint[1].toFixed(2);

					var content = item.series.label + " " + y;
					showTooltip(item.pageX, item.pageY, content);
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;            
			}
			event.preventDefault();
		});
	}
};

var handleDonutChart = function () {
	"use strict";
	if ($('#donut-chart').length !== 0) {
		var donutData = [
			{ label: "Chrome",  data: 35, color: COLOR_PURPLE_DARKER},
			{ label: "Firefox",  data: 30, color: COLOR_PURPLE},
			{ label: "Safari",  data: 15, color: COLOR_PURPLE_LIGHTER},
			{ label: "Opera",  data: 10, color: COLOR_BLUE},
			{ label: "IE",  data: 5, color: COLOR_BLUE_DARKER}
		];
		$.plot('#donut-chart', donutData, {
			series: {
				pie: {
					innerRadius: 0.5,
					show: true,
					label: {
						show: true
					}
				}
			},
			legend: {
				show: true
			}
		});
	}
};

var handleDashboardSparkline = function() {
	"use strict";
	var options = {
		height: '50px',
		width: '100%',
		fillColor: 'transparent',
		lineWidth: 2,
		spotRadius: '4',
		highlightLineColor: COLOR_BLUE,
		highlightSpotColor: COLOR_BLUE,
		spotColor: false,
		minSpotColor: false,
		maxSpotColor: false
	};
	function renderDashboardSparkline() {
		var value = [50,30,45,40,50,20,35,40,50,70,90,40];
		options.type = 'line';
		options.height = '23px';
		options.lineColor = COLOR_RED;
		options.highlightLineColor = COLOR_RED;
		options.highlightSpotColor = COLOR_RED;

		var countWidth = $('#sparkline-unique-visitor').width();
		if (countWidth >= 200) {
			options.width = '200px';
		} else {
			options.width = '100%';
		}

		$('#sparkline-unique-visitor').sparkline(value, options);
		options.lineColor = COLOR_ORANGE;
		options.highlightLineColor = COLOR_ORANGE;
		options.highlightSpotColor = COLOR_ORANGE;
		$('#sparkline-bounce-rate').sparkline(value, options);
		options.lineColor = COLOR_GREEN;
		options.highlightLineColor = COLOR_GREEN;
		options.highlightSpotColor = COLOR_GREEN;
		$('#sparkline-total-page-views').sparkline(value, options);
		options.lineColor = COLOR_BLUE;
		options.highlightLineColor = COLOR_BLUE;
		options.highlightSpotColor = COLOR_BLUE;
		$('#sparkline-avg-time-on-site').sparkline(value, options);
		options.lineColor = COLOR_GREY;
		options.highlightLineColor = COLOR_GREY;
		options.highlightSpotColor = COLOR_GREY;
		$('#sparkline-new-visits').sparkline(value, options);
		options.lineColor = COLOR_BLACK;
		options.highlightLineColor = COLOR_BLACK;
		options.highlightSpotColor = COLOR_GREY;
		$('#sparkline-return-visitors').sparkline(value, options);
	}
    
	renderDashboardSparkline();

	$(window).on('resize', function() {
		$('#sparkline-unique-visitor').empty();
		$('#sparkline-bounce-rate').empty();
		$('#sparkline-total-page-views').empty();
		$('#sparkline-avg-time-on-site').empty();
		$('#sparkline-new-visits').empty();
		$('#sparkline-return-visitors').empty();
		renderDashboardSparkline();
	});
};

var handleDashboardDatepicker = function() {
	"use strict";
	$('#datepicker-inline').datepicker({
		todayHighlight: true
	});
};

var handleDashboardTodolist = function() {
	"use strict";
	$('[data-click=todolist]').click(function() {
		var targetList = $(this).closest('li');
		if ($(targetList).hasClass('active')) {
			$(targetList).removeClass('active');
		} else {
			$(targetList).addClass('active');
		}
	});
};

var handleDashboardGritterNotification = function() {
	$(window).on('load', function() {
		setTimeout(function() {
			$.gritter.add({
				title: 'Welcome back, Admin!',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus lacus ut lectus rutrum placerat.',
				image: '../assets/img/user/user-2.jpg',
				sticky: true,
				time: '',
				class_name: 'my-sticky-class'
			});
		}, 1000);
	});
};

var Dashboard = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDashboardGritterNotification();
			handleInteractiveChart();
			handleDashboardSparkline();
			handleDonutChart();
			handleDashboardTodolist();
			handleVectorMap();
			handleDashboardDatepicker();
		}
	};
}();

$(document).ready(function() {
	Dashboard.init();
});