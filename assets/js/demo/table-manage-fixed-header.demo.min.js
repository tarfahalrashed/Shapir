/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleDataTableFixedHeader=function(){"use strict";0!==$("#data-table-fixed-header").length&&$("#data-table-fixed-header").DataTable({lengthMenu:[20,40,60],fixedHeader:{header:!0,headerOffset:$("#header").height()},responsive:!0})},TableManageFixedHeader=function(){"use strict";return{init:function(){handleDataTableFixedHeader()}}}();