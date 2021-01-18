var handleFormSummernote = function () {
	"use strict";
	$('#comment').summernote({
		placeholder: 'Leave a comment here...',
		height: 300
	});
};

var ForumDetailsPage = function () {
	"use strict";
	return {
		//main function
		init: function () {
			handleFormSummernote();
		}
	};
}();

$(document).ready(function() {
	ForumDetailsPage.init();
});