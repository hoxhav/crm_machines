$(document).ready(function() {
	$.ajax({
		url: domain + "ajax/administration/getUnavailableMachines",
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var data = JSON.parse(d);
			var result = '';

			for (let i = 0; i < data.length; i++) {
				result += getItemTemplate(data[i].serial_number, data[i].quantity_avail,data[i].picture_path,  data[i].id);
			}

			$("#machine-grid").append(result);
		},
		complete: function () {
			n_loader = 1;
		},
	});
});

function getItemTemplate(serial_number,quantity_avail,picture_path,id) {
	return '\t<div id="'+id+'" class="col-lg-3 mt-4">\n' +
		'\t\t<div class="card text-center text-white machine-items">\n' +
		'\t\t\t<div class="card-header">\n' +
		'\t\t\t\t<h5 class="card-title">Serial Number - ' + serial_number+'</h5>\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-info info_machine">Info</button>\n' +
		'\t\t\t</div>\n' +
		'\t\t\t<div class="card-body pb-4">\n' +
		'\t\t\t\t<div class="view overlay">\n' +
		'\t\t\t\t\t<img src="./' + picture_path+'" class="img-fluid " alt="smaple image">\n' +
		'\t\t\t\t\t<div class="mask flex-center rgba-teal-strong">\n' +
		'\t\t\t\t\t\t<div class="row">\n' +
		'\t\t\t\t\t\t\t<button name="' + id+'" class="btn btn-success activate_machine">ACTIVATE</button>\n' +
		'\t\t\t\t\t\t</div>\n' +
		'\t\t\t\t\t</div>\n' +
		'\t\t\t\t</div>\n' +
		'\t\t\t</div>\n' +
		'\t\t</div>\n' +
		'\t</div>';
}

$(document).on('click', '#add-operator', function () {
	$("#add-operator-form").trigger("reset");
	$("#add-operator-modal").modal();
});


$("#add-operator-form").submit(function (e) {
	e.preventDefault();
	var form = $(this);
	$.ajax({
		type: 'post',
		url: domain + "ajax/administration/addOperator",
		data: form.serialize(),
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var added_operator = JSON.parse(d);
			if(added_operator == "success") {
				Swal.fire({
					icon: 'success',
					title: 'This operator has been added.',
					showConfirmButton: false,
					timer: 3000
				});
				$("#add-operator-modal").modal("hide");
			}
		},
		complete: function () {
			n_loader = 1;
		}
	});

});


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


$(document).on('click', '.activate_machine', function () {
	var machine_id = $(this).attr('name');
	$("#quantity-span").text('');
	$("#quantity_machine").val('');
	$("#quantity-span").append(machine_id);
	$("#add-quantity-modal").modal();
});


$("#add-quantity-form").submit(function (e) {
	e.preventDefault();
	var machine_id = $('#quantity_machine').val();
	$.ajax({
		url: domain + "ajax/administration/activateMachine",
		type: 'post',
		data: {"machine_id":$("#quantity-span").text(), "quantity": machine_id},
		beforeSend: function () {
			n_loader = -1;
		},
		success: function (d) {
			var activated_machine = JSON.parse(d);
			if(activated_machine == "success") {
				Swal.fire({
					icon: 'success',
					title: 'This machine has been activated.',
					showConfirmButton: false,
					timer: 3000
				});
				$("#add-quantity-modal").modal("hide");
			}
		},
		complete: function () {
			n_loader = 1;
			window.location = domain;
		}
	});

});


