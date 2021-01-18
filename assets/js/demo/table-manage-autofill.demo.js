/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/

var handleDataTableAutofill = function() {
	"use strict";
    
	if ($('#data-table-autofill').length !== 0) {
		$('#data-table-autofill').DataTable({
			autoFill: true,
			responsive: true
		});
	}
};

var TableManageAutofill = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleDataTableAutofill();
		}
	};
}();

$(document).ready(function() {
	TableManageAutofill.init();
});