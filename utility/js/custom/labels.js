let url = window.location.href.split("/");
let panel_id = url[url.length - 1];

$(document).ready(function() {
	$.ajax({
		url: domain + 'ajax/panels_list/panels_list',
		success: function (data) {
			let j_data = JSON.parse(data);
			appendPanels(j_data);
		}
	});

	$("#panel_select").change(function() {
		let panel_id = $(this).val();
		if($('#labels_table').length){
			$("#label-select").empty();
			$.ajax({
				type: 'post',
				url: domain + "ajax/labels_list/labels_list",
				data: {"id":panel_id},
				success: function (d) {
					let label_data = JSON.parse(d);
					$("#labels_table").empty();
					let table = '<thead>\n' +
						'\t\t\t\t<tr>\n' +
						'\t\t\t\t<th>Ime Labela</th>\n' +
						'\t\t\t\t<th>Opcije</th>\n' +
						'\t\t\t\t</tr>\n' +
						'\t\t\t\t</thead><tbody>';
					for(let i = 0; i < label_data.length; i++) {
						table += '<tr>';
						table += '<td>' + label_data[i].label_title + '</td>';
						table += '<td>' + getOptionButtons(label_data[i].id) + '</td>';
						table += '</tr>';
					}
					table += '\t\t<tbody>';

					$("#labels_table").append(table);
					$('#add_label').removeAttr('hidden');
					$('#add_label').attr('name', panel_id);
					$('#add_label').attr('href', "labels_list/add_label/" + panel_id);
				},
				complete: function () {
					$('#labels_table').DataTable();
				}
			});
		}

	});
});

$(document).on('click', '.delete_label', function () {
	var label_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/labels_list/delete_label/" + label_id,
		type: 'post',
		success: function (result) {
			var submission = JSON.parse(result);
			try {
				if(submission == "success"){
					Swal.fire({
						icon: 'success',
						title: 'Label je uspješno izbrisan!',
						showConfirmButton: false,
						timer: 2000
					});
					setTimeout(function () {
						window.location = domain + 'labels_list';
					}, 2000);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Nešto nije u redu. Label nije izbrisan.',
						showConfirmButton: false,
						timer: 2000
					})
				}

			}catch(e) {
				//TODO: Some logger solution

			}
		}
	});
});

$('#add-new-label-form').submit(function(e){
	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();
	$.ajax({
		type: "POST",
		url: domain + 'ajax/labels/create_label/' + panel_id,
		data: form.serialize(),
		success: function (data) {
			var submission = JSON.parse(data);

			if(submission == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Novi label je uspješno napravljen!',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain + 'labels_list';
				}, 2000);
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Nešto nije u redu. Label nije napravljen.',
					showConfirmButton: false,
					timer: 2000
				})
			}
		}
	});
});

// data-toggle="modal" data-target="#questions_modal"
function getOptionButtons(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<a href="questions_list/'+ id +'" name="'+id+'" type="button" class="btn btn-success see_questions mr-2">Vidi pitanja</a>\n' +
		'\t\t\t\t\t<a href="labels_list/edit_label/'+ id +'" name="'+id+'" type="button" class="btn btn-info edit_label mr-2">Uredi</a>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete_label">Obriši</button>\n' +
		'\t\t\t\t</div>';
}
function appendPanels(data){
	let options = '';
	data.forEach(panel => {
		options += '<option name=' + panel.id + ' value='+ panel.id +'>'+ panel.panel_name +'</option>'
	});
	$('#panel_select').append(options);
}
