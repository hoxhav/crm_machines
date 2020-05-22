let domain = "/" + window.location.pathname.split("/")[1] + "/";
let n_loader = 1;
function loaderOverlay() {
	if (n_loader == -1)
		$('.loader-wrapper').show();
	else
		$('.loader-wrapper').hide();

}

$(document).ready(function () {
	setInterval(loaderOverlay, 50);
});

$(document).on('click', '.addRecord', function () {
	user_id = $(this).attr('name');
	window.location = domain + 'survey/add_record/' + user_id;

});
