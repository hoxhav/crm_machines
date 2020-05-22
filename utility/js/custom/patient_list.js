function getOptionButtons(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="mr-2 btn btn-success addRecord">Novi zapis</button>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="mr-2 btn btn-warning patient_info">Informacije o pacijentu</button>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="mr-2 btn btn-info records">Prijašnji zapisi</button>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete">Obriši pacijenta</button>\n' +
		'\t\t\t\t</div>';
}

$(document).ready(function() {
	$.ajax({
		url: domain + 'ajax/patient_list/patient_list',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			j_data = null;
			try {
				j_data = JSON.parse(data);
				let table = '<thead>\n' +
					'\t\t\t\t<tr>\n' +
					'\t\t\t\t<th>Ime</th>\n' +
					'\t\t\t\t<th>Datum kreiranja</th>\n' +
					'\t\t\t\t<th>Opcije</th>\n' +
					'\t\t\t\t</tr>\n' +
					'\t\t\t\t</thead><tbody>';
				for(let i = 0; i < j_data.length; i++) {
					table += '<tr>';

					table += '<td>' + j_data[i].firstName + ' ' + j_data[i].lastName +  '</td>';
					table += '<td>' + j_data[i].date_patient_created + '</td>';
					table += '<td>' + getOptionButtons(j_data[i].id) + '</td>';
					table += '</tr>';
				}
				table += '\t\t<tbody>';

				$("#patients").append(table);
			} catch (e) {
				//TODO: Some logger solution
			}

		},
		complete: function () {
			if($('#patients').length != 0){
				$('#patients').DataTable();
			}
			n_loader = 1;
		}
	});

});

$(document).on('click', '.patient_info', function () {
	var id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/patient_list/patient_info_by_id/" + id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var specific_data = null;
			try {
				specific_data = JSON.parse(d);
				//no results
				if(specific_data.length == 0) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Nema zapisa za traženog pacijenta.',
						showConfirmButton: false,
						timer: 2000
					})
				} else {
					$('#patient-info-table').empty();

					let table = '<thead>\n' +
						'\t\t\t\t<tr>\n' +
						'\t\t\t\t<th>Ime</th>\n' +
						'\t\t\t\t<th>Prezime</th>\n' +
						'\t\t\t\t<th>OIB</th>\n' +
						'\t\t\t\t<th>MBO</th>\n' +
						'\t\t\t\t<th>Dob</th>\n' +
						'\t\t\t\t<th>Spol</th>\n' +
						'\t\t\t\t<th>Email</th>\n' +
						'\t\t\t\t<th>Broj telefona</th>\n' +
						'\t\t\t\t<th>Grad</th>\n' +
						'\t\t\t\t<th>Adresa</th>\n' +
						'\t\t\t\t<th>ZIP</th>\n' +
						'\t\t\t\t<th>Datum kreiranja</th>\n' +
						'\t\t\t\t</tr>\n' +
						'\t\t\t\t</thead><tbody>';
					for(let i = 0; i < specific_data.length; i++) {
						table += '<tr>';

						table += '<td>' + specific_data[i].firstName + '</td>';
						table += '<td>' + specific_data[i].lastName + '</td>';
						table += '<td>' + specific_data[i].oib + '</td>';
						table += '<td>' + specific_data[i].mbo + '</td>';
						table += '<td>' + specific_data[i].age + '</td>';
						table += '<td>' + specific_data[i].gender + '</td>';
						table += '<td>' + specific_data[i].email + '</td>';
						table += '<td>' + specific_data[i].phoneNumber + '</td>';
						table += '<td>' + specific_data[i].city + '</td>';
						table += '<td>' + specific_data[i].address + '</td>';
						table += '<td>' + specific_data[i].zip + '</td>';
						table += '<td>' + specific_data[i].date_patient_created + '</td>';

						table += '</tr>';
					}
					table += '\t\t<tbody>';


					$('#patient-info-table').append(table);
					$('#patient-info-table').DataTable({
						"paging":   false,
						"info": false,
						"searching": false
					});

					$("#info-patient-modal").modal();
				}
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
		}
	});

});



$(document).on('click', '.delete', function () {
	var patient_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/patient_list/delete_patient/" + patient_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var deleted_patient = null;
			try {
				deleted_patient = JSON.parse(d);
				if(deleted_patient == "success") {
					Swal.fire({
						icon: 'success',
						title: 'Ovaj je pacijent izbrisan.',
						showConfirmButton: false,
						timer: 3000
					});
				}
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
			window.location = domain + 'patient_list';
		}
	});
});

$(document).on('click', '.delete_record', function () {
	var record_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/patient_list/delete_record/" + record_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var deleted_record = null;
			try {
				deleted_record = JSON.parse(d);
				if(deleted_record == "success") {
					Swal.fire({
						icon: 'success',
						title: 'Ovaj je zapis izbrisan.',
						showConfirmButton: false,
						timer: 3000
					});
				}
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
			window.location = domain + 'patient_list';
		}
	});
});

$(document).on('click', '.view_record', function () {
	var record_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/patient_list/view_record/" + record_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var patient_record = null;
			try {
				patient_record = JSON.parse(d);
				//no results
				if(patient_record.length == 0) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Nema zapisa za traženog pacijenta',
						showConfirmButton: false,
						timer: 2000
					})
				} else {
					$('#patients').empty();

					let record_table = getViewRecordById(patient_record);

					$('#patients').append(record_table);

				}
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
		}
	});
});



$(document).on('click', '.records', function () {
	user_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/patient_list/patient_records/" + user_id,
		type: 'post',
		data: JSON.stringify({"id":user_id}),
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var patient_rec = null;
			try {
				patient_rec = JSON.parse(d);
				//no results
				if(patient_rec.length == 0) {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Nema zapisa za ovog pacijenta.',
						showConfirmButton: false,
						timer: 2000
					})
				} else {
					Swal.fire({
						icon: 'success',
						title: 'Pacijent ima ' + patient_rec.length + ' zapisa.',
						showConfirmButton: false,
						timer: 3000
					});
					$('#patients').empty();

					let record_table = getRecordsForUser(patient_rec);

					$('#patients').append(record_table);


				}
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
		}
	});
});


$('#add-new-patient-form').submit(function(e){

	e.preventDefault();
	var form = $(this);

	var form_data = form.serialize();
	$.ajax({
		type: "POST",
		url: domain + 'ajax/patient_list/create_patient',
		data: form.serialize(),
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (data) {
			var submission = JSON.parse(data);

			if(submission == 'success') {
				Swal.fire({
					icon: 'success',
					title: 'Pacijent je uspješno napravljen.',
					showConfirmButton: false,
					timer: 3000
				});
				setTimeout(function () {
					window.location = domain + 'patient_list';
				}, 2000);
			}
		},
		complete: function () {
			n_loader = 1;
		}
	});


});


function getOptionButtonsForRecords(id) {
	return '<div class="btn-group" role="group" aria-label="options">\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-primary view_record">Vidi više</button>\n' +
		'\t\t\t\t\t<button name="'+id+'" type="button" class="btn btn-danger delete_record">Izbriši</button>\n' +
		'\t\t\t\t</div>';
}


function getViewRecordById(j_data) {
	let table = '<thead>\n' +
		'\t\t\t\t<tr>\n' +
		'\t\t\t\t<th>#</th>\n' +
		'\t\t\t\t<th>Ime panela</th>\n' +
		'\t\t\t\t<th>Pitanje</th>\n' +
		'\t\t\t\t<th>Datum</th>\n' +
		'\t\t\t\t<th>Odgovor</th>\n' +
		'\t\t\t\t</tr>\n' +
		'\t\t\t\t</thead><tbody>';
	for(let i = 0; i < j_data.length; i++) {
		table += '<tr>';
		table += '<td>' + (i+1) + '</td>';
		table += '<td>' + j_data[i].panel_name + '</td>';
		table += '<td>' + j_data[i].question_text + '</td>';
		table += '<td>' + j_data[i].date_submitted + '</td>';
		table += '<td>' + j_data[i].answer_text + '</td>';
		table += '</tr>';
	}
	table += '\t\t<tbody>';

	return table;
}

function getRecordsForUser(j_data) {
	let table = '<thead>\n' +
		'\t\t\t\t<tr>\n' +
		'\t\t\t\t<th>Ime pacijenta</th>\n' +
		'\t\t\t\t<th>Datum pregleda</th>\n' +
		'\t\t\t\t<th>Ime ljekara</th>\n' +
		'\t\t\t\t<th>Opcije</th>\n' +
		'\t\t\t\t</tr>\n' +
		'\t\t\t\t</thead><tbody>';
	for(let i = 0; i < j_data.length; i++) {
		table += '<tr>';

		table += '<td>' + j_data[i].patient_firstName + ' ' + j_data[i].patient_lastName +  '</td>';
		table += '<td>' + j_data[i].submission_date + '</td>';
		table += '<td>' + j_data[i].pharmacist_name + '</td>';
		table += '<td>' + getOptionButtonsForRecords(j_data[i].patient_record_history_id) + '</td>';
		table += '</tr>';
	}
	table += '\t\t<tbody>';

	return table;
}
