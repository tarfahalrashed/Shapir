/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var getRandomValue=function(){for(var a=[],n=0;n<=19;n++)a.push(Math.floor(10*Math.random()+1));return a},handleRenderKnobDonutChart=function(){$(".knob").knob()},handleRenderSparkline=function(){var a={height:"50px",width:"100%",fillColor:"transparent",type:"bar",barWidth:8,barColor:COLOR_GREEN},n=getRandomValue();$("#sidebar-sparkline-1").sparkline(n,a),n=getRandomValue(),a.barColor=COLOR_BLUE,$("#sidebar-sparkline-2").sparkline(n,a),n=getRandomValue(),a.barColor=COLOR_PURPLE,$("#sidebar-sparkline-3").sparkline(n,a),n=getRandomValue(),a.barColor=COLOR_RED,$("#sidebar-sparkline-4").sparkline(n,a)},PageWithTwoSidebar=function(){"use strict";return{init:function(){handleRenderKnobDonutChart(),handleRenderSparkline()}}}();