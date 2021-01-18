/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleDataTableKeyTable = function() {
	"use strict";
    
	if ($('#data-table-keytable').length !== 0) {
		$('#data-table-keytable').DataTable({
			autoWidth: true,
			keys: true,
			responsive: true
		});
	}
};

var TableManageKeyTable = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDataTableKeyTable();
		}
	};
}();

$(document).ready(function() {
	TableManageKeyTable.init();
});