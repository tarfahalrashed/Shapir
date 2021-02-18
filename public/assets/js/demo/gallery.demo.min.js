/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/function calculateDivider(){var t=4;return $(this).width()<=480?t=1:$(this).width()<=767?t=2:$(this).width()<=980&&(t=3),t}var handleIsotopesGallery=function(){"use strict";var t=$("#gallery"),i=calculateDivider(),a=$(t).width()/i;$(t).isotope({resizable:!0,masonry:{columnWidth:a}}),$(window).smartresize(function(){var i=calculateDivider(),a=$(t).width()/i;$(t).isotope({masonry:{columnWidth:a}})}),$("#options .gallery-option-set").find("a").click(function(){var i=$(this);if(i.hasClass("active"))return!1;var a=i.parents(".gallery-option-set");a.find(".active").removeClass("active"),i.addClass("active");var e={},r=a.attr("data-option-key"),n=i.attr("data-option-value");return n="false"!==n&&n,e[r]=n,$(t).isotope(e),!1})},Gallery=function(){"use strict";return{init:function(){handleIsotopesGallery()}}}();