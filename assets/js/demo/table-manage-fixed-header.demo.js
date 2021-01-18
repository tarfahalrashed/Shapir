/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleDataTableFixedHeader = function() {
	"use strict";
    
	if ($('#data-table-fixed-header').length !== 0) {
		$('#data-table-fixed-header').DataTable({
			lengthMenu: [20, 40, 60],
			fixedHeader: {
				header: true,
				headerOffset: $('#header').height()
			},
			responsive: true
		});
	}
};

var TableManageFixedHeader = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDataTableFixedHeader();
		}
	};
}();

$(document).ready(function() {
	TableManageFixedHeader.init();
});