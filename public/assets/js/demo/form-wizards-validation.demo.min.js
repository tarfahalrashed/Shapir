/*
Template Name: Color Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 4
Version: 4.6.0
Author: Sean Ngu
Website: http://www.seantheme.com/color-admin/admin/
*/var handleBootstrapWizardsValidation=function(){"use strict";$("#wizard").smartWizard({selected:0,theme:"default",transitionEffect:"",transitionSpeed:0,useURLhash:!1,showStepURLhash:!1,toolbarSettings:{toolbarPosition:"bottom"}}),$("#wizard").on("leaveStep",function(t,a,i,r){return $('form[name="form-wizard"]').parsley().validate("step-"+(i+1))}),$("#wizard").keypress(function(t){13==t.which&&$("#wizard").smartWizard("next")})},FormWizardValidation=function(){"use strict";return{init:function(){handleBootstrapWizardsValidation()}}}();