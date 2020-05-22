let url = window.location.href.split('/');
let panel_id = url[url.length-1];

//document ready
$(document).ready(function() {
	$.ajax({
		url: domain + 'ajax/panels_list/edit_panel/' + panel_id,
		success: function (data) {
			j_data = null;
			try {
				j_data = JSON.parse(data);
				$("#old-edit-panel-name").text(j_data[0].panel_name);
				$("#edit_panel_id").attr('value', panel_id);
			} catch (e) {
				//TODO: Some logger solution
			}

		}
	});
});//end of document.ready

//form submit
$('#edit-panel-form').submit(function(e){

	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();

	$.ajax({
		type: "POST",
		url: domain + 'ajax/panels_list/update_panel',
		data: form.serialize(),
		success: function (data) {
			var submission = JSON.parse(data);
			if(submission == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Panel je uspješno promijenjen.',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain + 'panels_list';
				}, 2000);
			} else {
                Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Nešto nije u redu. Panel nije promijenjen.',
					showConfirmButton: false,
					timer: 2000
				})
            }
		}
	});


});//end of submit form