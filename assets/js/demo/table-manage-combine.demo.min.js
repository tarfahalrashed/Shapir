/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleDataTableCombinationSetting=function(){"use strict";if(0!==$("#data-table-combine").length){var e={dom:"lBfrtip",buttons:[{extend:"copy",className:"btn-sm"},{extend:"csv",className:"btn-sm"},{extend:"excel",className:"btn-sm"},{extend:"pdf",className:"btn-sm"},{extend:"print",className:"btn-sm"}],responsive:!0,autoFill:!0,colReorder:!0,keys:!0,rowReorder:!0,select:!0};$(window).width()<=767&&(e.rowReorder=!1,e.colReorder=!1,e.autoFill=!1),$("#data-table-combine").DataTable(e)}},TableManageCombine=function(){"use strict";return{init:function(){handleDataTableCombinationSetting()}}}();