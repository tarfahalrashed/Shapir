/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleGoogleMapSetting=function(){"use strict";var e={zoom:4,center:new google.maps.LatLng(37.09024,-95.712891),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0};new google.maps.Map(document.getElementById("google-map"),e)},handleSuperboxSetting=function(){$('[data-toggle="tab"]').on("shown.bs.tab",function(e){"#profile-photos"==$(e.target).attr("href")&&($("#profile-photos").attr("data-init",!0),$(".superbox").SuperBox({background:"#242a30",border:"rgba(0,0,0,0.1)",xColor:"#a8acb1",xShadow:"embed"}))})},Profile=function(){"use strict";return{init:function(){handleGoogleMapSetting(),handleSuperboxSetting()}}}();