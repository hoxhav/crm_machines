function getOptionButtons(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<a href="panels_list/edit_panel/' + id + '" name="'+id+'" type="button" class="btn btn-primary mr-2 edit_panel">Uredi panel</a>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete_panel">Obriši</button>\n' +
		'\t\t\t\t</div>';
}

$(document).ready(function() {
	$.ajax({
		url: domain + 'ajax/panels_list/panels_list',
		success: function (data) {
			j_data = null;
			try {
				j_data = JSON.parse(data);
				let table = '<thead>\n' +
					'\t\t\t\t<tr>\n' +
					'\t\t\t\t<th>Ime panela</th>\n' +
					'\t\t\t\t<th>Opcije</th>\n' +
					'\t\t\t\t</tr>\n' +
					'\t\t\t\t</thead><tbody>';
				for(let i = 0; i < j_data.length; i++) {
					table += '<tr>';
					table += '<td>' + j_data[i].panel_name + '</td>';
					table += '<td>' + getOptionButtons(j_data[i].id) + '</td>';
					table += '</tr>';
				}
				table += '\t\t<tbody>';

				$("#panels").append(table);
				$('#add_panel').removeAttr('hidden');
			} catch (e) {
				//TODO: Some logger solution
			}

		},
		complete: function () {
			$('#panels').DataTable();
		}
	});

});

$(document).on('click', '.delete_panel', function () {
	var panel_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/panels_list/delete_panel/" + panel_id,
		type: 'post',
		success: function (result) {
			var submission = JSON.parse(result);
			try {
				if(submission == "success"){
					Swal.fire({
						icon: 'success',
						title: 'Panel je uspješno izbrisan!',
						showConfirmButton: false,
						timer: 2000
					});
					setTimeout(function () {
						window.location = domain + 'panels_list';
					}, 2000);
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Nešto nije u redu. Panel nije obrisan.',
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


$('#add-new-panel-form').submit(function(e){

	e.preventDefault();
	var form = $(this);
	var form_data = form.serialize();
	$.ajax({
		type: "POST",
		url: domain + 'ajax/panels/create_panel',
		data: form.serialize(),
		success: function (data) {
			var submission = JSON.parse(data);

			if(submission == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Novi panel je uspješno napravljen.',
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
					text: 'Nešto nije u redu. Panel nije napravljen.',
					showConfirmButton: false,
					timer: 2000
				})
			}
		}
	});


});
