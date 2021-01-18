/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleGoogleMapSetting=function(){"use strict";var e=[{featureType:"all",elementType:"all",stylers:[{invert_lightness:!0},{saturation:10},{lightness:10},{gamma:.8},{hue:"#293036"}]},{featureType:"water",stylers:[{visibility:"on"},{color:"#293036"}]}],t={zoom:6,center:new google.maps.LatLng(-33.397,145.644),mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0};new google.maps.Map(document.getElementById("google-map"),t).setOptions({styles:e})},Timeline=function(){"use strict";return{init:function(){handleGoogleMapSetting()}}}();