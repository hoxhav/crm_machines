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

$(document).on('click', '#logout', function () {
	$.ajax({
		url: domain + 'ajax/dashboard/logout',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
				if(data == 0) {
					n_loader = 1;
					window.location = domain;
				}
		}
	});

});

function getMachineTableTemplate(data) {
	return '\t<thead>\n' +
		'\t\t\t\t\t<tr>\n' +
		'\t\t\t\t\t\t<th scope="col">Date Entered</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Machine Code</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Serial Number</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Price</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Description</th>\n' +
		'\t\t\t\t\t</tr>\n' +
		'\t\t\t\t\t</thead>\n' +
		'\t\t\t\t\t<tbody>\n' +
		data+
		'\t\t\t\t\t</tbody>';
}
