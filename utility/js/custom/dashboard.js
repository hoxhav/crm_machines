$(document).ready(function() {
	$.ajax({
		url: domain + "ajax/dashboard/getAvailableMachines",
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var data = JSON.parse(d);
			var result = '';
			var machines_data = data.machine_data;
			var available_machines = data.avail_machines[0].avail_machines;
			var unavailable_machines = data.unavail_machines[0].unavail_machines;
			var sales = data.total_sale[0].total_sales;

			$("#avail-machine-num").text(available_machines);
			$("#num-of-sales-num").text(sales);
			$("#unavail-machines-num").text(unavailable_machines);

			for (let i = 0; i < machines_data.length; i++) {
				result += getItemTemplate( machines_data[i].quantity_avail,machines_data[i].picture_path,  machines_data[i].id);
			}

			$("#machine-grid").append(result);
		},
		complete: function () {
			n_loader = 1;
		},
	});
});

function getItemTemplate(quantity_avail,picture_path,id) {
	return '\t<div id="'+id+'" class="col-lg-3 mt-4">\n' +
		'\t\t<div class="card text-center text-white machine-items">\n' +
		'\t\t\t<div class="card-header">\n' +
		'\t\t\t\t<h5 class="card-title">Available quantity - ' + quantity_avail+'</h5>\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-info info_machine">Info</button>\n' +
		'\t\t\t</div>\n' +
		'\t\t\t<div class="card-body pb-4">\n' +
		'\t\t\t\t<div class="view overlay">\n' +
		'\t\t\t\t\t<img src="./' + picture_path+'" class="img-fluid " alt="smaple image">\n' +
		'\t\t\t\t\t<div class="mask flex-center rgba-teal-strong">\n' +
		'\t\t\t\t\t\t<div class="row">\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-primary sell_machine">Sell</button>\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-warning edit_machine">Edit</button>\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-danger deactivate_machine">Del</button>\n' +
		'\t\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t</div>\n' +
		'\t\t\t\t</div>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n' +
		'\t</div>';
}

// edit machine ---
$(document).on('click', '.edit_machine', function () {
	var machine_id = $(this).attr('name');
	$("#edit-machine-form").trigger("reset");
	$("#edit-machine-id-span").empty();
	$.ajax({
		url: domain + "ajax/dashboard/editMachine/" + machine_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var edit_machine = null;
			try {
				edit_machine = JSON.parse(d);
				appendEditMachineData(edit_machine);

			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
			$("#edit-machine-id-span").append(machine_id);
			$("#edit-machine-modal").modal();
		}
	});

});

$("#edit-machine-form").submit(function (e) {
	e.preventDefault();
	var form = $('#edit-machine-form')[0];
	var formData = new FormData(form);
	formData.append("id", $("#edit-machine-id-span").text());
	var file = $('#picture_edit_machine')[0].files[0];
	$flag = true;
	if (file !== undefined) {
		var maxSizeMb = 2;
		var totalSize = file.size;
		var totalSizeMb = totalSize / Math.pow(1024, 2);
		if (totalSizeMb > maxSizeMb) {
			var errorMsg = 'File too large. Maximum file size is ' + maxSizeMb + 'MB. Selected file is ' + totalSizeMb.toFixed(2) + 'MB';
			$flag = false;
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg
			})
		}
	}

	if ($flag) {
		$.ajax({
			type: "POST",
			url: domain + 'ajax/dashboard/editMachineData',
			data: formData,
			contentType: false,
			processData: false,
			beforeSend: function () {
				n_loader = -1;
			},
			success: function (data) {
				var j_data = JSON.parse(data);
				n_loader = 1;
				if(j_data[0].picture_path.includes("utility")) {
					var last_added_item = getItemTemplate( j_data[0].quantity_avail,j_data[0].picture_path,  j_data[0].id);
					var machine_id = $("#edit-machine-id-span").text();
					$('#'+machine_id).remove();
					$("#machine-grid").append(last_added_item);
					Swal.fire({
						icon: 'success',
						title: 'Your machine has been edited.',
						showConfirmButton: false,
						timer: 3000
					});
					$("#edit-machine-modal").modal("hide");
				} else {
					Swal.fire({
						icon: 'error',
						title: j_data[0],
						showConfirmButton: false,
						timer: 3000
					});
				}


			},
			complete: function() {
				n_loader = 1;
			}
		})
	}
});


function appendEditMachineData(data) {
	$("#machine_code_edit_machine").val(data[0].car_code);
	$("#serial_number_edit_machine").val(data[0].serial_number);
	$("#price_edit_machine").val(data[0].price);
	$("#quantity_edit_machine").val(data[0].quantity_avail);
	$("#description_edit_machine").val(data[0].description);
}
// end of edit machine ---


// deactivate machine section --

$(document).on('click', '.deactivate_machine', function () {
	var machine_id = $(this).attr('name');
	$.ajax({
		url: domain + "ajax/dashboard/deactivateMachine/" + machine_id,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var deactivated_machine = null;
			try {
				deactivated_machine = JSON.parse(d);
				if(deactivated_machine == "success") {
					Swal.fire({
						icon: 'success',
						title: 'This machine has been deactivated.',
						showConfirmButton: false,
						timer: 3000
					});
				}

				$('#'+machine_id).remove();
			}catch(e) {
				//TODO: Some logger solution

			}
		},
		complete: function () {
			n_loader = 1;
		}
	});

});


// end of deactivate machine section --


// section modify CLIENT --

$(document).on('click', '.delete-client', function () {
	let client_id_delete = $(this).attr('name');

	$.ajax({
		url: domain + "ajax/dashboard/deleteClient/" + client_id_delete,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var deleted_client = null;
			try {
				deleted_client = JSON.parse(d);
				if(deleted_client == "success") {
					Swal.fire({
						icon: 'success',
						title: 'This client has been deleted.',
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
			$('#modify-client').trigger('click');
		}
	});

});


// sell machine section


$(document).on('click', '.sell_machine', function () {
	let machine_id_sell = $(this).attr('name');
	$("#serial-num-sell-machine").text('');
	$("#id-sell-machine-span").text('');
	$.ajax({
		url: domain + "ajax/dashboard/sellMachineAppendData/" + machine_id_sell,
		type: 'post',
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var sell_client_data = null;
			try {
				sell_client_data = JSON.parse(d);
				$("#serial-num-sell-machine").append(sell_client_data.serial_number[0].serial_number);
				$("#id-sell-machine-span").append(machine_id_sell);

				let client = sell_client_data.clients;
				let res = '';
				for(let i = 0; i < client.length; i++) {
					res += '<option value="'+client[i].id+'">'+client[i].company_name+'</option>';
				}
				$("#client_sell_machine").append(res);
			}catch(e) {
			}
		},
		complete: function () {
			n_loader = 1;
			$("#sell-machine-modal").modal();
		}
	});



});

$("#sell-machine-form").submit(function (e) {
	e.preventDefault();
	$.ajax({
		url: domain + "ajax/dashboard/sellMachine" ,
		type: 'post',
		data: {"machine_id":$("#id-sell-machine-span").text(), "client_id": $('#client_sell_machine option:selected').val()},
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var sell_machine = null;
			try {
				sell_machine = JSON.parse(d);
				if(sell_machine == "success") {
					Swal.fire({
						icon: 'success',
						title: 'This machine has been sold.',
						showConfirmButton: false,
						timer: 3000
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong.',
						showConfirmButton: false,
						timer: 3000
					});
				}
			}catch(e) {
			}
		},
		complete: function () {
			n_loader = 1;
			window.location = domain;
		}
	});

});

//end sell machine section

// info machine section //

$(document).on('click', '.info_machine', function () {
	let machine_id = $(this).attr('name');

	$.ajax({
		url: domain + "ajax/dashboard/getMachineInfo/" + machine_id,
		beforeSend: function () {
			n_loader = -1;
			$("#info-machine-table").empty();
		},
		success: function (d) {
			var machine_retrieved = JSON.parse(d);
			var resMachine = '';
			for(let i = 0; i < machine_retrieved.length; i++) {
				resMachine += '\t\t\t\t\t<tr>\n' +
					'\t\t\t\t\t\t<td>'+machine_retrieved[i].date_entered_system+'</td>\n' +
					'\t\t\t\t\t\t<td>'+machine_retrieved[i].car_code+'</td>\n' +
					'\t\t\t\t\t\t<td>'+machine_retrieved[i].serial_number+'</td>\n' +
					'\t\t\t\t\t\t<td>'+machine_retrieved[i].price+'</td>\n' +
					'\t\t\t\t\t\t<td>'+machine_retrieved[i].description+'</td>\n' +
					'\t\t\t\t\t</tr>\n';
			}

			$("#info-machine-table").append(getMachineTableTemplate(resMachine));
		},
		complete: function () {
			n_loader = 1;
			$("#info-machine-modal").modal();
		}
	});


});


// end info machine section //


$(document).on('click', '.edit-client', function () {
	let client_id_edit = $(this).attr('name');
	$("#modify-clients-modal").modal("hide");
	$("#company-id-for-edit").empty();
	$("#new_company_name_add_client").val('');
	$("#company-id-for-edit").append(client_id_edit);
	$("#edit-client-modal").modal();

});


$("#edit-client-form").submit(function (e) {
	e.preventDefault();
	$.ajax({
		url: domain + "ajax/dashboard/editClient" ,
		type: 'post',
		data: {"client_id":$("#company-id-for-edit").text(), "new_company_name": $("#new_company_name_add_client").val()},
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var edit_client = null;
			try {
				edit_client = JSON.parse(d);
				if(edit_client == "success") {
					Swal.fire({
						icon: 'success',
						title: 'This client has been edited.',
						showConfirmButton: false,
						timer: 3000
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong.',
						showConfirmButton: false,
						timer: 3000
					});
				}
			}catch(e) {
			}
		},
		complete: function () {
			n_loader = 1;
			$('#modify-client').trigger('click');
		}
	});

});




$(document).on('click', '#modify-client', function () {

	$.ajax({
		url: domain + "ajax/dashboard/getClients",
		beforeSend: function () {
			n_loader = -1;
			$("#modify-client-table").empty();
		},
		success: function (d) {
			var clients_retrieved = JSON.parse(d);
			var resClients = '';
			for(let i = 0; i < clients_retrieved.length; i++) {
				resClients += '\t\t\t\t\t<tr>\n' +
					'\t\t\t\t\t\t<th scope="row">'+(i+1)+'</th>\n' +
					'\t\t\t\t\t\t<td>'+clients_retrieved[i].date_created+'</td>\n' +
					'\t\t\t\t\t\t<td>'+clients_retrieved[i].company_name+'</td>\n' +
					'\t\t\t\t\t\t<td><button name="'+clients_retrieved[i].id+'" class="btn btn-primary edit-client">Edit</button></td>\n' +
					'\t\t\t\t\t\t<td><button name="'+clients_retrieved[i].id+'" class="btn btn-danger delete-client">Delete</button></td>\n' +
					'\t\t\t\t\t</tr>\n';
			}

			$("#modify-client-table").append(getTableTemplate(resClients));
		},
		complete: function () {
			n_loader = 1;
			$("#modify-clients-modal").modal();
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

function getTableTemplate(data) {
	return '\t<thead>\n' +
		'\t\t\t\t\t<tr>\n' +
		'\t\t\t\t\t\t<th scope="col">#</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Date entered</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Name</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Edit</th>\n' +
		'\t\t\t\t\t\t<th scope="col">Delete</th>\n' +
		'\t\t\t\t\t</tr>\n' +
		'\t\t\t\t\t</thead>\n' +
		'\t\t\t\t\t<tbody>\n' +
		data+
		'\t\t\t\t\t</tbody>';
}
// end section modify CLIENT

// section add CLIENT --

$(document).on('click', '#add-client', function () {
	$("#add-client-modal").modal();
});

$("#add-client-form").submit(function (e) {
	e.preventDefault();
	var form = $(this);
	$.ajax({
		url: domain + "ajax/dashboard/addClient" ,
		type: 'post',
		data: form.serialize(),
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var add_client = null;
			try {
				add_client = JSON.parse(d);
				if(add_client == "success") {
					Swal.fire({
						icon: 'success',
						title: 'This client has been added.',
						showConfirmButton: false,
						timer: 3000
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong.',
						showConfirmButton: false,
						timer: 3000
					});
				}
			}catch(e) {
			}
		},
		complete: function () {
			$("#add-client-form").trigger("reset");
			n_loader = 1;
		}
	});

});

// end of section add client

// add machine section ---

$(document).on('click', '#add-machine', function () {
	$("#add-machine-modal").modal();
});


$("#add-machine-form").submit(function (e) {
	e.preventDefault();
	var form = $('#add-machine-form')[0];
	var formData = new FormData(form);
	var file = $('#picture_add_machine')[0].files[0];
	$flag = true;
	if (file !== undefined) {
		var maxSizeMb = 2;
		var totalSize = file.size;
		var totalSizeMb = totalSize / Math.pow(1024, 2);
		if (totalSizeMb > maxSizeMb) {
			var errorMsg = 'File too large. Maximum file size is ' + maxSizeMb + 'MB. Selected file is ' + totalSizeMb.toFixed(2) + 'MB';
			$flag = false;
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: errorMsg
			})
		}
	}

	if ($flag) {
		$.ajax({
			type: "POST",
			url: domain + 'ajax/dashboard/addMachine',
			data: formData,
			contentType: false,
			processData: false,
			beforeSend: function () {
				n_loader = -1;
			},
			success: function (data) {
				var j_data = JSON.parse(data);
				n_loader = 1;
				if(j_data[0].picture_path.includes("utility")) {
					Swal.fire({
						icon: 'success',
						title: 'Your machine has been added.',
						showConfirmButton: false,
						timer: 3000
					});
					var last_added_item = getItemTemplate( j_data[0].quantity_avail,j_data[0].picture_path,  j_data[0].id);
					$("#machine-grid").append(last_added_item);
					$("#add-machine-form").trigger("reset");
				} else {
					Swal.fire({
						icon: 'error',
						title: j_data[0],
						showConfirmButton: false,
						timer: 3000
					});
				}


			},
			complete: function() {
				n_loader = 1;
			}
		})
	}
});

//--end of add machine form --///
