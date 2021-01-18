/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleEmailToInput=function(){$("#email-to").tagit({availableTags:["c++","java","php","javascript","ruby","python","c"]})},handleEmailContent=function(){$("#wysihtml5").wysihtml5()},handleAddCc=function(){$(document).on("click",'[data-click="add-cc"]',function(a){a.preventDefault();var t=$(this).attr("data-name"),l="email-cc-"+t,n='\t<div class="email-to">\t\t<label class="control-label">'+t+':</label>\t\t<ul id="'+l+'" class="primary line-mode"></ul>\t</div>';$('[data-id="extra-cc"]').append(n),$("#"+l).tagit(),$(this).remove()})},EmailCompose=function(){"use strict";return{init:function(){handleEmailToInput(),handleEmailContent(),handleAddCc()}}}();