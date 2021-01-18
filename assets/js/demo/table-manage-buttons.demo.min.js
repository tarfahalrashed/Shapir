/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleDataTableButtons=function(){"use strict";0!==$("#data-table-buttons").length&&$("#data-table-buttons").DataTable({dom:"Bfrtip",buttons:[{extend:"copy",className:"btn-sm"},{extend:"csv",className:"btn-sm"},{extend:"excel",className:"btn-sm"},{extend:"pdf",className:"btn-sm"},{extend:"print",className:"btn-sm"}],responsive:!0})},TableManageButtons=function(){"use strict";return{init:function(){handleDataTableButtons()}}}();