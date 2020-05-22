let url = window.location.href.split("/");
let label_id = url[url.length - 1];

//document ready
$(document).ready(function () {
	$.ajax({
		url: domain + 'ajax/panels_list/panels_list',
		success: function (data) {
            let j_data = JSON.parse(data);
            appendPanels(j_data);
			$.ajax({
				url: domain + "ajax/labels_list/edit_label/" + label_id,
				success: function (data) {
					j_data = null;
					try {
						label_data = JSON.parse(data);
						$("#old-edit-label-name").text(label_data[0].label_title);
						$("#edit_label_id").attr("value", label_id);
                        $('#panel_select').find('option[value='+label_data[0].surv_survey_panels_id+']').attr('selected', true);
					} catch (e) {
						//TODO: Some logger solution
					}
				},
			});
		},
	});
}); //end of document.ready

$("#edit-label-form").submit(function (e) {
	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();

	$.ajax({
		type: "POST",
		url: domain + "ajax/labels_list/update_label",
		data: form.serialize(),
		success: function (data) {
			var submission = JSON.parse(data);
			if (submission == "success") {
				Swal.fire({
					icon: "success",
					title: "Label je uspješno promijenjen!",
					showConfirmButton: false,
					timer: 3000,
				});
				setTimeout(function () {
					window.location = domain + "labels_list";
				}, 2000);
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Nešto nije u redu. Label nije promijenjen.",
					showConfirmButton: false,
					timer: 2000,
				});
			}
		},
	});
}); //end of submit form

function appendPanels(data){
    let options = '';
    data.forEach(panel => {
        options += '<option name=' + panel.id + ' value='+ panel.id +'>'+ panel.panel_name +'</option>'
    });
	$('#panel_select').append(options);
}