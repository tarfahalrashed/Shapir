/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleDataTableScroller=function(){"use strict";0!==$("#data-table-scroller").length&&$("#data-table-scroller").DataTable({ajax:"../assets/plugins/DataTables/json/scroller-demo.json",deferRender:!0,scrollY:300,scrollCollapse:!0,scroller:!0,responsive:!0})},TableManageScroller=function(){"use strict";return{init:function(){handleDataTableScroller()}}}();